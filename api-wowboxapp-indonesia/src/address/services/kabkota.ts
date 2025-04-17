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
import { ProvinsiModel } from "../models/provinsi";
import axios from "axios";
import * as https from "https";
import { KabkotaModel } from "../models/kabkota";
import { Kabkota } from "../entities/kabkota";



export interface KabkotaFilter extends ListFilter {
    id?: number;
    parentId?: number;
}

@Service()
export class KabkotaService extends CoreService {

     @Inject(()=> KabkotaModel)
     private kabkotaModel: KabkotaModel;

     @Inject(()=> ProvinsiModel)
     private provinsiModel: ProvinsiModel;

     constructor() {
          super();
     }

     public async list(parentId:number){
          let filter: KabkotaFilter = {};
          filter.parentId = parentId;
          return await this.kabkotaModel.all(filter);
     }
}