import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ProductModel } from "../models/product";
import { IsNotEmpty } from "../../common/services/decorators";
import { Product, ProductJoin } from "../entities/product";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { arrayObjectToValue, arrayToMapArray, isNonEmptyArray } from "../../common/services/util";
import { ProductImageModel } from "../models/product_image";
import { MemberA } from "../../member/entities/member_a";

export class ProductCreateParams {
    public seqNo?: number;
    public marketType?: string;
    public salesType?: number;
    public status?: number;
    public blind?: boolean;
    public reason?: string;
    public first?: number;
    public second?: number;
    public third?: number;
    public name?: string;
    public priceMethod?: string;
    public surtax?: boolean;
    public salesTerm?: boolean;
    public startDate?: string;
    public endDate?: string;
    public contents?: string;
    public count?: number;
    public soldCount?: number;
    public useOption?: boolean;
    public optionType?: string;
    public optionArray?: string;
    public register?: string;
    public registerType?: string;
    public isKc?: boolean;
    public nonKcMemo?: string;
    public noticeGroup?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public statusDatetime?: string;
    public wholesaleCompany?: string;
    public originalSeqNo?: string;
    public supplierSeqNo?: number;
    public origin?: string;
    public notice?: string;
    public subName?: string;
    public domeSellerId?: string;
    public changeEnable?: boolean;
}
export class ProductUpdateParams {
    public seqNo?: number;
    public marketType?: string;
    public salesType?: number;
    public status?: number;
    public blind?: boolean;
    public reason?: string;
    public first?: number;
    public second?: number;
    public third?: number;
    public name?: string;
    public priceMethod?: string;
    public surtax?: boolean;
    public salesTerm?: boolean;
    public startDate?: string;
    public endDate?: string;
    public contents?: string;
    public count?: number;
    public soldCount?: number;
    public useOption?: boolean;
    public optionType?: string;
    public optionArray?: string;
    public register?: string;
    public registerType?: string;
    public isKc?: boolean;
    public nonKcMemo?: string;
    public noticeGroup?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public statusDatetime?: string;
    public wholesaleCompany?: string;
    public originalSeqNo?: string;
    public supplierSeqNo?: number;
    public origin?: string;
    public notice?: string;
    public subName?: string;
    public domeSellerId?: string;
    public changeEnable?: boolean;
}
export interface ProductListFilter extends ListFilter {
    seqNo?: number[];
    marketType?: string;
    salesType?: number;
    status?: number;
    blind?: boolean;
    blindNot?: boolean;
    reason?: string;
    first?: number;
    second?: number;
    third?: number;
    name?: string;
    priceMethod?: string;
    surtax?: boolean;
    salesTerm?: boolean;
    startDate?: string;
    endDate?: string;
    contents?: string;
    count?: number;
    soldCount?: number;
    useOption?: boolean;
    optionType?: string;
    optionArray?: string;
    register?: string;
    registerType?: string;
    isKc?: boolean;
    nonKcMemo?: string;
    noticeGroup?: string;
    regDatetime?: string;
    modDatetime?: string;
    statusDatetime?: string;
    wholesaleCompany?: string;
    originalSeqNo?: string;
    supplierSeqNo?: number;
    origin?: string;
    notice?: string;
    subName?: string;
    domeSellerId?: string;
    changeEnable?: boolean;
    userKey?: string;
    search?: string;
    pick?: boolean;
    shoppingGroupSeqNo?: number;
    random?: boolean;
}

export class firstComeFilter extends ListFilter{
     public shoppingGroupSeqNo: number;
}

@Service()
export class ProductService extends CoreService {

     @Inject(()=> ProductModel)
     private productModel: ProductModel;

     @Inject(()=> ProductImageModel)
     private productImageModel: ProductImageModel;


    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: ProductCreateParams) {
         let product = new Product();

         product.seqNo = params.seqNo;
         product.marketType = params.marketType;
         product.salesType = params.salesType;
         product.status = params.status;
         product.blind = params.blind;
         product.reason = params.reason;
         product.first = params.first;
         product.second = params.second;
         product.third = params.third;
         product.name = params.name;
         product.priceMethod = params.priceMethod;
         product.surtax = params.surtax;
         product.salesTerm = params.salesTerm;
         product.startDate = params.startDate;
         product.endDate = params.endDate;
         product.contents = params.contents;
         product.count = params.count;
         product.soldCount = params.soldCount;
         product.useOption = params.useOption;
         product.optionType = params.optionType;
         product.optionArray = params.optionArray;
         product.register = params.register;
         product.registerType = params.registerType;
         product.isKc = params.isKc;
         product.nonKcMemo = params.nonKcMemo;
         product.noticeGroup = params.noticeGroup;
         product.regDatetime = params.regDatetime;
         product.modDatetime = params.modDatetime;
         product.statusDatetime = params.statusDatetime;
         product.wholesaleCompany = params.wholesaleCompany;
         product.originalSeqNo = params.originalSeqNo;
         product.supplierSeqNo = params.supplierSeqNo;
         product.origin = params.origin;
         product.notice = params.notice;
         product.subName = params.subName;
         product.domeSellerId = params.domeSellerId;
         product.changeEnable = params.changeEnable;

         await this.productModel.create(product);
         return product.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
          let filter = {
               seqNo: seqNo
          }

          let product = await this.productModel.getByFilter(filter, undefined, ProductJoin);
         if(!product) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

         let _order: IOrder[] = [
               {
                    column: 'deligate', 
                    dir: 'DESC'
               }, 
               {
                    column: 'array', 
                    dir: 'DESC'
               }
          ]
     
          let productImageList = await this.productImageModel.all({productSeqNo: product.seqNo}, _order);
          product['images'] = productImageList;
          
          return product;
    }

     public async list(req: Request, res: Response, filter: ProductListFilter, order: IOrder[], paging: IPaging, member:MemberA) {
         
          filter.status = 1;
          filter.blindNot = true;
          filter.salesType = 3;
          filter.pick = filter.pick ? true : undefined;
          filter.userKey = member.userKey;
          if(filter.search) {
               filter.search = filter.search.replace(/\s/ig, '');
          }


          if(isNonEmptyArray(order)) {
               order.push({column: 'seqNo', dir: 'DESC'});
          }

          let productList = await this.productModel.list(filter, order, paging, ProductJoin);

          if(productList.list.length > 0) {
               let productSeqNoArr = arrayObjectToValue(productList.list, 'seqNo');
               let _order: IOrder[] = [
                    {
                         column: 'deligate', 
                         dir: 'DESC'
                    }, 
                    {
                         column: 'array', 
                         dir: 'DESC'
                    }
               ]
               
               let productImageList = await this.productImageModel.all({productSeqNo: productSeqNoArr}, _order);
               let productImageListMapArray = arrayToMapArray(productImageList, 'productSeqNo');
               
               for(let product of productList.list) {
                    product.images = productImageListMapArray[product.seqNo];
               }
          }

          return productList;
     }

     
     public async firstCome(req: Request, res: Response, filter: firstComeFilter, order: IOrder[], paging: IPaging, member:MemberA) {
         
          if(!filter.shoppingGroupSeqNo) {
               if(process.env.NODE_ENV == 'PROD') {
                    filter.shoppingGroupSeqNo = 7;
               } else {
                    filter.shoppingGroupSeqNo = 2;
               }
          }
          filter['isLuckyball'] = false;
          return await this.list(req, res, filter, order, paging, member);
     }

     public async random(req: Request, res: Response, filter: ProductListFilter, order: IOrder[], paging: IPaging, member:MemberA) {
         
          filter.status = 1;
          filter.blindNot = true;
          filter.salesType = 3;
          filter.userKey = member.userKey;
          filter.random = true;

          let productList = await this.productModel.list(filter, order, {page: 1, limit: 30}, ProductJoin);

          if(productList.list.length > 0) {
               let productSeqNoArr = arrayObjectToValue(productList.list, 'seqNo');
               let _order: IOrder[] = [
                    {
                         column: 'deligate', 
                         dir: 'DESC'
                    }, 
                    {
                         column: 'array', 
                         dir: 'DESC'
                    }
               ]
               
               let [productImageList] = await Promise.all([
                    this.productImageModel.all({productSeqNo: productSeqNoArr}, _order)
               ])

               let productImageListMapArray = arrayToMapArray(productImageList, 'productSeqNo');

               for(let product of productList.list) {
                    product.images = productImageListMapArray[product.seqNo];
               }
          }

          return productList;
     }

    public async update(req: Request, res: Response, seqNo: number, params: ProductUpdateParams, member:MemberA) {
         let product = await this.productModel.get(seqNo);
         if(!product) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }

          if(params.seqNo !== undefined) {
               product.seqNo = params.seqNo;
          };
          if(params.marketType !== undefined) {
               product.marketType = params.marketType;
          };
          if(params.salesType !== undefined) {
               product.salesType = params.salesType;
          };
          if(params.status !== undefined) {
               product.status = params.status;
          };
          if(params.blind !== undefined) {
               product.blind = params.blind;
          };
          if(params.reason !== undefined) {
               product.reason = params.reason;
          };
          if(params.first !== undefined) {
               product.first = params.first;
          };
          if(params.second !== undefined) {
               product.second = params.second;
          };
          if(params.third !== undefined) {
               product.third = params.third;
          };
          if(params.name !== undefined) {
               product.name = params.name;
          };
          if(params.priceMethod !== undefined) {
               product.priceMethod = params.priceMethod;
          };
          if(params.surtax !== undefined) {
               product.surtax = params.surtax;
          };
          if(params.salesTerm !== undefined) {
               product.salesTerm = params.salesTerm;
          };
          if(params.startDate !== undefined) {
               product.startDate = params.startDate;
          };
          if(params.endDate !== undefined) {
               product.endDate = params.endDate;
          };
          if(params.contents !== undefined) {
               product.contents = params.contents;
          };
          if(params.count !== undefined) {
               product.count = params.count;
          };
          if(params.soldCount !== undefined) {
               product.soldCount = params.soldCount;
          };
          if(params.useOption !== undefined) {
               product.useOption = params.useOption;
          };
          if(params.optionType !== undefined) {
               product.optionType = params.optionType;
          };
          if(params.optionArray !== undefined) {
               product.optionArray = params.optionArray;
          };
          if(params.register !== undefined) {
               product.register = params.register;
          };
          if(params.registerType !== undefined) {
               product.registerType = params.registerType;
          };
          if(params.isKc !== undefined) {
               product.isKc = params.isKc;
          };
          if(params.nonKcMemo !== undefined) {
               product.nonKcMemo = params.nonKcMemo;
          };
          if(params.noticeGroup !== undefined) {
               product.noticeGroup = params.noticeGroup;
          };
          if(params.regDatetime !== undefined) {
               product.regDatetime = params.regDatetime;
          };
          if(params.modDatetime !== undefined) {
               product.modDatetime = params.modDatetime;
          };
          if(params.statusDatetime !== undefined) {
               product.statusDatetime = params.statusDatetime;
          };
          if(params.wholesaleCompany !== undefined) {
               product.wholesaleCompany = params.wholesaleCompany;
          };
          if(params.originalSeqNo !== undefined) {
               product.originalSeqNo = params.originalSeqNo;
          };
          if(params.supplierSeqNo !== undefined) {
               product.supplierSeqNo = params.supplierSeqNo;
          };
          if(params.origin !== undefined) {
               product.origin = params.origin;
          };
          if(params.notice !== undefined) {
               product.notice = params.notice;
          };
          if(params.subName !== undefined) {
               product.subName = params.subName;
          };
          if(params.domeSellerId !== undefined) {
               product.domeSellerId = params.domeSellerId;
          };
          if(params.changeEnable !== undefined) {
               product.changeEnable = params.changeEnable;
          };

         await this.productModel.update(product);
         return product;
    }

     public async delete(req: Request, res: Response, seqNo: number) {
          let product = await this.productModel.get(seqNo);
          if(!product) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.productModel.delete(product);
          return product;
     }

     public async search(req: Request, res: Response, search: string, order: IOrder[], paging: IPaging) {
         
          let filter = {
               status: 1,
               salesType: '3',
               blindNot: true,
          }

          let productList = await this.productModel.list(filter, order, paging, ProductJoin);

          let productSeqNoArr = arrayToMapArray(productList.list, 'seqNo');
          let _order: IOrder[] = [
               {
                    column: 'deligate', 
                    dir: 'DESC'
               }, 
               {
                    column: 'array', 
                    dir: 'DESC'
               }
          ]
          
          let productImageList = await this.productImageModel.all({productSeqNo: productSeqNoArr}, _order);
          let productImageListMapArray = arrayToMapArray(productImageList, 'productSeqNo');
          
          for(let prod of productList.list) {
               prod.images = productImageListMapArray[prod.seqNo]
          }

          return productList;
     }

}