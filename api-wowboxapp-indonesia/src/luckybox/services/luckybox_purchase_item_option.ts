import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxPurchaseItemOptionModel } from "../models/luckybox_purchase_item_option";
import { IsNotEmpty } from "../../common/services/decorators";
import { LuckyboxPurchaseItemOption } from "../entities/luckybox_purchase_item_option";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LuckyboxPurchaseItemOptionCreateParams {
     public seqNo?: number;
     public luckyboxPurchaseItemSeqNo?: number;
     public productSeqNo?: number;
     public productOptionDetailSeqNo?: number;
     public quantity?: number;
     public price?: number;
     public depth1?: string;
     public depth2?: string;
}
export class LuckyboxPurchaseItemOptionUpdateParams {
     public seqNo?: number;
     public luckyboxPurchaseItemSeqNo?: number;
     public productSeqNo?: number;
     public productOptionDetailSeqNo?: number;
     public quantity?: number;
     public price?: number;
     public depth1?: string;
     public depth2?: string;
}
export interface LuckyboxPurchaseItemOptionListFilter extends ListFilter {
     seqNo?: number;
     luckyboxPurchaseItemSeqNo?: number;
     productSeqNo?: number;
     productOptionDetailSeqNo?: number;
     quantity?: number;
     price?: number;
     depth1?: string;
     depth2?: string;
}
@Service()
export class LuckyboxPurchaseItemOptionService extends CoreService {

     @Inject(()=> LuckyboxPurchaseItemOptionModel)
     private luckyboxPurchaseItemOptionModel: LuckyboxPurchaseItemOptionModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: LuckyboxPurchaseItemOptionCreateParams) {
          let luckyboxPurchaseItemOption = new LuckyboxPurchaseItemOption();

          luckyboxPurchaseItemOption.seqNo = params.seqNo;
          luckyboxPurchaseItemOption.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
          luckyboxPurchaseItemOption.productSeqNo = params.productSeqNo;
          luckyboxPurchaseItemOption.productOptionDetailSeqNo = params.productOptionDetailSeqNo;
          luckyboxPurchaseItemOption.quantity = params.quantity;
          luckyboxPurchaseItemOption.price = params.price;
          luckyboxPurchaseItemOption.depth1 = params.depth1;
          luckyboxPurchaseItemOption.depth2 = params.depth2;

          await this.luckyboxPurchaseItemOptionModel.create(luckyboxPurchaseItemOption);
          return luckyboxPurchaseItemOption.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchaseItemOption = await this.luckyboxPurchaseItemOptionModel.get(seqNo);
          if(!luckyboxPurchaseItemOption) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxPurchaseItemOption;
     }

     public async list(req: Request, res: Response, filter: LuckyboxPurchaseItemOptionListFilter, order: IOrder[], paging: IPaging) {
          return await this.luckyboxPurchaseItemOptionModel.list(filter, order, paging);
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxPurchaseItemOptionUpdateParams) {
          let luckyboxPurchaseItemOption = await this.luckyboxPurchaseItemOptionModel.get(seqNo);
          if(!luckyboxPurchaseItemOption) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

               if(params.seqNo !== undefined) {
                    luckyboxPurchaseItemOption.seqNo = params.seqNo;
               };
               if(params.luckyboxPurchaseItemSeqNo !== undefined) {
                    luckyboxPurchaseItemOption.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
               };
               if(params.productSeqNo !== undefined) {
                    luckyboxPurchaseItemOption.productSeqNo = params.productSeqNo;
               };
               if(params.productOptionDetailSeqNo !== undefined) {
                    luckyboxPurchaseItemOption.productOptionDetailSeqNo = params.productOptionDetailSeqNo;
               };
               if(params.quantity !== undefined) {
                    luckyboxPurchaseItemOption.quantity = params.quantity;
               };
               if(params.price !== undefined) {
                    luckyboxPurchaseItemOption.price = params.price;
               };
               if(params.depth1 !== undefined) {
                    luckyboxPurchaseItemOption.depth1 = params.depth1;
               };
               if(params.depth2 !== undefined) {
                    luckyboxPurchaseItemOption.depth2 = params.depth2;
               };

          await this.luckyboxPurchaseItemOptionModel.update(luckyboxPurchaseItemOption);
          return luckyboxPurchaseItemOption;
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxPurchaseItemOption = await this.luckyboxPurchaseItemOptionModel.get(seqNo);
          if(!luckyboxPurchaseItemOption) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxPurchaseItemOptionModel.delete(luckyboxPurchaseItemOption);
          return luckyboxPurchaseItemOption;
     }

}