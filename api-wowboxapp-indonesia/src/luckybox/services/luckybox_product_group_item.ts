import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxProductGroupItemModel } from "../models/luckybox_product_group_item";
import { LuckyboxProductGroupItem } from "../entities/luckybox_product_group_item";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LuckyboxProductGroupItemCreateParams {
    public seqNo?: number;
    public luckyboxProductGroupSeqNo?: number;
    public productSeqNo?: number;
    public temp?: boolean;
    public regDatetime?: string;
    public productName?: string;
    public price?: number;
    public image?: string;
}
export class LuckyboxProductGroupItemUpdateParams {
    public seqNo?: number;
    public luckyboxProductGroupSeqNo?: number;
    public productSeqNo?: number;
    public temp?: boolean;
    public regDatetime?: string;
    public productName?: string;
    public price?: number;
    public image?: string;
}
export interface LuckyboxProductGroupItemListFilter extends ListFilter {
    seqNo?: number;
    luckyboxProductGroupSeqNo?: number;
    productSeqNo?: number;
    temp?: boolean;
    regDatetime?: string;
    productName?: string;
    price?: number;
    image?: string;
}
@Service()
export class LuckyboxProductGroupItemService extends CoreService {

     @Inject(()=> LuckyboxProductGroupItemModel)
     private luckyboxProductGroupItemModel: LuckyboxProductGroupItemModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: LuckyboxProductGroupItemCreateParams) {
          let luckyboxProductGroupItem = new LuckyboxProductGroupItem();

          luckyboxProductGroupItem.seqNo = params.seqNo;
          luckyboxProductGroupItem.luckyboxProductGroupSeqNo = params.luckyboxProductGroupSeqNo;
          luckyboxProductGroupItem.productSeqNo = params.productSeqNo;
          luckyboxProductGroupItem.temp = params.temp;
          luckyboxProductGroupItem.regDatetime = params.regDatetime;
          luckyboxProductGroupItem.productName = params.productName;
          luckyboxProductGroupItem.price = params.price;
          luckyboxProductGroupItem.image = params.image;

          await this.luckyboxProductGroupItemModel.create(luckyboxProductGroupItem);
          return luckyboxProductGroupItem.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxProductGroupItem = await this.luckyboxProductGroupItemModel.get(seqNo);
          if(!luckyboxProductGroupItem) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxProductGroupItem;
     }

     public async list(req: Request, res: Response, filter: LuckyboxProductGroupItemListFilter, paging: IPaging) {
          
          let order: IOrder[] = [{
               column: "price",
               dir: "DESC"
           }]

          return await this.luckyboxProductGroupItemModel.list(filter, order, paging);
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxProductGroupItemUpdateParams) {
          let luckyboxProductGroupItem = await this.luckyboxProductGroupItemModel.get(seqNo);
          if(!luckyboxProductGroupItem) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

               if(params.seqNo !== undefined) {
                    luckyboxProductGroupItem.seqNo = params.seqNo;
               };
               if(params.luckyboxProductGroupSeqNo !== undefined) {
                    luckyboxProductGroupItem.luckyboxProductGroupSeqNo = params.luckyboxProductGroupSeqNo;
               };
               if(params.productSeqNo !== undefined) {
                    luckyboxProductGroupItem.productSeqNo = params.productSeqNo;
               };
               if(params.temp !== undefined) {
                    luckyboxProductGroupItem.temp = params.temp;
               };
               if(params.regDatetime !== undefined) {
                    luckyboxProductGroupItem.regDatetime = params.regDatetime;
               };
               if(params.productName !== undefined) {
                    luckyboxProductGroupItem.productName = params.productName;
               };
               if(params.price !== undefined) {
                    luckyboxProductGroupItem.price = params.price;
               };
               if(params.image !== undefined) {
                    luckyboxProductGroupItem.image = params.image;
               };

          await this.luckyboxProductGroupItemModel.update(luckyboxProductGroupItem);
          return luckyboxProductGroupItem;
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxProductGroupItem = await this.luckyboxProductGroupItemModel.get(seqNo);
          if(!luckyboxProductGroupItem) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxProductGroupItemModel.delete(luckyboxProductGroupItem);
          return luckyboxProductGroupItem;
     }

}