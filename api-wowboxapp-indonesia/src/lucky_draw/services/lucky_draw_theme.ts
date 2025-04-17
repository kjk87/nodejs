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

import { LuckyDrawThemeModel } from "../models/lucky_draw_theme";
import { LuckyDrawThemeJoin } from "../entities/lucky_draw_theme";


export interface LuckyDrawThemeFilter extends ListFilter {
    seqNo?: number;
    status?: string;
    aos?: boolean;
    ios?: boolean;
}


@Service()
export class LuckyDrawThemeService extends CoreService {

     @Inject(()=> LuckyDrawThemeModel)
     private luckyDrawThemeModel: LuckyDrawThemeModel;

     public async list(filter:LuckyDrawThemeFilter, paging: IPaging){
          filter = filter || {};
          filter.status = 'active';

          filter.joinColumn = [
               {
                    joinTable: 'groupList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
               {
                    joinTable: 'luckyDrawGroup',
                    join: 'left',//optional (default left)
                    defaultTable: 'groupList'//optional (default entity)
               },
          ]

          let order:IOrder[] = [
               {
                    column: `array`,
                    dir: 'ASC'
               },
               {
                    column: `array`,
                    dir: 'ASC',
                    table: 'groupList'
               }
          ]

          return await this.luckyDrawThemeModel.all(filter, order, LuckyDrawThemeJoin);
     }
}