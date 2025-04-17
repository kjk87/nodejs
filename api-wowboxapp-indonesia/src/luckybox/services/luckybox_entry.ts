import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxEntryModel } from "../models/luckybox_entry";
import { LuckyboxEntry } from "../entities/luckybox_entry";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";

export class LuckyboxEntryCreateParams {
     public seqNo?: number;
     public luckyboxProductGroupSeqNo?: number;
     public luckyboxSeqNo?: number;
     public temp?: boolean;
}
export class LuckyboxEntryUpdateParams {
     public seqNo?: number;
     public luckyboxProductGroupSeqNo?: number;
     public luckyboxSeqNo?: number;
     public temp?: boolean;
}
export interface LuckyboxEntryListFilter extends ListFilter {
     seqNo?: number;
     luckyboxProductGroupSeqNo?: number;
     luckyboxSeqNo?: number;
     temp?: boolean;
}
@Service()
export class LuckyboxEntryService extends CoreService {

     @Inject(()=> LuckyboxEntryModel)
     private luckyboxEntryModel: LuckyboxEntryModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: LuckyboxEntryCreateParams) {
          let luckyboxEntry = new LuckyboxEntry();

          luckyboxEntry.seqNo = params.seqNo;
          luckyboxEntry.luckyboxProductGroupSeqNo = params.luckyboxProductGroupSeqNo;
          luckyboxEntry.luckyboxSeqNo = params.luckyboxSeqNo;
          luckyboxEntry.temp = params.temp;

          await this.luckyboxEntryModel.create(luckyboxEntry);
          return luckyboxEntry.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxEntry = await this.luckyboxEntryModel.get(seqNo);
          if(!luckyboxEntry) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
          return luckyboxEntry;
    }

     public async list(req: Request, res: Response, filter: LuckyboxEntryListFilter, order: IOrder[], paging: IPaging) {
          return await this.luckyboxEntryModel.list(filter, order, paging);
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxEntryUpdateParams) {
          let luckyboxEntry = await this.luckyboxEntryModel.get(seqNo);
          if(!luckyboxEntry) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }

               if(params.seqNo !== undefined) {
                    luckyboxEntry.seqNo = params.seqNo;
               };
               if(params.luckyboxProductGroupSeqNo !== undefined) {
                    luckyboxEntry.luckyboxProductGroupSeqNo = params.luckyboxProductGroupSeqNo;
               };
               if(params.luckyboxSeqNo !== undefined) {
                    luckyboxEntry.luckyboxSeqNo = params.luckyboxSeqNo;
               };
               if(params.temp !== undefined) {
                    luckyboxEntry.temp = params.temp;
               };

          await this.luckyboxEntryModel.update(luckyboxEntry);
          return luckyboxEntry;
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxEntry = await this.luckyboxEntryModel.get(seqNo);
          if(!luckyboxEntry) {

               throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
          }

          await this.luckyboxEntryModel.delete(luckyboxEntry);
          return luckyboxEntry;
     }

}