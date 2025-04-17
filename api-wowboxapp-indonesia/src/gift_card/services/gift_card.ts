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
import { GiftCardModel } from "../models/gift_card";


export interface GiftCardFilter extends ListFilter {
    seqNo?: number;
    brandSeqNo?: number;
    title?: string;
    status?: string;
}

@Service()
export class GiftCardService extends CoreService {

     @Inject(()=> GiftCardModel)
     private giftCardModel: GiftCardModel;

     constructor() {
          super();
     }

     public async getOne(seqNo:number,) {
          let filter : GiftCardFilter = {};
          filter.status = 'active';
          filter.seqNo = seqNo;

          return await this.giftCardModel.get(filter);
     }

     public async list(brandSeqNo:number, paging: IPaging, order:IOrder[]) {
          let filter : GiftCardFilter = {};
          filter.status = 'active';
          filter.brandSeqNo = brandSeqNo
          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          };

          return await this.giftCardModel.list(filter, order, paging);

     }
}