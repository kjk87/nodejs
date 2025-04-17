import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductModel } from "../models/product";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { Product, ProductJoin } from "../entities/product";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { SessionUser } from "../routes/product";
import { ProductImageService } from "./product_image";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { ProductImage } from "../entities/product_image";

export class ProductCreateParams {
     
    seqNo?: number;

    @IsNotEmpty() //validate
    categorySeqNo?: number;

    title?: string;
    status?: string;
    price?: string;
    regDatetime?: string;
}

export class ProductUpdateParams {
    public seqNo?: number;
    public categorySeqNo?: number;
    public title?: string;
    public status?: string;
    public price?: string;
    public regDatetime?: string;
}

export interface ProductListFilter extends ListFilter {
    seqNo?: number;
    categorySeqNo?: number;
    title?: string;
    status?: string;
    price?: string;
    regDatetime?: string;
}

@Service()
export class ProductService extends CoreService {

     //주입
     @Inject(()=> ProductModel)
     private productModel: ProductModel;

     @Inject(()=> ProductImageService)
     private ProductImageService: ProductImageService;

     constructor() {
          super();
     }

     //단일 get
     public async get(seqNo: number) {

          let filter : ProductListFilter = {};
          filter.seqNo = seqNo;
          filter.status = 'active';
          filter.joinColumn = [
               {
                    joinTable: 'productCategory',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
               {
                    joinTable: 'imageList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]

          let order : IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          let product: ProductJoin = await this.productModel.getByFilter(filter, order, ProductJoin);
          if(!product) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'product not found')
          }

          return product;
     }

     //리스트 & 조인
     public async list(filter: ProductListFilter, order: IOrder[], paging: IPaging) {

          filter = filter || {};
          filter.status = 'active';
          filter.joinColumn = [
               {
                    joinTable: 'productCategory',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
               {
                    joinTable: 'imageList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]

          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }
          

          return await this.productModel.list(filter, order, paging, ProductJoin);
     }

}