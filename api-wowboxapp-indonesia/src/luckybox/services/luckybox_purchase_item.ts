import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxPurchaseItemModel } from "../models/luckybox_purchase_item";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LuckyboxPurchaseItem, LuckyboxPurchaseItemJoin } from "../entities/luckybox_purchase_item";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { SQSParams, SQSsendMessage } from "../../common/services/sqs";
import { EntityManager } from "typeorm";
import { arrayObjectToValue, arrayToMap, getLang, now, safeNumber } from "../../common/services/util";
import { LuckyboxDeliveryModel } from "../models/luckybox_delivery";
import { LuckyboxDeliveryPurchaseModel } from "../models/luckybox_delivery_purchase";
import { MemberA } from "../../member/entities/member_a";
import { MemberService } from "../../member/services/member";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { HistoryBall } from "../../history/entities/histroy_ball";

export class CashBackParams {
     type: 'point' | 'cash' | 'ball'
}

export class LuckyboxPurchaseItemCreateParams {
    public seqNo?: number;
    public luckyboxSeqNo?: number;
    public luckyboxPurchaseSeqNo?: number;
    public luckyboxPayResponseTranSeq?: string;
    public userKey?: string;
    public tempMember?: boolean;
    public luckyboxTitle?: string;
    public paymentMethod?: string;
    public price?: number;
    public status?: number;
    public isOpen?: boolean;
    public deliveryStatus?: number;
    public regDatetime?: string;
    public paymentDatetime?: string;
    public openDatetime?: string;
    public cancelDatetime?: string;
    public completeDatetime?: string;
    public exchangeDatetime?: string;
    public productSeqNo?: number;
    public productDeliverySeqNo?: number;
    public productType?: string;
    public productName?: string;
    public productImage?: string;
    public productPrice?: number;
    public optionName?: string;
    public optionPrice?: number;
    public supplyPrice?: number;
    public supplyPricePaymentFee?: number;
    public deliveryFee?: number;
    public deliveryPayStatus?: number;
    public luckyboxDeliveryPurchaseSeqNo?: number;
    public deliveryPaymentPrice?: number;
    public turnNo?: number;
    public luckyboxDeliverySeqNo?: number;
}
export class LuckyboxPurchaseItemUpdateParams {
    public seqNo?: number;
    public luckyboxSeqNo?: number;
    public luckyboxPurchaseSeqNo?: number;
    public xenditId?: string;
    public userKey?: string;
    public tempMember?: boolean;
    public luckyboxTitle?: string;
    public paymentMethod?: string;
    public price?: number;
    public status?: number;
    public isOpen?: boolean;
    public deliveryStatus?: number;
    public regDatetime?: string;
    public paymentDatetime?: string;
    public openDatetime?: string;
    public cancelDatetime?: string;
    public completeDatetime?: string;
    public exchangeDatetime?: string;
    public productSeqNo?: number;
    public productDeliverySeqNo?: number;
    public productType?: string;
    public productName?: string;
    public productImage?: string;
    public productPrice?: number;
    public optionName?: string;
    public optionPrice?: number;
    public supplyPrice?: number;
    public supplyPricePaymentFee?: number;
    public deliveryFee?: number;
    public deliveryPayStatus?: number;
    public luckyboxDeliveryPurchaseSeqNo?: number;
    public deliveryPaymentPrice?: number;
    public turnNo?: number;
    public luckyboxDeliverySeqNo?: number;
}
export interface LuckyboxPurchaseItemListFilter extends ListFilter {
    seqNo?: number;
    luckyboxSeqNo?: number;
    luckyboxPurchaseSeqNo?: number;
    luckyboxPayResponseTranSeq?: string;
    userKey?: string;
    tempMember?: boolean;
    luckyboxTitle?: string;
    paymentMethod?: string;
    price?: number;
    status?: number | number[];
    isOpen?: boolean;
    deliveryStatus?: number | number[];
    regDatetime?: string;
    paymentDatetime?: string;
    openDatetime?: string;
    cancelDatetime?: string;
    completeDatetime?: string;
    exchangeDatetime?: string;
    productSeqNo?: number;
    productDeliverySeqNo?: number;
    productType?: string;
    productName?: string;
    productImage?: string;
    productPrice?: number;
    optionName?: string;
    optionPrice?: number;
    supplyPrice?: number;
    supplyPricePaymentFee?: number;
    deliveryFee?: number;
    deliveryPayStatus?: number;
    luckyboxDeliveryPurchaseSeqNo?: number;
    deliveryPaymentPrice?: number;
    turnNo?: number;
    luckyboxDeliverySeqNo?: number;
    blind?: boolean;
}

export class ConfirmLuckyboxPurchaseItemParams {
     
     @IsNotEmpty()
     luckyboxPurchaseItemSeqNo: number;
}

@Service()
export class LuckyboxPurchaseItemService extends CoreService {

     @Inject(()=> LuckyboxPurchaseItemModel)
     private luckyboxPurchaseItemModel: LuckyboxPurchaseItemModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: SQSParams, member: MemberA) {
     
          if(params.userKey != member.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION)
          }

          try {
               SQSsendMessage(params);
          } catch(e){
               throw new CoreError(ErrorType.E_UNKNOWN)
          }

          return { message: 'SUECCESS' }
               
     }

     public async get(req: Request, res: Response, seqNo: number) {
         
          let filter = {
               joinColumn : [
                    {
                         joinTable: 'luckyboxDelivery'
                    },
                    {
                         joinTable: 'luckyboxDeliveryPurchase'
                    },
                    {
                         joinTable: 'memberTotal'
                    }
                    
               ]
          }
     
          let luckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(seqNo, LuckyboxPurchaseItemJoin, filter);
          if(!luckyboxPurchaseItem) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

          // if(luckyboxPurchaseItem.userKey != member.userKey) {
          //      throw new CoreError(ErrorType.E_NOTPERMISSION)
          // }
          return luckyboxPurchaseItem;
     }

     public async list(req: Request, res: Response, filter: LuckyboxPurchaseItemListFilter, order: IOrder[], paging: IPaging) {
          
          filter = filter || {};

          filter.status = 2;
          filter.isOpen = true;
          // filter['greaterSeq'] = true;
          filter.deliveryStatus = [1, 2, 3];
          filter.joinColumn = [
               {
                    joinTable: 'luckyboxDelivery'
               },
               {
                    joinTable: 'memberTotal'
               }
          ]

          let list = await this.luckyboxPurchaseItemModel.list(filter, order, paging, LuckyboxPurchaseItemJoin);



          return list;
     }

     public async notOpenList(req: Request, res: Response, luckyboxPurchaseSeqNo: number, member: MemberA) {
         
          let filter: LuckyboxPurchaseItemListFilter = {};

          filter.luckyboxPurchaseSeqNo = luckyboxPurchaseSeqNo;
          filter.status = 2;
          filter.isOpen = false;
          filter.userKey = member.userKey

          let order: IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          let list = await this.luckyboxPurchaseItemModel.all(filter, order);

          return list;
     }

     public async my(req: Request, res: Response, filter: LuckyboxPurchaseItemListFilter, paging: IPaging, member: MemberA) {
         
          filter = filter || {};

          filter.status = [2, 4];
          filter.isOpen = true;
          filter.userKey = member.userKey;

          filter.joinColumn = [
               {
                    joinTable: 'luckyboxDelivery'
               },
               {
                    joinTable: 'memberTotal'
               }


          ]

          let order:IOrder[] = [
               {
                    column: `status`,
                    dir: 'ASC',
                    table: 'entity'
               },
               {
                    column: `delivery_status`,
                    dir: 'ASC',
                    table: 'entity'
                    // custom: true
               },
               {
                    column: `seqNo`,
                    dir: 'ASC',
                    table: 'entity'
               }
          ]

          let list = await this.luckyboxPurchaseItemModel.list(filter, order, paging, LuckyboxPurchaseItemJoin);

          return list;
     }

     @Transaction()
     public async updateImpression(req: Request, res: Response, seqNo: number, impression: string, member: MemberA, manager?: EntityManager) {

          let filter : LuckyboxPurchaseItemListFilter = {}
          filter.seqNo = seqNo;
          filter.userKey = member.userKey;
          let luckyboxPurchaseItem : LuckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.getByFilter(filter);
          luckyboxPurchaseItem.impression = impression;
          await this.luckyboxPurchaseItemModel.update(luckyboxPurchaseItem, LuckyboxPurchaseItem, manager);
          return luckyboxPurchaseItem;
     }

    public async update(req: Request, res: Response, seqNo: number, params: LuckyboxPurchaseItemUpdateParams, ) {
         let luckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(seqNo);
         if(!luckyboxPurchaseItem) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               luckyboxPurchaseItem.seqNo = params.seqNo;
          };
          if(params.luckyboxSeqNo !== undefined) {
               luckyboxPurchaseItem.luckyboxSeqNo = params.luckyboxSeqNo;
          };
          if(params.luckyboxPurchaseSeqNo !== undefined) {
               luckyboxPurchaseItem.luckyboxPurchaseSeqNo = params.luckyboxPurchaseSeqNo;
          };
          if(params.xenditId !== undefined) {
               luckyboxPurchaseItem.xenditId = params.xenditId;
          };
          if(params.userKey !== undefined) {
               luckyboxPurchaseItem.userKey = params.userKey
          };
          if(params.tempMember !== undefined) {
               luckyboxPurchaseItem.tempMember = params.tempMember;
          };
          if(params.luckyboxTitle !== undefined) {
               luckyboxPurchaseItem.luckyboxTitle = params.luckyboxTitle;
          };
          if(params.paymentMethod !== undefined) {
               luckyboxPurchaseItem.paymentMethod = params.paymentMethod;
          };
          if(params.price !== undefined) {
               luckyboxPurchaseItem.price = params.price;
          };
          if(params.status !== undefined) {
               luckyboxPurchaseItem.status = params.status;
          };
          if(params.isOpen !== undefined) {
               luckyboxPurchaseItem.isOpen = params.isOpen;
          };
          if(params.deliveryStatus !== undefined) {
               luckyboxPurchaseItem.deliveryStatus = params.deliveryStatus;
          };
          if(params.regDatetime !== undefined) {
               luckyboxPurchaseItem.regDatetime = params.regDatetime;
          };
          if(params.paymentDatetime !== undefined) {
               luckyboxPurchaseItem.paymentDatetime = params.paymentDatetime;
          };
          if(params.openDatetime !== undefined) {
               luckyboxPurchaseItem.openDatetime = params.openDatetime;
          };
          if(params.cancelDatetime !== undefined) {
               luckyboxPurchaseItem.cancelDatetime = params.cancelDatetime;
          };
          if(params.completeDatetime !== undefined) {
               luckyboxPurchaseItem.completeDatetime = params.completeDatetime;
          };
          if(params.exchangeDatetime !== undefined) {
               luckyboxPurchaseItem.exchangeDatetime = params.exchangeDatetime;
          };
          if(params.productSeqNo !== undefined) {
               luckyboxPurchaseItem.productSeqNo = params.productSeqNo;
          };
          if(params.productDeliverySeqNo !== undefined) {
               luckyboxPurchaseItem.productDeliverySeqNo = params.productDeliverySeqNo;
          };
          if(params.productType !== undefined) {
               luckyboxPurchaseItem.productType = params.productType;
          };
          if(params.productName !== undefined) {
               luckyboxPurchaseItem.productName = params.productName;
          };
          if(params.productImage !== undefined) {
               luckyboxPurchaseItem.productImage = params.productImage;
          };
          if(params.productPrice !== undefined) {
               luckyboxPurchaseItem.productPrice = params.productPrice;
          };
          if(params.optionName !== undefined) {
               luckyboxPurchaseItem.optionName = params.optionName;
          };
          if(params.optionPrice !== undefined) {
               luckyboxPurchaseItem.optionPrice = params.optionPrice;
          };
          if(params.supplyPrice !== undefined) {
               luckyboxPurchaseItem.supplyPrice = params.supplyPrice;
          };
          if(params.supplyPricePaymentFee !== undefined) {
               luckyboxPurchaseItem.supplyPricePaymentFee = params.supplyPricePaymentFee;
          };
          if(params.deliveryFee !== undefined) {
               luckyboxPurchaseItem.deliveryFee = params.deliveryFee;
          };
          if(params.deliveryPayStatus !== undefined) {
               luckyboxPurchaseItem.deliveryPayStatus = params.deliveryPayStatus;
          };
          if(params.luckyboxDeliveryPurchaseSeqNo !== undefined) {
               luckyboxPurchaseItem.luckyboxDeliveryPurchaseSeqNo = params.luckyboxDeliveryPurchaseSeqNo;
          };
          if(params.deliveryPaymentPrice !== undefined) {
               luckyboxPurchaseItem.deliveryPaymentPrice = params.deliveryPaymentPrice;
          };
          if(params.turnNo !== undefined) {
               luckyboxPurchaseItem.turnNo = params.turnNo;
          };
          if(params.luckyboxDeliverySeqNo !== undefined) {
               luckyboxPurchaseItem.luckyboxDeliverySeqNo = params.luckyboxDeliverySeqNo;
          };

         await this.luckyboxPurchaseItemModel.update(luckyboxPurchaseItem);
         return luckyboxPurchaseItem;
    }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(seqNo);
          if(!luckyboxPurchaseItem) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxPurchaseItemModel.delete(luckyboxPurchaseItem);
          return luckyboxPurchaseItem;
     }

     public async getCountNotOpenLuckyBoxPurchaseItem(req: Request, res: Response, member: MemberA) {

          let filter = {
               userKey: member.userKey,
               status: 2,
               isOpen: false
          }

          let data = await this.luckyboxPurchaseItemModel.getCountNotOpenLuckyBoxPurchaseItem(filter);

          return {
               count: data[0]._count
          }
     }

     public async confirmLuckyBoxPurchaseItem(req: Request, res: Response, seqNo: number, member: MemberA) {

          let luckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(seqNo);

          if(luckyboxPurchaseItem && luckyboxPurchaseItem.isOpen) {

               let filter = {
                    userKey: member.userKey,
                    status: 2,
                    isOpen: false,
                    luckyboxPurchaseSeqNo: luckyboxPurchaseItem.luckyboxPurchaseSeqNo
               }
               let notOpenList = await this.luckyboxPurchaseItemModel.all(filter, [{column: 'seqNo', dir: 'DESC'}]);

               luckyboxPurchaseItem['luckyboxPurchaseItem'] = notOpenList;
               return luckyboxPurchaseItem;
          }

          return null;
     }

     @Transaction('SERIALIZABLE')
     public async cashBackLuckyBoxPurchaseItem(req: Request, res: Response, seqNo: number, params: CashBackParams, member: MemberA, manager?: EntityManager) {

          if(!params.type) params.type = 'point';

          let luckyboxPurchaseItem: LuckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(seqNo, undefined, undefined, manager);

          if(!luckyboxPurchaseItem) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

          if(member.userKey != luckyboxPurchaseItem.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION)
          }

          if(luckyboxPurchaseItem.status != 2 || !luckyboxPurchaseItem.isOpen || luckyboxPurchaseItem.deliveryStatus) {
               throw new CoreError(ErrorType.E_NOTPERMISSION)
          }

          luckyboxPurchaseItem.exchangeDatetime = now();
          luckyboxPurchaseItem.status = 4;

          if(params.type == 'point') {

               let historyPoint = new HistoryPoint();
               historyPoint.userKey = member.userKey;
               historyPoint.type = 'charge';
               historyPoint.category = 'wowboxExchange';
               historyPoint.point = luckyboxPurchaseItem.price;
               historyPoint.subject = getLang('id').luckyBoxPointExchangeSubject;
               historyPoint.comment = getLang('id').luckyBoxPointExchangeComment;
               historyPoint.regDatetime = now();
               await this.memberService.updatePoint(historyPoint, member, manager);

          } else if(params.type == 'ball') {

               let historyBall = new HistoryBall();
               historyBall.userKey = member.userKey;
               historyBall.type = 'charge';
               historyBall.category = 'wowboxExchange';
               historyBall.ball = luckyboxPurchaseItem.refundBol;
               historyBall.subject = getLang('id').luckyBoxLuckyBallExchangeSubject;
               historyBall.comment = getLang('id').luckyBoxLuckyBallExchangeComment;
               historyBall.regDatetime = now();
               await this.memberService.updateBall(historyBall, member, manager);
          }

          await this.luckyboxPurchaseItemModel.update(luckyboxPurchaseItem, undefined, manager);

          return luckyboxPurchaseItem;
     }

     public async getTotalLuckyPurchaseItemList(req: Request, res: Response, paging: IPaging) {
     
          let filter = {
               status: 2,
               isOpen: true,
               blind: false,
               deliveryStatusIsNotNull: true,
               joinColumn : [
                    {
                         joinTable: 'memberTotal'
                    }
               ]
          }

          let order:IOrder[] = [
               {
                    column: `open_datetime`,
                    dir: 'DESC'
               }
          ]

          let list = await this.luckyboxPurchaseItemModel.list(filter, order, paging, LuckyboxPurchaseItemJoin)

          return list;

     }
}