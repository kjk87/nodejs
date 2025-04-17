import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { BuffCoinHistoryModel } from "../models/buff_coin_history";
import { IsNotEmpty } from "../../common/services/decorators";
import { BuffCoinHistory } from "../entities/buff_coin_history";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class BuffCoinHistoryCreateParams {
    public seqNo?: number;
    public userKey?: string;
    public type?: string;
    public coin?: number;
    public subject?: string;
    public historyProp?: string;
    public regDatetime?: string;
}
export class BuffCoinHistoryUpdateParams {
    public seqNo?: number;
    public userKey?: string;
    public type?: string;
    public coin?: number;
    public subject?: string;
    public historyProp?: string;
    public regDatetime?: string;
}
export interface BuffCoinHistoryListFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    type?: string;
    coin?: number;
    subject?: string;
    historyProp?: string;
    regDatetime?: string;
}
@Service()
export class BuffCoinHistoryService extends CoreService {

    @Inject(()=> BuffCoinHistoryModel)
    private buffCoinHistoryModel: BuffCoinHistoryModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: BuffCoinHistoryCreateParams, user) {
         let buffCoinHistory = new BuffCoinHistory();

         buffCoinHistory.seqNo = params.seqNo;
         buffCoinHistory.userKey = params.userKey;
         buffCoinHistory.type = params.type;
         buffCoinHistory.coin = params.coin;
         buffCoinHistory.subject = params.subject;
         buffCoinHistory.historyProp = params.historyProp;
         buffCoinHistory.regDatetime = params.regDatetime;

         await this.buffCoinHistoryModel.create(buffCoinHistory);
         return buffCoinHistory.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number, user) {
         let buffCoinHistory = await this.buffCoinHistoryModel.get(seqNo);
         if(!buffCoinHistory) {
              throw new CoreError(ErrorType.E_NOTFOUND, '잘못된 접근입니다')
         }
         return buffCoinHistory;
    }

    public async list(req: Request, res: Response, filter: BuffCoinHistoryListFilter, order: IOrder[], paging: IPaging, user) {
         return await this.buffCoinHistoryModel.list(filter, order, paging);
    }

    public async update(Request, res: Response, seqNo: number, params: BuffCoinHistoryUpdateParams, user) {
         let buffCoinHistory = await this.buffCoinHistoryModel.get(seqNo);
         if(!buffCoinHistory) {
              throw new CoreError(ErrorType.E_NOTFOUND, '잘못된 접근입니다')
         }

          if(params.seqNo !== undefined) {
               buffCoinHistory.seqNo = params.seqNo;
          };
          if(params.userKey !== undefined) {
               buffCoinHistory.userKey = params.userKey;
          };
          if(params.type !== undefined) {
               buffCoinHistory.type = params.type;
          };
          if(params.coin !== undefined) {
               buffCoinHistory.coin = params.coin;
          };
          if(params.subject !== undefined) {
               buffCoinHistory.subject = params.subject;
          };
          if(params.historyProp !== undefined) {
               buffCoinHistory.historyProp = params.historyProp;
          };
          if(params.regDatetime !== undefined) {
               buffCoinHistory.regDatetime = params.regDatetime;
          };

         await this.buffCoinHistoryModel.update(buffCoinHistory);
         return buffCoinHistory;
    }

    public async delete(req: Request, res: Response, seqNo: number, user) {
         let buffCoinHistory = await this.buffCoinHistoryModel.get(seqNo);
         if(!buffCoinHistory) {

              throw new CoreError(ErrorType.E_NOTFOUND, '잘못된 접근입니다');
         }

         await this.buffCoinHistoryModel.delete(buffCoinHistory);
         return buffCoinHistory;
    }

}