import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxDeliveryPurchaseModel } from "../models/luckybox_delivery_purchase";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LuckyboxDeliveryPurchase, LuckyboxDeliveryPurchaseJoin } from "../entities/luckybox_delivery_purchase";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { LuckyboxPurchaseItemOption } from "../entities/luckybox_purchase_item_option";
import { LuckyboxDelivery } from "../entities/luckybox_delivery";
import { EntityManager } from "typeorm";
import { LuckyboxPurchaseItemOptionModel } from "../models/luckybox_purchase_item_option";
import { getLang, getRandomOrderId, now } from "../../common/services/util";
import { LuckyboxPurchaseItem } from "../entities/luckybox_purchase_item";
import { LuckyboxPurchaseItemModel } from "../models/luckybox_purchase_item";
import { ProductDelivery } from "../../product/entities/product_delivery";
import { ProductDeliveryModel } from "../../product/models/product_delivery";
import { safeNumber } from '../../common/services/util';
import { ValidateNested } from "class-validator";
import { LuckyboxDeliveryCreateParams } from "./luckybox_delivery";
import { LuckyboxDeliveryModel } from "../models/luckybox_delivery";

import moment = require("moment");
import { LuckyboxPurchaseItemOptionCreateParams } from "./luckybox_purchase_item_option";
import { MemberA } from "../../member/entities/member_a";
import { MemberService } from "../../member/services/member";
import { PaymentParams } from "./luckybox_purchase";
import { XenditService } from "../../xendit/service/xendit";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { DeviceService } from "../../device/services/device";
import { FireBase } from "../../common/services/firebase";
import { Device } from "../../device/entities/device";
import { MemberDelivery } from "../../member/entities/member_delivery";
import { MemberDeliveryService } from "../../member/services/member_delivery";


export class LuckyboxDeliveryPurchaseCreateParams {

     @IsNotEmpty()
     public luckyboxPurchaseItemSeqNo?: number;
     
     @IsNotEmpty()
     public userKey?: string;
     
     public paymentMethod?: string;
     
     @IsNotEmpty()
     public price?: number;

     @IsNotEmpty()
     public status?: number;
     
     public usePoint?: number;
     public pgPrice?: number;

     @ValidateNested()
     public selectDelivery?: LuckyboxDeliveryCreateParams;
     
     public selectOption?: LuckyboxPurchaseItemOptionCreateParams;
     
}

export class LuckyboxDeliveryPurchaseUpdateParams {
    public seqNo?: number;
    public luckyboxPurchaseItemSeqNo?: number;
    public userKey?: string;
    public orderNo?: string;
    public status?: number;
    public paymentMethod?: string;
    public price?: number;
    public regDatetime?: string;
    public paymentDatetime?: string;
    public cancelDatetime?: string;
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
export interface LuckyboxDeliveryPurchaseListFilter extends ListFilter {
    seqNo?: number;
    luckyboxPurchaseItemSeqNo?: number;
    userKey?: string;
    orderNo?: string;
    status?: number;
    paymentMethod?: string;
    price?: number;
    regDatetime?: string;
    paymentDatetime?: string;
    cancelDatetime?: string;
    xenditId?: string;
}
@Service()
export class LuckyboxDeliveryPurchaseService extends CoreService {

     @Inject(()=> LuckyboxDeliveryPurchaseModel)
     private luckyboxDeliveryPurchaseModel: LuckyboxDeliveryPurchaseModel;

     @Inject(()=> LuckyboxPurchaseItemOptionModel)
     private luckyboxPurchaseItemOptionModel: LuckyboxPurchaseItemOptionModel;

     @Inject(()=> LuckyboxPurchaseItemModel)
     private luckyboxPurchaseItemModel: LuckyboxPurchaseItemModel;

     @Inject(()=> ProductDeliveryModel)
     private productDeliveryModel: ProductDeliveryModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     @Inject(()=> MemberDeliveryService)
     private memberDeliveryService: MemberDeliveryService;

     @Inject(()=> DeviceService)
     private deviceService: DeviceService;

     @Inject(()=> XenditService)
     private xenditService: XenditService;

     @Inject(()=> LuckyboxDeliveryModel)
     private luckyboxDeliveryModel: LuckyboxDeliveryModel;


     constructor() {
          super();
     }

     @Transaction()
     public async create(req: Request, res: Response, params: LuckyboxDeliveryPurchaseCreateParams, member: MemberA, manager?: EntityManager) {

          let luckyboxPurchaseItemOption:LuckyboxPurchaseItemOption = LuckyboxPurchaseItemOption.fromObject(params.selectOption, LuckyboxPurchaseItemOption);
          let luckyboxDelivery: LuckyboxDelivery = LuckyboxDelivery.fromObject(params.selectDelivery, LuckyboxDelivery);
          let luckyboxDeliveryPurchase: LuckyboxDeliveryPurchase = LuckyboxDeliveryPurchase.fromObject(params, LuckyboxDeliveryPurchase);

          if(!luckyboxDeliveryPurchase.usePoint) {
               luckyboxDeliveryPurchase.usePoint = 0;
               luckyboxDeliveryPurchase.pgPrice = luckyboxDeliveryPurchase.price;
          } else {
               luckyboxDeliveryPurchase.pgPrice = safeNumber(luckyboxDeliveryPurchase.price) - safeNumber(luckyboxDeliveryPurchase.usePoint);
          }

          if(luckyboxDeliveryPurchase.usePoint == luckyboxDeliveryPurchase.price) {
               luckyboxDeliveryPurchase.paymentMethod = 'point';
          }

          if(luckyboxPurchaseItemOption) {
               await this.luckyboxPurchaseItemOptionModel.create(luckyboxPurchaseItemOption, undefined, manager);
          }

          await this.luckyboxDeliveryModel.create(luckyboxDelivery, undefined, manager);

          let memberDelivery = new MemberDelivery();
          memberDelivery.userKey = member.userKey;
          memberDelivery.receiverName = luckyboxDelivery.receiverName;
          memberDelivery.receiverFamilyName = luckyboxDelivery.receiverFamilyName;
          memberDelivery.receiverPostCode = luckyboxDelivery.receiverPostCode;
          memberDelivery.receiverTel = luckyboxDelivery.receiverTel;
          memberDelivery.receiverAddress = luckyboxDelivery.receiverAddress;
          memberDelivery.receiverAddress2 = luckyboxDelivery.receiverAddress2;
          memberDelivery.receiverProvinsi = luckyboxDelivery.receiverProvinsi;
          memberDelivery.receiverKabkota = luckyboxDelivery.receiverKabkota;
          memberDelivery.receiverKecamatan = luckyboxDelivery.receiverKecamatan;
          memberDelivery.deliveryMemo = luckyboxDelivery.deliveryMemo;
          await this.memberDeliveryService.save(memberDelivery, manager);

          let dateStr = now();

          luckyboxDeliveryPurchase.orderNo = 'delivery'+getRandomOrderId();
          luckyboxDeliveryPurchase.regDatetime = dateStr;

          let luckyboxPurchaseItem: LuckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(luckyboxDeliveryPurchase.luckyboxPurchaseItemSeqNo, undefined, undefined, manager);

          if(luckyboxPurchaseItem.status != 2) {
               throw new CoreError(ErrorType.E_NOTPERMISSION, '결제정보가 없습니다')
          }
          
          luckyboxPurchaseItem.deliveryFee = safeNumber(luckyboxDelivery.deliveryFee) + safeNumber(luckyboxDelivery.deliveryAddFee1) + safeNumber(luckyboxDelivery.deliveryAddFee2)

          if(luckyboxPurchaseItemOption != null){
               luckyboxPurchaseItem.optionPrice = luckyboxPurchaseItemOption.price;
               let depth = luckyboxPurchaseItemOption.depth1;
               if(luckyboxPurchaseItemOption.depth2){
                   depth += "/"+luckyboxPurchaseItemOption.depth2;
               }
               luckyboxPurchaseItem.optionName = depth;
          }

          luckyboxPurchaseItem.deliveryPaymentPrice = luckyboxDeliveryPurchase.price;
          luckyboxPurchaseItem.luckyboxDeliverySeqNo = luckyboxDelivery.seqNo;
          luckyboxPurchaseItem.exchangeDatetime = dateStr;

          if(luckyboxDeliveryPurchase.paymentMethod == 'point') {
               luckyboxDeliveryPurchase.paymentDatetime = dateStr;
               luckyboxDeliveryPurchase.status = 2;

               luckyboxPurchaseItem.deliveryPayStatus = 2;
               luckyboxPurchaseItem.deliveryStatus = 0;

               if(safeNumber(luckyboxDeliveryPurchase.usePoint) > 0) {
                    let histroyPoint = new HistoryPoint();
                    histroyPoint.userKey = luckyboxDeliveryPurchase.userKey;
                    histroyPoint.type = 'used';
                    histroyPoint.category = 'wowbox';
                    histroyPoint.point = luckyboxDeliveryPurchase.usePoint;
                    histroyPoint.subject = getLang('id').luckyBoxDeliveryPurcahsePointSubject;
                    histroyPoint.comment = getLang('id').luckyBoxDeliveryPurcahsePointComment;
                    histroyPoint.regDatetime = now();
                    let member = new MemberA();
                    member.userKey = luckyboxDeliveryPurchase.userKey;
                    member = await this.memberService.updatePoint(histroyPoint, member, manager);
               }
          }else{
               luckyboxDeliveryPurchase.status = 1;
               await this.xenditService.cretateLuckyboxDeleiveryInvoce(luckyboxDeliveryPurchase, luckyboxPurchaseItem, member);

               if(!luckyboxDeliveryPurchase.invoiceUrl){
                    throw new CoreError(ErrorType.E_UNKNOWN);
               }

               luckyboxPurchaseItem.deliveryPayStatus = 1;
          }


          await this.luckyboxDeliveryPurchaseModel.create(luckyboxDeliveryPurchase, undefined, manager);
          
          luckyboxPurchaseItem.luckyboxDeliveryPurchaseSeqNo = luckyboxDeliveryPurchase.seqNo;
          await this.luckyboxPurchaseItemModel.update(luckyboxPurchaseItem, undefined, manager);

          return luckyboxDeliveryPurchase.toObject();

     }

     public async get(req: Request, res: Response, seqNo: number, member: MemberA) {
          let luckyboxDeliveryPurchase = await this.luckyboxDeliveryPurchaseModel.get(seqNo);
          if(!luckyboxDeliveryPurchase) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
          return luckyboxDeliveryPurchase;
     }

     public async list(req: Request, res: Response, filter: LuckyboxDeliveryPurchaseListFilter, order: IOrder[], paging: IPaging, member: MemberA) {
          return await this.luckyboxDeliveryPurchaseModel.list(filter, order, paging);
     }

     public async update(req: Request, res: Response, seqNo: number, params: LuckyboxDeliveryPurchaseUpdateParams, member: MemberA) {
          let luckyboxDeliveryPurchase = await this.luckyboxDeliveryPurchaseModel.get(seqNo);
          if(!luckyboxDeliveryPurchase) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }

               if(params.seqNo !== undefined) {
                    luckyboxDeliveryPurchase.seqNo = params.seqNo;
               };
               if(params.luckyboxPurchaseItemSeqNo !== undefined) {
                    luckyboxDeliveryPurchase.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
               };
               if(params.userKey !== undefined) {
                    luckyboxDeliveryPurchase.userKey = params.userKey;
               };
               if(params.orderNo !== undefined) {
                    luckyboxDeliveryPurchase.orderNo = params.orderNo;
               };
               if(params.status !== undefined) {
                    luckyboxDeliveryPurchase.status = params.status;
               };
               if(params.paymentMethod !== undefined) {
                    luckyboxDeliveryPurchase.paymentMethod = params.paymentMethod;
               };
               if(params.price !== undefined) {
                    luckyboxDeliveryPurchase.price = params.price;
               };
               if(params.regDatetime !== undefined) {
                    luckyboxDeliveryPurchase.regDatetime = params.regDatetime;
               };
               if(params.paymentDatetime !== undefined) {
                    luckyboxDeliveryPurchase.paymentDatetime = params.paymentDatetime;
               };
               if(params.cancelDatetime !== undefined) {
                    luckyboxDeliveryPurchase.cancelDatetime = params.cancelDatetime;
               };

          await this.luckyboxDeliveryPurchaseModel.update(luckyboxDeliveryPurchase);
          return luckyboxDeliveryPurchase;
     }

     public async delete(req: Request, res: Response, seqNo: number, member: MemberA) {
          let luckyboxDeliveryPurchase = await this.luckyboxDeliveryPurchaseModel.get(seqNo);
          if(!luckyboxDeliveryPurchase) {

               throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
          }

          await this.luckyboxDeliveryPurchaseModel.delete(luckyboxDeliveryPurchase);
          return luckyboxDeliveryPurchase;
     }

     @Transaction()
     public async paymentLuckyBoxDeliveryPurchase(req: Request, res: Response, params: PaymentParams, manager?: EntityManager) {
          let status = params.status;
          if(status == 'PAID') {
               
   
               let luckyboxDeliveryPurchase: LuckyboxDeliveryPurchase = await this.luckyboxDeliveryPurchaseModel.getByFilter({orderNo: params.external_id}, undefined, undefined, manager);
               luckyboxDeliveryPurchase.status = 2;
               luckyboxDeliveryPurchase.paymentMethod = params.payment_method;
               luckyboxDeliveryPurchase.paymentDatetime = params.paid_at;
               luckyboxDeliveryPurchase.xenditId = params.id;
               luckyboxDeliveryPurchase.xenditUserId = params.user_id;
               luckyboxDeliveryPurchase.xenditIsHigh = params.is_high;
               luckyboxDeliveryPurchase.xenditAmount = params.amount;
               luckyboxDeliveryPurchase.xenditPaidAmount = params.paid_amount;
               luckyboxDeliveryPurchase.xenditBankCode = params.bank_code;
               luckyboxDeliveryPurchase.xenditPayerEmail = params.payer_email;
               luckyboxDeliveryPurchase.xenditDescription = params.description;
               luckyboxDeliveryPurchase.xenditAdjustedReceivedAmount = params.adjusted_received_amount;
               luckyboxDeliveryPurchase.xendit_fees_paid_amount = params.fees_paid_amount;
               luckyboxDeliveryPurchase.xenditUpdated = params.updated;
               luckyboxDeliveryPurchase.xenditCreated = params.created;
               luckyboxDeliveryPurchase.xenditCurrency = params.currency;
               luckyboxDeliveryPurchase.xenditPaymentChannel = params.payment_channel;
               luckyboxDeliveryPurchase.xenditPaymentDestination = params.payment_destination;
               luckyboxDeliveryPurchase = await this.luckyboxDeliveryPurchaseModel.update(luckyboxDeliveryPurchase, undefined, manager);

               let luckyboxPurchaseItem: LuckyboxPurchaseItem = await this.luckyboxPurchaseItemModel.get(luckyboxDeliveryPurchase.luckyboxPurchaseItemSeqNo, undefined, undefined, manager);

               luckyboxPurchaseItem.deliveryPayStatus = 2;
               luckyboxPurchaseItem.deliveryStatus = 0;
               luckyboxPurchaseItem.exchangeDatetime = params.paid_at;

               await this.luckyboxPurchaseItemModel.update(luckyboxPurchaseItem, undefined, manager);

               if(safeNumber(luckyboxDeliveryPurchase.usePoint) > 0) {
                    let histroyPoint = new HistoryPoint();
                    histroyPoint.userKey = luckyboxDeliveryPurchase.userKey;
                    histroyPoint.type = 'used';
                    histroyPoint.category = 'wowbox';
                    histroyPoint.point = luckyboxDeliveryPurchase.usePoint;
                    histroyPoint.subject = getLang('id').luckyBoxDeliveryPurcahsePointSubject;
                    histroyPoint.comment = getLang('id').luckyBoxDeliveryPurcahsePointComment;
                    histroyPoint.regDatetime = now();
                    let member = new MemberA();
                    member.userKey = luckyboxDeliveryPurchase.userKey;
                    member = await this.memberService.updatePoint(histroyPoint, member, manager);
               }

               let data = {
                    title: getLang('id').luckyBoxDeliveryPurcasePushTitle,
                    contents: getLang('id').luckyBoxDeliveryPurcasePushContents,
                    move_type1: 'inner',
                    move_type2: 'luckyboxDeliveryPurchase'
               }
               console.log(data);
               this.sendPush(luckyboxDeliveryPurchase.userKey, data);

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