import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxDeliveryModel } from "../models/luckybox_delivery";
import { IsNotEmpty } from "../../common/services/decorators";
import { LuckyboxDelivery } from "../entities/luckybox_delivery";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";


export class LuckyboxDeliveryCreateParams {
    
     @IsNotEmpty()
     public luckyboxPurchaseItemSeqNo?: number;
     
     @IsNotEmpty()
     public type?: number;

     @IsNotEmpty()
     public method?: number;

     @IsNotEmpty()
     public paymentMethod?: string;

     @IsNotEmpty()
     public receiverName?: string;
     
     @IsNotEmpty()
     public receiverFamilyName?: string;
     
     @IsNotEmpty()
     public receiverPostCode?: string;
     
     @IsNotEmpty()
     public receiverAddress?: string;
     
     @IsNotEmpty()
     public receiverAddress2?: string;

     @IsNotEmpty()
     public receiverProvinsi?: string;
     
     @IsNotEmpty()
     public receiverKabkota?: string;
     
     @IsNotEmpty()
     public receiverKecamatan?: string;

     public deliveryMemo?: string;
     
     @IsNotEmpty()
     public deliveryFee?: number;
     
     public deliveryStartDatetime?: string;
     public deliveryCompleteDatetime?: string;
     
     @IsNotEmpty()
     public deliveryAddFee1?: number;
     
     @IsNotEmpty()
     public deliveryAddFee2?: number;
     public shippingCompany?: string;
     public transportNumber?: string;
     public shippingCompanyCode?: string;
}

export interface LuckyboxDeliveryListFilter extends ListFilter {
    seqNo?: number;
    luckyboxPurchaseItemSeqNo?: number;
    type?: number;
    method?: number;
    paymentMethod?: string;
    receiverName?: string;
    receiverPostCode?: string;
    receiverAddress?: string;
    deliveryMemo?: string;
    deliveryFee?: number;
    deliveryStartDatetime?: string;
    deliveryCompleteDatetime?: string;
    deliveryAddFee1?: number;
    deliveryAddFee2?: number;
    shippingCompany?: string;
    transportNumber?: string;
    shippingCompanyCode?: string;
}


@Service()
export class LuckyboxDeliveryService extends CoreService {

     @Inject(()=> LuckyboxDeliveryModel)
     private luckyboxDeliveryModel: LuckyboxDeliveryModel;

     constructor() {
          super();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxDelivery = await this.luckyboxDeliveryModel.get(seqNo);
          if(!luckyboxDelivery) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxDelivery;
     }

     public async list(req: Request, res: Response, filter: LuckyboxDeliveryListFilter, order: IOrder[], paging: IPaging) {
          return await this.luckyboxDeliveryModel.list(filter, order, paging);
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxDelivery = await this.luckyboxDeliveryModel.get(seqNo);
          if(!luckyboxDelivery) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxDeliveryModel.delete(luckyboxDelivery);
          return luckyboxDelivery;
     }

}