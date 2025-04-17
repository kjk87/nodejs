import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxModel } from "../models/luckybox";
import { IsNotEmpty } from "../../common/services/decorators";
import { Luckybox } from "../entities/luckybox";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { arrayObjectToValue, arrayToMapArray } from "../../common/services/util";
import { LuckyboxEntryModel } from "../models/luckybox_entry";
import { MemberA } from "../../member/entities/member_a";

export class LuckyboxCreateParams {
    public seqNo?: number;
    public title?: string;
    public engagePrice?: number;
    public array?: number;
    public status?: string;
    public regDatetime?: string;
    public modDatetime?: string;
}
export class LuckyboxUpdateParams {
    public seqNo?: number;
    public title?: string;
    public engagePrice?: number;
    public array?: number;
    public status?: string;
    public regDatetime?: string;
    public modDatetime?: string;
}
export interface LuckyboxListFilter extends ListFilter {
    seqNo?: number;
    title?: string;
    engagePrice?: number;
    array?: number;
    status?: string;
    regDatetime?: string;
    modDatetime?: string;
}
@Service()
export class LuckyboxService extends CoreService {

    @Inject(()=> LuckyboxModel)
    private luckyboxModel: LuckyboxModel;

     @Inject(()=> LuckyboxEntryModel)
     private luckyboxEntryModel: LuckyboxEntryModel;


    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: LuckyboxCreateParams, member: MemberA) {
         let luckybox = new Luckybox();

         luckybox.seqNo = params.seqNo;
         luckybox.title = params.title;
         luckybox.engagePrice = params.engagePrice;
         luckybox.array = params.array;
         luckybox.status = params.status;
         luckybox.regDatetime = params.regDatetime;
         luckybox.modDatetime = params.modDatetime;

         await this.luckyboxModel.create(luckybox);
         return luckybox.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let luckybox = await this.luckyboxModel.get(seqNo);
         if(!luckybox) {
              throw new CoreError(ErrorType.E_NOTFOUND)
         }
         return luckybox;
    }

     public async list(req: Request, res: Response, filter: LuckyboxListFilter, order: IOrder[], paging: IPaging) {
          
          filter = filter || {};
          filter.status = 'active';
     
          let list = await this.luckyboxModel.list(filter, order);

          if(list.list.length > 0) {
               let seqArr = arrayObjectToValue(list.list, 'seqNo');

               let entry = await this.luckyboxEntryModel.all({luckyboxSeqNo: seqArr});
               let entryMap = arrayToMapArray(entry, 'luckyboxSeqNo');

               for(let data of list.list) {
                    data.entry = entryMap[data.seqNo]
               }
          }

          return list;
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxUpdateParams, member: MemberA) {
          let luckybox = await this.luckyboxModel.get(seqNo);
          if(!luckybox) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

          if(params.seqNo !== undefined) {
               luckybox.seqNo = params.seqNo;
          };
          if(params.title !== undefined) {
               luckybox.title = params.title;
          };
          if(params.engagePrice !== undefined) {
               luckybox.engagePrice = params.engagePrice;
          };
          if(params.array !== undefined) {
               luckybox.array = params.array;
          };
          if(params.status !== undefined) {
               luckybox.status = params.status;
          };
          if(params.regDatetime !== undefined) {
               luckybox.regDatetime = params.regDatetime;
          };
          if(params.modDatetime !== undefined) {
               luckybox.modDatetime = params.modDatetime;
          };

          await this.luckyboxModel.update(luckybox);
          return luckybox;
     }

     public async delete(req: Request, res: Response, seqNo: number, member: MemberA) {
          let luckybox = await this.luckyboxModel.get(seqNo);
          if(!luckybox) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxModel.delete(luckybox);
          return luckybox;
     }



}