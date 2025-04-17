import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductOptionItemModel } from "../models/product_option_item";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductOptionItem } from "../entities/product_option_item";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class ProductOptionItemCreateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public optionSeqNo?: number;
    public item?: string;
}
export class ProductOptionItemUpdateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public optionSeqNo?: number;
    public item?: string;
}
export interface ProductOptionItemListFilter extends ListFilter {
    seqNo?: number;
    productSeqNo?: number;
    optionSeqNo?: number;
    item?: string;
}
@Service()
export class ProductOptionItemService extends CoreService {

    @Inject(()=> ProductOptionItemModel)
    private productOptionItemModel: ProductOptionItemModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductOptionItemCreateParams) {
         let productOptionItem = new ProductOptionItem();

         productOptionItem.seqNo = params.seqNo;
         productOptionItem.productSeqNo = params.productSeqNo;
         productOptionItem.optionSeqNo = params.optionSeqNo;
         productOptionItem.item = params.item;

         await this.productOptionItemModel.create(productOptionItem);
         return productOptionItem.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let productOptionItem = await this.productOptionItemModel.get(seqNo);
         if(!productOptionItem) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return productOptionItem;
    }

    public async list(req: Request, res: Response, filter: ProductOptionItemListFilter, order: IOrder[], paging: IPaging) {
         return await this.productOptionItemModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: ProductOptionItemUpdateParams) {
         let productOptionItem = await this.productOptionItemModel.get(seqNo);
         if(!productOptionItem) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               productOptionItem.seqNo = params.seqNo;
          };
          if(params.productSeqNo !== undefined) {
               productOptionItem.productSeqNo = params.productSeqNo;
          };
          if(params.optionSeqNo !== undefined) {
               productOptionItem.optionSeqNo = params.optionSeqNo;
          };
          if(params.item !== undefined) {
               productOptionItem.item = params.item;
          };

         await this.productOptionItemModel.update(productOptionItem);
         return productOptionItem;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let productOptionItem = await this.productOptionItemModel.get(seqNo);
         if(!productOptionItem) {

              throw new CoreError(ErrorType.E_NOTFOUND);
         }

         await this.productOptionItemModel.delete(productOptionItem);
         return productOptionItem;
    }

}