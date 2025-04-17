import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductImageModel } from "../models/product_image";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductImage } from "../entities/product_image";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class ProductImageCreateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public image?: string;
    public array?: number;
    public deligate?: boolean;
}
export class ProductImageUpdateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public image?: string;
    public array?: number;
    public deligate?: boolean;
}
export interface ProductImageListFilter extends ListFilter {
     seqNo?: number;
    productSeqNo?: number;
    image?: string;
    array?: number;
    deligate?: boolean;
}
@Service()
export class ProductImageService extends CoreService {

    @Inject(()=> ProductImageModel)
    private productImageModel: ProductImageModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductImageCreateParams) {
         let productImage = new ProductImage();

         productImage.seqNo = params.seqNo;
         productImage.productSeqNo = params.productSeqNo;
         productImage.image = params.image;
         productImage.array = params.array;
         productImage.deligate = params.deligate;

         await this.productImageModel.create(productImage);
         return productImage.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let productImage = await this.productImageModel.get(seqNo);
         if(!productImage) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return productImage;
    }

    public async list(req: Request, res: Response, filter: ProductImageListFilter, order: IOrder[], paging: IPaging) {
         return await this.productImageModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: ProductImageUpdateParams) {
         let productImage = await this.productImageModel.get(seqNo);
         if(!productImage) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               productImage.seqNo = params.seqNo;
          };
          if(params.productSeqNo !== undefined) {
               productImage.productSeqNo = params.productSeqNo;
          };
          if(params.image !== undefined) {
               productImage.image = params.image;
          };
          if(params.array !== undefined) {
               productImage.array = params.array;
          };
          if(params.deligate !== undefined) {
               productImage.deligate = params.deligate;
          };

         await this.productImageModel.update(productImage);
         return productImage;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let productImage = await this.productImageModel.get(seqNo);
         if(!productImage) {

              throw new CoreError(ErrorType.E_NOTFOUND);
         }

         await this.productImageModel.delete(productImage);
         return productImage;
    }

}