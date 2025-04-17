// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { AppModel } from "../models/app";


export interface AppFilter extends ListFilter {
    seqNo?: number;
    platform?: string;
    status?: string;
    version?: string;
}

@Service()
export class AppService extends CoreService {

     @Inject(()=> AppModel)
     private appModel: AppModel;

     constructor() {
          super();
     }

     public async getApp(filter:AppFilter) {
          filter = filter || {};
          filter.status = 'active';
          let app = await this.appModel.getByFilter(filter);
          if(!app){
               throw new CoreError(ErrorType.E_NOTFOUND, '해당 버전이 존재하지 않습니다.')
          }

          filter.version = null;

          let order:IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          return await this.appModel.getByFilter(filter, order);

     }
}