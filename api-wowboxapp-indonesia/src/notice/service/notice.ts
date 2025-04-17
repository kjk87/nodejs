// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { NoticeModel } from "../models/notice";

export interface NoticeFilter extends ListFilter {
     seqNo?: number;
     nation?: string;
     aos?: boolean;
     ios?: boolean;
     status?: string;
     condition?: string;
 }

@Service()
export class NoticeService extends CoreService {

     @Inject(()=> NoticeModel)
     private noticeModel: NoticeModel;

     constructor() {
          super();
     }

     public async list(filter:NoticeFilter, order:IOrder[], paging: IPaging, ){
          filter = filter || {};
          filter.status = 'active'
          filter.condition = `(nation = 'all' or nation like '%${filter.nation}%')`;
     
          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }

          return await this.noticeModel.list(filter, order, paging);
     }

     public async get(seqNo:number){
          let filter : NoticeFilter = {};
          filter.status = 'active';
          filter.seqNo = seqNo;
          return await this.noticeModel.getByFilter(filter);
     }
}