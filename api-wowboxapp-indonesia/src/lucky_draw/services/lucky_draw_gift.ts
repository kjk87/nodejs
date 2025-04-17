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
import { LuckyDrawGiftModel } from "../models/lucky_draw_gift";


export interface LuckyDrawGiftFilter extends ListFilter {
    seqNo?: number;
    luckyDrawSeqNo?: number;
    type?: string;
    grade?: number;
}


@Service()
export class LuckyDrawGiftService extends CoreService {
    @Inject(()=> LuckyDrawGiftModel)
    private luckyDrawGiftModel: LuckyDrawGiftModel;

    public async list(luckyDrawSeqNo:number){

        let filter:LuckyDrawGiftFilter = {}
        filter.luckyDrawSeqNo = luckyDrawSeqNo;

        let order:IOrder[] = [
            {
                 column: `grade`,
                 dir: 'ASC'
            }
       ]

       return await this.luckyDrawGiftModel.all(filter, order);
    }
}