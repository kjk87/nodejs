import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductDeliveryModel } from "../models/product_delivery";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductDelivery } from "../entities/product_delivery";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class ProductDeliveryCreateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public method?: number;
    public type?: number;
    public shippingCompany?: string;
    public forwardingAddr?: number;
    public returnAddr?: number;
    public paymentMethod?: string;
    public deliveryFee?: number;
    public isAddFee?: boolean;
    public deliveryAddFee1?: number;
    public deliveryAddFee2?: number;
    public deliveryMinPrice?: number;
    public deliveryReturnFee?: number;
    public deliveryExchangeFee?: number;
    public asTel?: string;
    public asMent?: string;
    public specialNote?: string;
}
export class ProductDeliveryUpdateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public method?: number;
    public type?: number;
    public shippingCompany?: string;
    public forwardingAddr?: number;
    public returnAddr?: number;
    public paymentMethod?: string;
    public deliveryFee?: number;
    public isAddFee?: boolean;
    public deliveryAddFee1?: number;
    public deliveryAddFee2?: number;
    public deliveryMinPrice?: number;
    public deliveryReturnFee?: number;
    public deliveryExchangeFee?: number;
    public asTel?: string;
    public asMent?: string;
    public specialNote?: string;
}
export interface ProductDeliveryListFilter extends ListFilter {
    seqNo?: number;
    productSeqNo?: number;
    method?: number;
    type?: number;
    shippingCompany?: string;
    forwardingAddr?: number;
    returnAddr?: number;
    paymentMethod?: string;
    deliveryFee?: number;
    isAddFee?: boolean;
    deliveryAddFee1?: number;
    deliveryAddFee2?: number;
    deliveryMinPrice?: number;
    deliveryReturnFee?: number;
    deliveryExchangeFee?: number;
    asTel?: string;
    asMent?: string;
    specialNote?: string;
}
@Service()
export class ProductDeliveryService extends CoreService {

    @Inject(()=> ProductDeliveryModel)
    private productDeliveryModel: ProductDeliveryModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductDeliveryCreateParams) {
         let productDelivery = new ProductDelivery();

         productDelivery.seqNo = params.seqNo;
         productDelivery.productSeqNo = params.productSeqNo;
         productDelivery.method = params.method;
         productDelivery.type = params.type;
         productDelivery.shippingCompany = params.shippingCompany;
         productDelivery.forwardingAddr = params.forwardingAddr;
         productDelivery.returnAddr = params.returnAddr;
         productDelivery.paymentMethod = params.paymentMethod;
         productDelivery.deliveryFee = params.deliveryFee;
         productDelivery.isAddFee = params.isAddFee;
         productDelivery.deliveryAddFee1 = params.deliveryAddFee1;
         productDelivery.deliveryAddFee2 = params.deliveryAddFee2;
         productDelivery.deliveryMinPrice = params.deliveryMinPrice;
         productDelivery.deliveryReturnFee = params.deliveryReturnFee;
         productDelivery.deliveryExchangeFee = params.deliveryExchangeFee;
         productDelivery.asTel = params.asTel;
         productDelivery.asMent = params.asMent;
         productDelivery.specialNote = params.specialNote;

         await this.productDeliveryModel.create(productDelivery);
         return productDelivery.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let productDelivery = await this.productDeliveryModel.get(seqNo);
         if(!productDelivery) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return productDelivery;
    }

    public async list(req: Request, res: Response, filter: ProductDeliveryListFilter, order: IOrder[], paging: IPaging) {
         return await this.productDeliveryModel.list(filter, order, paging);
    }

    public async update(Request, res: Response, seqNo: number, params: ProductDeliveryUpdateParams) {
         let productDelivery = await this.productDeliveryModel.get(seqNo);
         if(!productDelivery) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               productDelivery.seqNo = params.seqNo;
          };
          if(params.productSeqNo !== undefined) {
               productDelivery.productSeqNo = params.productSeqNo;
          };
          if(params.method !== undefined) {
               productDelivery.method = params.method;
          };
          if(params.type !== undefined) {
               productDelivery.type = params.type;
          };
          if(params.shippingCompany !== undefined) {
               productDelivery.shippingCompany = params.shippingCompany;
          };
          if(params.forwardingAddr !== undefined) {
               productDelivery.forwardingAddr = params.forwardingAddr;
          };
          if(params.returnAddr !== undefined) {
               productDelivery.returnAddr = params.returnAddr;
          };
          if(params.paymentMethod !== undefined) {
               productDelivery.paymentMethod = params.paymentMethod;
          };
          if(params.deliveryFee !== undefined) {
               productDelivery.deliveryFee = params.deliveryFee;
          };
          if(params.isAddFee !== undefined) {
               productDelivery.isAddFee = params.isAddFee;
          };
          if(params.deliveryAddFee1 !== undefined) {
               productDelivery.deliveryAddFee1 = params.deliveryAddFee1;
          };
          if(params.deliveryAddFee2 !== undefined) {
               productDelivery.deliveryAddFee2 = params.deliveryAddFee2;
          };
          if(params.deliveryMinPrice !== undefined) {
               productDelivery.deliveryMinPrice = params.deliveryMinPrice;
          };
          if(params.deliveryReturnFee !== undefined) {
               productDelivery.deliveryReturnFee = params.deliveryReturnFee;
          };
          if(params.deliveryExchangeFee !== undefined) {
               productDelivery.deliveryExchangeFee = params.deliveryExchangeFee;
          };
          if(params.asTel !== undefined) {
               productDelivery.asTel = params.asTel;
          };
          if(params.asMent !== undefined) {
               productDelivery.asMent = params.asMent;
          };
          if(params.specialNote !== undefined) {
               productDelivery.specialNote = params.specialNote;
          };

         await this.productDeliveryModel.update(productDelivery);
         return productDelivery;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let productDelivery = await this.productDeliveryModel.get(seqNo);
         if(!productDelivery) {

              throw new CoreError(ErrorType.E_NOTFOUND);
         }

         await this.productDeliveryModel.delete(productDelivery);
         return productDelivery;
    }

}