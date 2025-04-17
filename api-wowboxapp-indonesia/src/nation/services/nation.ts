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
import { getID, getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";
import { NationModel } from "../models/nation";


export interface NationFilter extends ListFilter {
    code?: string;
}

@Service()
export class NationService extends CoreService {

     @Inject(()=> NationModel)
     private nationModel: NationModel;

     constructor() {
          super();
     }

     public async getOne(nation:string){
          let filter:NationFilter = {};
          filter.code = nation

          return await this.nationModel.getByFilter(filter);

     }

     public async list(){
          return await this.nationModel.all();
     }
}