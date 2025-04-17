// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getID, getLang, getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { GiftCardModel } from "../models/gift_card";
import { GiftCardPurchaseModel } from "../models/gift_card_purchase";
import { GiftCardPurchase } from "../entities/gift_card_purchase";
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { GiftCardService } from "./gift_card";
import { GiftCard } from "../entities/gift_card";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";


export interface GiftCardPurchaseFilter extends ListFilter {
    seqNo?: number;
    code?: string;
    userKey?: string;
    giftCardSeqNo?: number;
    status?: number;
    deliveryStatus?: number;
}

@Service()
export class GiftCardPurchaseService extends CoreService {

     @Inject(()=> GiftCardPurchaseModel)
     private giftCardPurchaseModel: GiftCardPurchaseModel;

     @Inject(()=> GiftCardService)
     private giftCardService: GiftCardService;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     @Transaction('SERIALIZABLE') //트렌잭션 default REPEATABLE READ
     public async purchase(req: Request, res: Response, params: GiftCardPurchase, member:MemberA, manager?: EntityManager) {

          // let code = getID("GC");
          // params.code = code;
          params.userKey = member.userKey;
          params.buyerNickname = member.nickname;
          params.status = 1;
          params.deliveryStatus = 0;

          let giftCard:GiftCard = await this.giftCardService.getOne(params.giftCardSeqNo);
          if(!giftCard || giftCard.status != 'active'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }
          params.giftCardImage = giftCard.image
          params.giftCardName = giftCard.title
          params.usePoint = giftCard.price * 1000;
          params.exchangeRate = 1000;
          params.price = giftCard.price;
          params.amount = 1;
          params.regDatetime = now();
          params.statusDatetime = now();

          member = await this.memberService.getMember(member.userKey);
          if(params.usePoint > member.point){
               throw new CoreError(ErrorType.E_LACK_COST);
          }

          await this.giftCardPurchaseModel.create(params, GiftCardPurchase, manager);

          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'used';
          historyPoint.category = 'purchase';
          historyPoint.point = params.usePoint;
          
          historyPoint.subject = getLang('id').purchaseGiftCard
          historyPoint.comment = getLang('id').purchaseGiftCardByPoint
          historyPoint.regDatetime = now();
          await this.memberService.updatePoint(historyPoint, member, manager);

          return true;
     }

     public async getOne(seqNo:number, member:MemberA){
          let filter:GiftCardPurchaseFilter = {};
          filter.seqNo = seqNo
          filter.userKey = member.userKey;

          return await this.giftCardPurchaseModel.getByFilter(filter);

     }

     public async list(filter: GiftCardPurchaseFilter, paging: IPaging, member:MemberA) {

          filter = filter || {};
          filter.userKey = member.userKey;

          let order:IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          return await this.giftCardPurchaseModel.list(filter, order, paging);
     }
}