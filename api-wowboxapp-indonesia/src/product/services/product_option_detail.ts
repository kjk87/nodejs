import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductOptionDetailModel } from "../models/product_option_detail";
import { IsNotEmpty } from "../../common/services/decorators";
import { ProductOptionDetail } from "../entities/product_option_detail";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class ProductOptionDetailCreateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public optionSeqNo?: number;
    public depth1ItemSeqNo?: number;
    public depth2ItemSeqNo?: number;
    public amount?: number;
    public soldCount?: number;
    public price?: number;
    public flag?: string;
    public status?: number;
    public usable?: boolean;
    public domemeCode?: string;
    public domaemae?: string;
}
export class ProductOptionDetailUpdateParams {
    public seqNo?: number;
    public productSeqNo?: number;
    public optionSeqNo?: number;
    public depth1ItemSeqNo?: number;
    public depth2ItemSeqNo?: number;
    public amount?: number;
    public soldCount?: number;
    public price?: number;
    public flag?: string;
    public status?: number;
    public usable?: boolean;
    public domemeCode?: string;
    public domaemae?: string;
}
export interface ProductOptionDetailListFilter extends ListFilter {
    seqNo?: number;
    productSeqNo?: number;
    optionSeqNo?: number;
    depth1ItemSeqNo?: number;
    depth2ItemSeqNo?: number;
    amount?: number;
    soldCount?: number;
    price?: number;
    flag?: string;
    status?: number;
    usable?: boolean;
    domemeCode?: string;
    domaemae?: string;
}
@Service()
export class ProductOptionDetailService extends CoreService {

    @Inject(()=> ProductOptionDetailModel)
    private productOptionDetailModel: ProductOptionDetailModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductOptionDetailCreateParams) {
         let productOptionDetail = new ProductOptionDetail();

         productOptionDetail.seqNo = params.seqNo;
         productOptionDetail.productSeqNo = params.productSeqNo;
         productOptionDetail.optionSeqNo = params.optionSeqNo;
         productOptionDetail.depth1ItemSeqNo = params.depth1ItemSeqNo;
         productOptionDetail.depth2ItemSeqNo = params.depth2ItemSeqNo;
         productOptionDetail.amount = params.amount;
         productOptionDetail.soldCount = params.soldCount;
         productOptionDetail.price = params.price;
         productOptionDetail.flag = params.flag;
         productOptionDetail.status = params.status;
         productOptionDetail.usable = params.usable;
         productOptionDetail.domemeCode = params.domemeCode;
         productOptionDetail.domaemae = params.domaemae;

         await this.productOptionDetailModel.create(productOptionDetail);
         return productOptionDetail.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let productOptionDetail = await this.productOptionDetailModel.get(seqNo);
         if(!productOptionDetail) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return productOptionDetail;
    }

    public async list(req: Request, res: Response, filter: ProductOptionDetailListFilter, order: IOrder[], paging: IPaging) {
         return await this.productOptionDetailModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: ProductOptionDetailUpdateParams) {
         let productOptionDetail = await this.productOptionDetailModel.get(seqNo);
         if(!productOptionDetail) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               productOptionDetail.seqNo = params.seqNo;
          };
          if(params.productSeqNo !== undefined) {
               productOptionDetail.productSeqNo = params.productSeqNo;
          };
          if(params.optionSeqNo !== undefined) {
               productOptionDetail.optionSeqNo = params.optionSeqNo;
          };
          if(params.depth1ItemSeqNo !== undefined) {
               productOptionDetail.depth1ItemSeqNo = params.depth1ItemSeqNo;
          };
          if(params.depth2ItemSeqNo !== undefined) {
               productOptionDetail.depth2ItemSeqNo = params.depth2ItemSeqNo;
          };
          if(params.amount !== undefined) {
               productOptionDetail.amount = params.amount;
          };
          if(params.soldCount !== undefined) {
               productOptionDetail.soldCount = params.soldCount;
          };
          if(params.price !== undefined) {
               productOptionDetail.price = params.price;
          };
          if(params.flag !== undefined) {
               productOptionDetail.flag = params.flag;
          };
          if(params.status !== undefined) {
               productOptionDetail.status = params.status;
          };
          if(params.usable !== undefined) {
               productOptionDetail.usable = params.usable;
          };
          if(params.domemeCode !== undefined) {
               productOptionDetail.domemeCode = params.domemeCode;
          };
          if(params.domaemae !== undefined) {
               productOptionDetail.domaemae = params.domaemae;
          };

         await this.productOptionDetailModel.update(productOptionDetail);
         return productOptionDetail;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let productOptionDetail = await this.productOptionDetailModel.get(seqNo);
         if(!productOptionDetail) {

              throw new CoreError(ErrorType.E_NOTFOUND);
         }

         await this.productOptionDetailModel.delete(productOptionDetail);
         return productOptionDetail;
    }

}