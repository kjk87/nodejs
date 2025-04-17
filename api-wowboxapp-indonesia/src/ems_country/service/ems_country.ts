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
import { EmsCountry } from "../entities/ems_country";
import { EmsCountryModel } from "../models/ems_country";


export interface EmsCountryFilter extends ListFilter {
     countryCode?: string;
}

@Service()
export class EmsCountryService extends CoreService {

     @Inject(()=> EmsCountryModel)
     private emsCountryModel: EmsCountryModel;

     constructor() {
          super();
     }

     public async list(){
          return await this.emsCountryModel.all();
     }
}