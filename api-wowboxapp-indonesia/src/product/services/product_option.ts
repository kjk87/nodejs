import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductOptionModel } from "../models/product_option";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductOption } from "../entities/product_option";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { ProductOptionItemModel } from "../models/product_option_item";
import { ProductOptionDetailModel } from "../models/product_option_detail";
import { arrayToMap, arrayToMapArray } from "../../common/services/util";

export class ProductOptionCreateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public name?: string;
    public item?: string;
}
export class ProductOptionUpdateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public name?: string;
    public item?: string;
}
export class ProductOptionListFilter extends ListFilter {
     seqNo?: number;
    
     @IsNotEmpty()
     productSeqNo?: number;
     name?: string;
     item?: string;
}
@Service()
export class ProductOptionService extends CoreService {

     @Inject(()=> ProductOptionModel)
     private productOptionModel: ProductOptionModel;

     @Inject(()=> ProductOptionItemModel)
     private productOptionItemModel: ProductOptionItemModel;

     @Inject(()=> ProductOptionDetailModel)
     private productOptionDetailModel: ProductOptionDetailModel;


    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductOptionCreateParams) {
         let productOption = new ProductOption();

         productOption.seqNo = params.seqNo;
         productOption.productSeqNo = params.productSeqNo;
         productOption.name = params.name;
         productOption.item = params.item;

         await this.productOptionModel.create(productOption);
         return productOption.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let productOption = await this.productOptionModel.get(seqNo);
         if(!productOption) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return productOption;
    }

     public async list(req: Request, res: Response, filter: ProductOptionListFilter, order: IOrder[], paging: IPaging) {
         
          let [option, item, detail] = await Promise.all([
               this.productOptionModel.all({productSeqNo: filter.productSeqNo}),
               this.productOptionItemModel.all({productSeqNo: filter.productSeqNo}),
               this.productOptionDetailModel.all({productSeqNo: filter.productSeqNo})
          ])

          let itemArray = arrayToMapArray(item.list, 'optionSeqNo');

          let itemMap = arrayToMap(item.list, 'seqNo');

          for(let op of option.list) {
               op.items = itemArray[op.seqNo];
          }

          for(let det of detail.list) {
               if(itemMap[det.depth1ItemSeqNo]) det.item1 = itemMap[det.depth1ItemSeqNo];
               if(itemMap[det.depth2ItemSeqNo]) det.item2 = itemMap[det.depth2ItemSeqNo];
          }

          return {
               option: option.list,
               detail: detail.list
          }
     }

    public async update(req: Request, res: Response, seqNo: number, params: ProductOptionUpdateParams) {
         let productOption = await this.productOptionModel.get(seqNo);
         if(!productOption) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               productOption.seqNo = params.seqNo;
          };
          if(params.productSeqNo !== undefined) {
               productOption.productSeqNo = params.productSeqNo;
          };
          if(params.name !== undefined) {
               productOption.name = params.name;
          };
          if(params.item !== undefined) {
               productOption.item = params.item;
          };

         await this.productOptionModel.update(productOption);
         return productOption;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let productOption = await this.productOptionModel.get(seqNo);
         if(!productOption) {

              throw new CoreError(ErrorType.E_NOTFOUND);
         }

         await this.productOptionModel.delete(productOption);
         return productOption;
    }

}