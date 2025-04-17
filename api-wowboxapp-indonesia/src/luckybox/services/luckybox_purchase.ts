import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxPurchaseModel } from "../models/luckybox_purchase";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LuckyboxPurchase, LuckyboxPurchaseJoin } from "../entities/luckybox_purchase";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { arrayObjectToValue, arrayToMapArray, getLang, getRandomOrderId, now, safeNumber } from "../../common/services/util";
import { LuckyboxPurchaseItemModel } from "../models/luckybox_purchase_item";
import { LuckyboxPurchaseItem } from "../entities/luckybox_purchase_item";
import { EntityManager } from "typeorm";
import moment = require("moment");
import { LuckyboxPurchaseCancel } from "../entities/luckybox_purchase_cancel";
import { LuckyboxPurchaseCancelModel } from "../models/luckybox_purchase_cancel";
import { LuckyboxModel } from "../models/luckybox";
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { PurchaseStatus } from "../../common/services/type";
import { XenditService } from "../../xendit/service/xendit";
import { HistoryCash } from "../../history/entities/histroy_cash";
import { FireBase } from "../../common/services/firebase";
import { DeviceService } from "../../device/services/device";
import { Device } from "../../device/entities/device";

export class LuckyboxPurchaseCreateParams {
    public seqNo?: number;
    public luckyboxSeqNo?: number;
    public userKey?: string;
    public orderNo?: string;
    public salesType?: string;
    public status?: number;
    public title?: string;
    public paymentMethod?: string;
    public quantity?: number;
    public price?: number;
    public unitPrice?: number;
    public cancelQuantity?: number;
    public cancelPrice?: number;
    public remainPrice?: number;
    public regDatetime?: string;
    public paymentDatetime?: string;
    public changeStatusDatetime?: string;
    public payResponseApprovalNo?: string;
    public payResponseCardId?: string;
    public payResponseCardNm?: string;
    public payResponseCardNo?: string;
    public payResponseCertYn?: boolean;
    public payResponseCode?: string;
    public payResponseInstallment?: string;
    public payResponseMsg?: string;
    public payResponseOrderNo?: string;
    public payResponsePayDate?: string;
    public payResponsePayTime?: string;
    public payResponsePayType?: string;
    public payResponsePgSeq?: string;
    public payResponseProductType?: string;
    public payResponseSellMm?: string;
    public payResponseTestYn?: boolean;
    public payResponseTranSeq?: string;
    public payResponseZerofeeYn?: boolean;
    public pgPrice?: number;
}
export class LuckyboxPurchaseUpdateParams {
    public seqNo?: number;
    public luckyboxSeqNo?: number;
    public userKey?: string;
    public orderNo?: string;
    public salesType?: string;
    public status?: number;
    public title?: string;
    public paymentMethod?: string;
    public quantity?: number;
    public price?: number;
    public unitPrice?: number;
    public cancelQuantity?: number;
    public cancelPrice?: number;
    public remainPrice?: number;
    public regDatetime?: string;
    public paymentDatetime?: string;
    public changeStatusDatetime?: string;
    public payResponseApprovalNo?: string;
    public payResponseCardId?: string;
    public payResponseCardNm?: string;
    public payResponseCardNo?: string;
    public payResponseCertYn?: boolean;
    public payResponseCode?: string;
    public payResponseInstallment?: string;
    public payResponseMsg?: string;
    public payResponseOrderNo?: string;
    public payResponsePayDate?: string;
    public payResponsePayTime?: string;
    public payResponsePayType?: string;
    public payResponsePgSeq?: string;
    public payResponseProductType?: string;
    public payResponseSellMm?: string;
    public payResponseTestYn?: boolean;
    public payResponseTranSeq?: string;
    public payResponseZerofeeYn?: boolean;
}
export interface LuckyboxPurchaseListFilter extends ListFilter {
    seqNo?: number;
    luckyboxSeqNo?: number;
    userKey?: string;
    orderNo?: string;
    salesType?: string;
    status?: number;
    title?: string;
    paymentMethod?: string;
    quantity?: number;
    price?: number;
    unitPrice?: number;
    cancelQuantity?: number;
    cancelPrice?: number;
    remainPrice?: number;
    regDatetime?: string;
    paymentDatetime?: string;
    changeStatusDatetime?: string;
    xenditId?: string;
    addWhere?: boolean;
}

export class PaymentParams {
     public id;
     public external_id;
     public user_id;
     public is_high;
     public payment_method;
     public status;
     public merchant_name;
     public amount;
     public paid_amount;
     public bank_code;
     public paid_at;
     public payer_email;
     public description;
     public adjusted_received_amount;
     public fees_paid_amount;
     public updated;
     public created;
     public currency;
     public payment_channel;
     public payment_destination;
 }

@Service()
export class LuckyboxPurchaseService extends CoreService {

     @Inject(()=> LuckyboxPurchaseModel)
     private luckyboxPurchaseModel: LuckyboxPurchaseModel;

     @Inject(()=> LuckyboxPurchaseItemModel)
     private luckyboxPurchaseItemModel: LuckyboxPurchaseItemModel;

     @Inject(()=> LuckyboxPurchaseCancelModel)
     private luckyboxPurchaseCancelModel: LuckyboxPurchaseCancelModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     @Inject(()=> DeviceService)
     private deviceService: DeviceService;
     
     @Inject(()=> XenditService)
     private xenditService: XenditService;

     @Inject(()=> LuckyboxModel)
     private luckyboxModel: LuckyboxModel;


    constructor() {
         super();
    }

     @Transaction()
     public async create(req: Request, res: Response, params: LuckyboxPurchaseCreateParams, member: MemberA, manager?: EntityManager) {
          
          if(member.userKey != params.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION);
          }

          let luckyboxPurchase : LuckyboxPurchase = LuckyboxPurchase.fromObject(params, LuckyboxPurchase);

          if(!luckyboxPurchase.useCash) {
               luckyboxPurchase.useCash = 0;
          }

          member = await this.memberService.getMember(member.userKey);
          
          if(safeNumber(luckyboxPurchase.useCash) && safeNumber(luckyboxPurchase.useCash) > safeNumber(member.cash)) {
               throw new CoreError(ErrorType.E_LACK_COST);
          }

          if(luckyboxPurchase.useCash > luckyboxPurchase.price) {
               luckyboxPurchase.useCash = luckyboxPurchase.price;
               luckyboxPurchase.pgPrice = 0;
          }

          luckyboxPurchase.pgPrice = safeNumber(luckyboxPurchase.price) - safeNumber(luckyboxPurchase.useCash);

          if(luckyboxPurchase.useCash == luckyboxPurchase.price) {
               luckyboxPurchase.paymentMethod = 'cash';
          }


          let dateStr = now();


          luckyboxPurchase.orderNo = 'box'+getRandomOrderId();
          luckyboxPurchase.cancelPrice = 0;
          luckyboxPurchase.cancelQuantity = 0;
          luckyboxPurchase.remainPrice = params.price;
          luckyboxPurchase.regDatetime = dateStr;
          luckyboxPurchase.changeStatusDatetime = dateStr;
          luckyboxPurchase.salesType = 'delivery';

          if(luckyboxPurchase.quantity >= 50){
               luckyboxPurchase.bonus = 12000;
          }else if(luckyboxPurchase.quantity >= 10){
               luckyboxPurchase.bonus = 2000;
          }else if(luckyboxPurchase.quantity >= 5){
               luckyboxPurchase.bonus = 1000;
          }
          

          if(luckyboxPurchase.paymentMethod == 'cash') {
               luckyboxPurchase.paymentDatetime = dateStr;
               luckyboxPurchase.changeStatusDatetime = dateStr;
               luckyboxPurchase.status = 2;
          }else{
               luckyboxPurchase.status = 1;

               await this.xenditService.cretateLuckyboxInvoce(luckyboxPurchase, member);

               if(!luckyboxPurchase.invoiceUrl){
                    throw new CoreError(ErrorType.E_UNKNOWN);
               }
          }
          
          await this.luckyboxPurchaseModel.create(luckyboxPurchase, undefined, manager);

          if(luckyboxPurchase.paymentMethod == 'cash') {
               
               for (let i = 0; i < luckyboxPurchase.quantity; i++) {
                    let luckyboxPurchaseItem: LuckyboxPurchaseItem = new LuckyboxPurchaseItem();
                   luckyboxPurchaseItem.luckyboxSeqNo = luckyboxPurchase.luckyboxSeqNo;
                   luckyboxPurchaseItem.luckyboxPurchaseSeqNo = luckyboxPurchase.seqNo;
                   luckyboxPurchaseItem.userKey = luckyboxPurchase.userKey;
                   luckyboxPurchaseItem.luckyboxTitle = luckyboxPurchase.title;
                   luckyboxPurchaseItem.paymentMethod = luckyboxPurchase.paymentMethod;
                   luckyboxPurchaseItem.price = luckyboxPurchase.unitPrice;
                   luckyboxPurchaseItem.status = 2;
                   luckyboxPurchaseItem.isOpen = false;
                   luckyboxPurchaseItem.regDatetime = dateStr;
                   luckyboxPurchaseItem.tempMember = false;
                   luckyboxPurchaseItem.paymentDatetime = dateStr;
                   await this.luckyboxPurchaseItemModel.create(luckyboxPurchaseItem, undefined, manager);
               }

               let histroyCash = new HistoryCash();
               histroyCash.userKey = member.userKey;
               histroyCash.type = 'used';
               histroyCash.category = 'wowbox';
               histroyCash.cash = luckyboxPurchase.useCash;
               histroyCash.subject = getLang('id').luckyBoxPurcahseCashSubject;
               histroyCash.comment = getLang('id').luckyBoxPurcahseCashComment;
               histroyCash.regDatetime = now();
               member = await this.memberService.updateCash(histroyCash, member, manager);
          }


          return luckyboxPurchase.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchase = await this.luckyboxPurchaseModel.get(seqNo);
          if(!luckyboxPurchase) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxPurchase;
     }

     public async list(req: Request, res: Response, filter: LuckyboxPurchaseListFilter, order: IOrder[], member: MemberA) {
          filter = filter || {};

          filter.userKey = member.userKey;
          filter.status = 2;
          filter.addWhere = true;

          let list = await this.luckyboxPurchaseModel.all(filter, order);

          if(list.list.length > 0) {

               if(list.list[0].userKey != member.userKey) {
                    throw new CoreError(ErrorType.E_NOTPERMISSION);
               }
               let seqNoArr = arrayObjectToValue(list.list, 'seqNo');

               let luckyboxPurchaseItemList = await this.luckyboxPurchaseItemModel.all({luckyboxPurchaseSeqNo: seqNoArr, isOpen:false});

               
               let luckyboxPurchaseItemMap = arrayToMapArray(luckyboxPurchaseItemList.list, 'luckyboxPurchaseSeqNo');

               for(let data of list.list) {
                    if(luckyboxPurchaseItemMap[data.seqNo]) data.luckyboxPurchaseItem = luckyboxPurchaseItemMap[data.seqNo];
               }
          }


          return list;
     }

     public async update(req:Request, res: Response, seqNo: number, params: LuckyboxPurchaseUpdateParams) {
          let luckyboxPurchase = await this.luckyboxPurchaseModel.get(seqNo);
          if(!luckyboxPurchase) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

          if(params.seqNo !== undefined) {
               luckyboxPurchase.seqNo = params.seqNo;
          };
          if(params.luckyboxSeqNo !== undefined) {
               luckyboxPurchase.luckyboxSeqNo = params.luckyboxSeqNo;
          };
          if(params.userKey !== undefined) {
               luckyboxPurchase.userKey = params.userKey;
          };
          if(params.orderNo !== undefined) {
               luckyboxPurchase.orderNo = params.orderNo;
          };
          if(params.salesType !== undefined) {
               luckyboxPurchase.salesType = params.salesType;
          };
          if(params.status !== undefined) {
               luckyboxPurchase.status = params.status;
          };
          if(params.title !== undefined) {
               luckyboxPurchase.title = params.title;
          };
          if(params.paymentMethod !== undefined) {
               luckyboxPurchase.paymentMethod = params.paymentMethod;
          };
          if(params.quantity !== undefined) {
               luckyboxPurchase.quantity = params.quantity;
          };
          if(params.price !== undefined) {
               luckyboxPurchase.price = params.price;
          };
          if(params.unitPrice !== undefined) {
               luckyboxPurchase.unitPrice = params.unitPrice;
          };
          if(params.cancelQuantity !== undefined) {
               luckyboxPurchase.cancelQuantity = params.cancelQuantity;
          };
          if(params.cancelPrice !== undefined) {
               luckyboxPurchase.cancelPrice = params.cancelPrice;
          };
          if(params.remainPrice !== undefined) {
               luckyboxPurchase.remainPrice = params.remainPrice;
          };
          if(params.regDatetime !== undefined) {
               luckyboxPurchase.regDatetime = params.regDatetime;
          };
          if(params.paymentDatetime !== undefined) {
               luckyboxPurchase.paymentDatetime = params.paymentDatetime;
          };
          if(params.changeStatusDatetime !== undefined) {
               luckyboxPurchase.changeStatusDatetime = params.changeStatusDatetime;
          };

          await this.luckyboxPurchaseModel.update(luckyboxPurchase);
          return luckyboxPurchase;
     }

     @Transaction()
     public async cancel(req: Request, res: Response, luckyboxPurchaseSeqNo: number, member: MemberA, manager?: EntityManager) {
          let luckyboxPurchase: LuckyboxPurchase = await this.luckyboxPurchaseModel.get(luckyboxPurchaseSeqNo, undefined, LuckyboxPurchase, manager);
          let itemList: LuckyboxPurchaseItem[] = (await this.luckyboxPurchaseItemModel.all({luckyboxPurchaseSeqNo: luckyboxPurchase.seqNo}, undefined, LuckyboxPurchaseItem, manager)).list;

          if(member.userKey != luckyboxPurchase.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION)
          }
          if(!luckyboxPurchase) {
               throw new CoreError(ErrorType.E_NOTFOUND);
          }
          if(luckyboxPurchase.status != 2) {
               throw new CoreError(ErrorType.E_NOTPERMISSION)
          }
          if(!luckyboxPurchase.paymentDatetime) {
               throw new CoreError(ErrorType.E_UNKNOWN);
          }

          if(now() > moment(luckyboxPurchase.paymentDatetime).add(7, 'days').format('YYYY-MM-DD HH:mm:ss')) {
               throw new CoreError(ErrorType.E_EXPIREDEXCEPTION);
          }

          for(let item of itemList) {
               if(item.isOpen) {
                    throw new CoreError(ErrorType.E_NOTPERMISSION);
               }
          }

          let dateStr: string = now();
          // let data;
          // let seqNo = 1;
          // if(luckyboxPurchase.paymentMethod = PayMethodType.CARD) {
          //      seqNo = 1;
          // } else if(luckyboxPurchase.paymentMethod = PayMethodType.EASY) {
          //      seqNo = 2;
          // }

          
          // data = await this.reapPayService.cancel(req, res, luckyboxPurchase.payResponseTranSeq, seqNo, manager);
          // if (data == null) {
          //      Log(req, LogType.ERROR, LogAction.CANCEL_LUCKYBOX_FAIL);
          //      throw new CoreError(ErrorType.E_CANCEL_FAIL, {message: '결제 취소 실패', log: true, logAction: LogAction.CANCEL_LUCKYBOX_FAIL});
          // }

          // for (let item of itemList) {
          //      item.status = 3;
          //      item.cancelDatetime = dateStr;
   
          //      let cancel: LuckyboxPurchaseCancel = new LuckyboxPurchaseCancel();
          //      cancel.luckyboxPurchaseSeqNo = item.luckyboxPurchaseSeqNo;
          //      cancel.luckyboxPurchaseItemSeqNo = item.seqNo;
          //      cancel.payResponseCode = data.payResponseCode;
          //      cancel.payResponseMsg = data.payResponseMsg;
          //      cancel.payResponsePayDate = data.payResponsePayDate;
          //      cancel.payResponsePayTime = data.payResponsePayTime;
          //      cancel.payResponseAmt = data.payResponseAmt;

   
          //      cancel.payResponseApprovalYmdhms = data.payResponseApprovalYMDHMS;
          //      cancel.payResponseApprovalNo = data.payResponseApprovalNo;
   
          //      cancel.payResponseTranSeq = data.payResponseTranSeq;
          //      await this.luckyboxPurchaseCancelModel.create(cancel, manager);
          //      await this.luckyboxPurchaseItemModel.update(item, manager);
          // }

          if(luckyboxPurchase.paymentMethod == 'cash'){
               luckyboxPurchase.status = 4;
               luckyboxPurchase.cancelQuantity = luckyboxPurchase.quantity;
               luckyboxPurchase.cancelPrice = luckyboxPurchase.price;
               luckyboxPurchase.changeStatusDatetime = dateStr;
               luckyboxPurchase.remainPrice = 0;

               if(safeNumber(luckyboxPurchase.useCash) > 0) {
                    let histroyCash = new HistoryCash();
                    histroyCash.userKey = luckyboxPurchase.userKey;
                    histroyCash.type = 'charge';
                    histroyCash.category = 'wowbox';
                    histroyCash.cash = luckyboxPurchase.useCash;
                    histroyCash.subject = getLang('id').luckyBoxPurcahseCancelCashSubject;
                    histroyCash.comment = getLang('id').luckyBoxPurcahseCancelCashComment;
                    histroyCash.regDatetime = now();
                    let member = new MemberA();
                    member.userKey = luckyboxPurchase.userKey;
                    member = await this.memberService.updateCash(histroyCash, member, manager);
               }
          }else{
               luckyboxPurchase.status = 3;
               luckyboxPurchase.cancelQuantity = luckyboxPurchase.quantity;
               luckyboxPurchase.cancelPrice = luckyboxPurchase.price;
               luckyboxPurchase.changeStatusDatetime = dateStr;
               luckyboxPurchase.remainPrice = 0;
          }

          await this.luckyboxPurchaseModel.update(luckyboxPurchase, undefined, manager);
          return { message: 'SUCCESS' }
     }

     @Transaction('SERIALIZABLE')
     public async paymentLuckyBoxPurchase(req: Request, res: Response, params: PaymentParams, manager?: EntityManager) {
          
          let status = params.status;
          if(status == 'PAID') {
   
               let luckyboxPurchase: LuckyboxPurchase = await this.luckyboxPurchaseModel.getByFilter({orderNo: params.external_id}, undefined, undefined, manager);
               
               if(!luckyboxPurchase || luckyboxPurchase.status != 1) {
                    throw new CoreError(ErrorType.E_NOTPERMISSION)
               }
               luckyboxPurchase.status = PurchaseStatus.PAY;
               luckyboxPurchase.paymentMethod = params.payment_method;
               luckyboxPurchase.paymentDatetime = params.paid_at;
               luckyboxPurchase.changeStatusDatetime = params.paid_at;
               luckyboxPurchase.xenditId = params.id;
               luckyboxPurchase.xenditUserId = params.user_id;
               luckyboxPurchase.xenditIsHigh = params.is_high;
               luckyboxPurchase.xenditAmount = params.amount;
               luckyboxPurchase.xenditPaidAmount = params.paid_amount;
               luckyboxPurchase.xenditBankCode = params.bank_code;
               luckyboxPurchase.xenditPayerEmail = params.payer_email;
               luckyboxPurchase.xenditDescription = params.description;
               luckyboxPurchase.xenditAdjustedReceivedAmount = params.adjusted_received_amount;
               luckyboxPurchase.xendit_fees_paid_amount = params.fees_paid_amount;
               luckyboxPurchase.xenditUpdated = params.updated;
               luckyboxPurchase.xenditCreated = params.created;
               luckyboxPurchase.xenditCurrency = params.currency;
               luckyboxPurchase.xenditPaymentChannel = params.payment_channel;
               luckyboxPurchase.xenditPaymentDestination = params.payment_destination;
   
               await this.luckyboxPurchaseModel.update(luckyboxPurchase, undefined, manager);
   
               for (let i = 0; i < luckyboxPurchase.quantity; i++) {
                   let luckyboxPurchaseItem: LuckyboxPurchaseItem = new LuckyboxPurchaseItem();
                   luckyboxPurchaseItem.luckyboxSeqNo = luckyboxPurchase.luckyboxSeqNo;
                   luckyboxPurchaseItem.luckyboxPurchaseSeqNo = luckyboxPurchase.seqNo;
                   luckyboxPurchaseItem.userKey = luckyboxPurchase.userKey;
                   luckyboxPurchaseItem.luckyboxTitle = luckyboxPurchase.title;
                   luckyboxPurchaseItem.paymentMethod = luckyboxPurchase.paymentMethod;
                   luckyboxPurchaseItem.price = luckyboxPurchase.unitPrice;
                   luckyboxPurchaseItem.status = 2;
                   luckyboxPurchaseItem.isOpen = false;
                   luckyboxPurchaseItem.regDatetime = params.paid_at;
                   luckyboxPurchaseItem.tempMember = false;
                   luckyboxPurchaseItem.paymentDatetime = params.paid_at;
                   luckyboxPurchaseItem.xenditId = params.id;
                   luckyboxPurchaseItem.blind = false;
                   await this.luckyboxPurchaseItemModel.create(luckyboxPurchaseItem, undefined, manager);
               }

               if(safeNumber(luckyboxPurchase.useCash) > 0) {
                    let histroyCash = new HistoryCash();
                    histroyCash.userKey = luckyboxPurchase.userKey;
                    histroyCash.type = 'used';
                    histroyCash.category = 'wowbox';
                    histroyCash.cash = luckyboxPurchase.useCash;
                    histroyCash.subject = getLang('id').luckyBoxPurcahseCashSubject;
                    histroyCash.comment = getLang('id').luckyBoxPurcahseCashComment;
                    histroyCash.regDatetime = now();
                    let member = new MemberA();
                    member.userKey = luckyboxPurchase.userKey;
                    member = await this.memberService.updateCash(histroyCash, member, manager);
               }

               let data = {
                    title: getLang('id').luckyBoxPurcasePushTitle,
                    contents: getLang('id').luckyBoxPurcasePushContents,
                    move_type1: 'inner',
                    move_type2: 'luckyboxPurchase'
               }
               console.log(data);
               this.sendPush(luckyboxPurchase.userKey, data);

               return 'SUCCESS';
          }
   
          return 'FAIL';
     }

     private async sendPush(userKey:string, data:any){
          let member = await this.memberService.getMember(userKey);
          let device: Device = await this.deviceService.getDevice({deviceId:member.device})

          let firebase = FireBase.getInstance();
          firebase.send(data, device.pushId);
     }

}