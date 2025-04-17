import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductImageModel } from "../models/product_image";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { ProductImage } from "../entities/product_image";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { ProductPurchaseModel } from "../models/product_purchase";
import { ProductPurchase } from "../entities/product_purchase";
import { EntityManager } from "typeorm";
import { MemberA } from "../../member/entities/member_a";
import { ProductService } from './product';
import { MemberService } from '../../member/services/member';
import { getLang, now } from '../../common/services/util';
import { MemberDeliveryService } from "../../member/services/member_delivery";
import { ProductJoin } from "../entities/product";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";

export interface ProductPurchaseFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     productSeqNo?: number;
}

@Service()
export class ProductPurchaseService extends CoreService {

     @Inject(()=> ProductPurchaseModel)
     private productPurchaseModel: ProductPurchaseModel;

     @Inject(()=> MemberDeliveryService)
     private memberDeliveryService: MemberDeliveryService;

     @Inject(()=> ProductService)
     private productService: ProductService;

     
     @Inject(()=> MemberService)
     private memberService: MemberService;



     constructor() {
          super();
     }

     @Transaction('SERIALIZABLE')
     public async purchase(req: Request, res: Response, params : ProductPurchase, member:MemberA, manager?: EntityManager){
          let memberDelivery = params.delivery;

          memberDelivery.seqNo = null;
          await this.memberDeliveryService.save(memberDelivery, manager);

          params.userKey = member.userKey;
          params.buyerNickname = member.nickname;
          params.memberDeliverySeqNo = memberDelivery.seqNo;

          let product : ProductJoin = await this.productService.get(params.productSeqNo);
          if(!product || product.status != 'active'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          params.productName = product.title;

          if(product.imageList && product.imageList.length > 0){
               params.productImage = product.imageList[0].image;
          }

          params.status = 1;
          params.deliveryStatus = 0;
          
          member = await this.memberService.getMember(member.userKey);
          if(product.price > member.point){
               throw new CoreError(ErrorType.E_LACK_COST);
          }

          params.usePoint = product.price;
          params.exchangeRate = 1;
          params.price = product.price;
          params.amount = 1;
          params.unitPrice = product.price;
          params.regDatetime = now();
          params.statusDatetime = now();
          await this.productPurchaseModel.create(params, ProductPurchase, manager);

          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'used';
          historyPoint.category = 'purchase';
          historyPoint.point = params.usePoint;
          historyPoint.subject = getLang(member.language).purchaseProduct
          historyPoint.comment = getLang(member.language).purchaseProductByPoint
          historyPoint.regDatetime = now();
          await this.memberService.updatePoint(historyPoint, member);

          return params;

     }

     public async getOne(seqNo:number, member:MemberA){
          let filter:ProductPurchaseFilter = {};
          filter.seqNo = seqNo
          filter.userKey = member.userKey;

          return await this.productPurchaseModel.getByFilter(filter);

     }

     public async list(filter: ProductPurchaseFilter, paging: IPaging, member:MemberA) {

          filter = filter || {};
          filter.userKey = member.userKey;

          let order:IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          return await this.productPurchaseModel.list(filter, order, paging);
     }
}