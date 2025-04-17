import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductCategoryModel } from "../models/product_category";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductCategory } from "../entities/product_category";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export interface ProductCategoryListFilter extends ListFilter {
     seqNo?: number;
     title?: string;
     status?: string;
     array?: number;
     regDatetime?: string;
}

@Service()
export class ProductCategoryService extends CoreService {
     
     constructor() {
         super();
     }

     @Inject(()=> ProductCategoryModel)
     private productCategoryModel: ProductCategoryModel;

     public async list(){

          let filter:ProductCategoryListFilter = {}
          filter.status = 'active';
  
          let order:IOrder[] = [
              {
                   column: `array`,
                   dir: 'ASC'
              }
         ]
  
         return await this.productCategoryModel.all(filter, order);
      }
}