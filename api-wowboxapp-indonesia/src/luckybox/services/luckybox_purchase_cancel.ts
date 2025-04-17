import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxPurchaseCancelModel } from "../models/luckybox_purchase_cancel";
import { IsNotEmpty } from "../../common/services/decorators";
import { LuckyboxPurchaseCancel } from "../entities/luckybox_purchase_cancel";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LuckyboxPurchaseCancelCreateParams {
    public seqNo?: number;
    public luckyboxPurchaseSeqNo?: number;
    public luckyboxPurchaseItemSeqNo?: number;
    public payResponseAmt?: string;
    public payResponseApprovalNo?: string;
    public payResponseApprovalYmdhms?: string;
    public payResponseCardId?: string;
    public payResponseCardNm?: string;
    public payResponseCertYn?: string;
    public payResponseCode?: string;
    public payResponseInstallment?: string;
    public payResponseMsg?: string;
    public payResponseOrderNo?: string;
    public payResponsePayDate?: string;
    public payResponsePayTime?: string;
    public payResponsePayType?: string;
    public payResponseSellMm?: string;
    public payResponseTestYn?: string;
    public payResponseTranSeq?: string;
    public payResponseZerofeeYn?: string;
    public payResponsePartCancelFlag?: string;
    public payResponseRemainAmt?: number;
}
export class LuckyboxPurchaseCancelUpdateParams {
    public seqNo?: number;
    public luckyboxPurchaseSeqNo?: number;
    public luckyboxPurchaseItemSeqNo?: number;
    public payResponseAmt?: string;
    public payResponseApprovalNo?: string;
    public payResponseApprovalYmdhms?: string;
    public payResponseCardId?: string;
    public payResponseCardNm?: string;
    public payResponseCertYn?: string;
    public payResponseCode?: string;
    public payResponseInstallment?: string;
    public payResponseMsg?: string;
    public payResponseOrderNo?: string;
    public payResponsePayDate?: string;
    public payResponsePayTime?: string;
    public payResponsePayType?: string;
    public payResponseSellMm?: string;
    public payResponseTestYn?: string;
    public payResponseTranSeq?: string;
    public payResponseZerofeeYn?: string;
    public payResponsePartCancelFlag?: string;
    public payResponseRemainAmt?: number;
}
export interface LuckyboxPurchaseCancelListFilter extends ListFilter {
    seqNo?: number;
    luckyboxPurchaseSeqNo?: number;
    luckyboxPurchaseItemSeqNo?: number;
    payResponseAmt?: string;
    payResponseApprovalNo?: string;
    payResponseApprovalYmdhms?: string;
    payResponseCardId?: string;
    payResponseCardNm?: string;
    payResponseCertYn?: string;
    payResponseCode?: string;
    payResponseInstallment?: string;
    payResponseMsg?: string;
    payResponseOrderNo?: string;
    payResponsePayDate?: string;
    payResponsePayTime?: string;
    payResponsePayType?: string;
    payResponseSellMm?: string;
    payResponseTestYn?: string;
    payResponseTranSeq?: string;
    payResponseZerofeeYn?: string;
    payResponsePartCancelFlag?: string;
    payResponseRemainAmt?: number;
}
@Service()
export class LuckyboxPurchaseCancelService extends CoreService {

     @Inject(()=> LuckyboxPurchaseCancelModel)
     private luckyboxPurchaseCancelModel: LuckyboxPurchaseCancelModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: LuckyboxPurchaseCancelCreateParams) {
          let luckyboxPurchaseCancel = new LuckyboxPurchaseCancel();

          luckyboxPurchaseCancel.seqNo = params.seqNo;
          luckyboxPurchaseCancel.luckyboxPurchaseSeqNo = params.luckyboxPurchaseSeqNo;
          luckyboxPurchaseCancel.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
          luckyboxPurchaseCancel.payResponseAmt = params.payResponseAmt;
          luckyboxPurchaseCancel.payResponseApprovalNo = params.payResponseApprovalNo;
          luckyboxPurchaseCancel.payResponseApprovalYmdhms = params.payResponseApprovalYmdhms;
          luckyboxPurchaseCancel.payResponseCardId = params.payResponseCardId;
          luckyboxPurchaseCancel.payResponseCardNm = params.payResponseCardNm;
          luckyboxPurchaseCancel.payResponseCertYn = params.payResponseCertYn;
          luckyboxPurchaseCancel.payResponseCode = params.payResponseCode;
          luckyboxPurchaseCancel.payResponseInstallment = params.payResponseInstallment;
          luckyboxPurchaseCancel.payResponseMsg = params.payResponseMsg;
          luckyboxPurchaseCancel.payResponseOrderNo = params.payResponseOrderNo;
          luckyboxPurchaseCancel.payResponsePayDate = params.payResponsePayDate;
          luckyboxPurchaseCancel.payResponsePayTime = params.payResponsePayTime;
          luckyboxPurchaseCancel.payResponsePayType = params.payResponsePayType;
          luckyboxPurchaseCancel.payResponseSellMm = params.payResponseSellMm;
          luckyboxPurchaseCancel.payResponseTestYn = params.payResponseTestYn;
          luckyboxPurchaseCancel.payResponseTranSeq = params.payResponseTranSeq;
          luckyboxPurchaseCancel.payResponseZerofeeYn = params.payResponseZerofeeYn;
          luckyboxPurchaseCancel.payResponsePartCancelFlag = params.payResponsePartCancelFlag;
          luckyboxPurchaseCancel.payResponseRemainAmt = params.payResponseRemainAmt;

          await this.luckyboxPurchaseCancelModel.create(luckyboxPurchaseCancel);
          return luckyboxPurchaseCancel.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchaseCancel = await this.luckyboxPurchaseCancelModel.get(seqNo);
          if(!luckyboxPurchaseCancel) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxPurchaseCancel;
     }

     public async list(req: Request, res: Response, filter: LuckyboxPurchaseCancelListFilter, order: IOrder[], paging: IPaging) {
          return await this.luckyboxPurchaseCancelModel.list(filter, order, paging);
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxPurchaseCancelUpdateParams) {
          let luckyboxPurchaseCancel = await this.luckyboxPurchaseCancelModel.get(seqNo);
          if(!luckyboxPurchaseCancel) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

               if(params.seqNo !== undefined) {
                    luckyboxPurchaseCancel.seqNo = params.seqNo;
               };
               if(params.luckyboxPurchaseSeqNo !== undefined) {
                    luckyboxPurchaseCancel.luckyboxPurchaseSeqNo = params.luckyboxPurchaseSeqNo;
               };
               if(params.luckyboxPurchaseItemSeqNo !== undefined) {
                    luckyboxPurchaseCancel.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
               };
               if(params.payResponseAmt !== undefined) {
                    luckyboxPurchaseCancel.payResponseAmt = params.payResponseAmt;
               };
               if(params.payResponseApprovalNo !== undefined) {
                    luckyboxPurchaseCancel.payResponseApprovalNo = params.payResponseApprovalNo;
               };
               if(params.payResponseApprovalYmdhms !== undefined) {
                    luckyboxPurchaseCancel.payResponseApprovalYmdhms = params.payResponseApprovalYmdhms;
               };
               if(params.payResponseCardId !== undefined) {
                    luckyboxPurchaseCancel.payResponseCardId = params.payResponseCardId;
               };
               if(params.payResponseCardNm !== undefined) {
                    luckyboxPurchaseCancel.payResponseCardNm = params.payResponseCardNm;
               };
               if(params.payResponseCertYn !== undefined) {
                    luckyboxPurchaseCancel.payResponseCertYn = params.payResponseCertYn;
               };
               if(params.payResponseCode !== undefined) {
                    luckyboxPurchaseCancel.payResponseCode = params.payResponseCode;
               };
               if(params.payResponseInstallment !== undefined) {
                    luckyboxPurchaseCancel.payResponseInstallment = params.payResponseInstallment;
               };
               if(params.payResponseMsg !== undefined) {
                    luckyboxPurchaseCancel.payResponseMsg = params.payResponseMsg;
               };
               if(params.payResponseOrderNo !== undefined) {
                    luckyboxPurchaseCancel.payResponseOrderNo = params.payResponseOrderNo;
               };
               if(params.payResponsePayDate !== undefined) {
                    luckyboxPurchaseCancel.payResponsePayDate = params.payResponsePayDate;
               };
               if(params.payResponsePayTime !== undefined) {
                    luckyboxPurchaseCancel.payResponsePayTime = params.payResponsePayTime;
               };
               if(params.payResponsePayType !== undefined) {
                    luckyboxPurchaseCancel.payResponsePayType = params.payResponsePayType;
               };
               if(params.payResponseSellMm !== undefined) {
                    luckyboxPurchaseCancel.payResponseSellMm = params.payResponseSellMm;
               };
               if(params.payResponseTestYn !== undefined) {
                    luckyboxPurchaseCancel.payResponseTestYn = params.payResponseTestYn;
               };
               if(params.payResponseTranSeq !== undefined) {
                    luckyboxPurchaseCancel.payResponseTranSeq = params.payResponseTranSeq;
               };
               if(params.payResponseZerofeeYn !== undefined) {
                    luckyboxPurchaseCancel.payResponseZerofeeYn = params.payResponseZerofeeYn;
               };
               if(params.payResponsePartCancelFlag !== undefined) {
                    luckyboxPurchaseCancel.payResponsePartCancelFlag = params.payResponsePartCancelFlag;
               };
               if(params.payResponseRemainAmt !== undefined) {
                    luckyboxPurchaseCancel.payResponseRemainAmt = params.payResponseRemainAmt;
               };

          await this.luckyboxPurchaseCancelModel.update(luckyboxPurchaseCancel);
          return luckyboxPurchaseCancel;
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchaseCancel = await this.luckyboxPurchaseCancelModel.get(seqNo);
          if(!luckyboxPurchaseCancel) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxPurchaseCancelModel.delete(luckyboxPurchaseCancel);
          return luckyboxPurchaseCancel;
     }

}