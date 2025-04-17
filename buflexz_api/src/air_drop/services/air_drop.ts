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
import { AirDropModel } from "../models/air_drop";
import { MemberA } from "../../member/entities/member_a";
import { AirDrop } from "../entities/air_drop";


export interface AirDropFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    wallet?: string;
    status?: string;
}

@Service()
export class AirDropService extends CoreService {

     @Inject(()=> AirDropModel)
     private airDropModel: AirDropModel;

     constructor() {
          super();
     }

     public async getAirDrop(member:MemberA) {
          let filter : AirDropFilter = {};
          filter.userKey = member.userKey;
          return await this.airDropModel.getByFilter(filter);
     }

     //생성
     @Transaction() //트렌잭션 default REPEATABLE READ
     public async apply(req: Request, res: Response, wallet:string, member:MemberA, manager?: EntityManager) {

          var filter : AirDropFilter = {};
          filter.wallet = wallet;
          var airDrop : AirDrop = await this.airDropModel.getByFilter(filter);
          if(airDrop && airDrop.userKey != member.userKey){
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }

          filter = {};
          filter.userKey = member.userKey;
          var airDrop : AirDrop = await this.airDropModel.getByFilter(filter);
          if(!airDrop){
               airDrop = new AirDrop();
               airDrop.userKey = member.userKey;
               airDrop.wallet = wallet;
               airDrop.status = 'pending';
               airDrop.requestDatetime = now();
               airDrop.regDatetime = now();
          }else{
               if(airDrop.status != 'return'){
                    throw new CoreError(ErrorType.E_NOTPERMISSION);
               }
               airDrop.status = 'redemand';
               airDrop.requestDatetime = now();
          }

          return await this.airDropModel.update(airDrop, AirDrop, manager);

     }
}