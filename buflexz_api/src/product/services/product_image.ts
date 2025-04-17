import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductImageModel } from "../models/product_image";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductImage } from "../entities/product_image";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export interface ProductImageListFilter extends ListFilter {
     seqNo?: number;
     productSeqNo?: number;
     image?: string;
     array?: number;
}

@Service()
export class ProductImageService extends CoreService {

     @Inject(()=> ProductImageModel)
     private productImageModel: ProductImageModel;


     constructor() {
          super();
     }

     //단일 get
     public async get(seqNo: number) {
          let product = await this.productImageModel.get(seqNo);
          if(!product) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'product image not found')
          }
          return product;
     }
}