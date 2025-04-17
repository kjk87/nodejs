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
import { LuckyDrawModel } from "../models/lucky_draw";
import { LuckyDraw, LuckyDrawJoin } from "../entities/lucky_draw";
import { LuckyDrawPurchaseModel } from "../models/lucky_draw_purchase";


export interface LuckyDrawFilter extends ListFilter {
    seqNo?: number;
    aos?: boolean;
    ios?: boolean;
    announceType?: string;
    engageType?: string;
    status?: string;
    privateKey?: string;
    luckyDrawGroupSeqNo?: number;
    condition?: string;
}


@Service()
export class LuckyDrawService extends CoreService {

     @Inject(()=> LuckyDrawModel)
     private luckyDrawModel: LuckyDrawModel;

     @Inject(()=> LuckyDrawPurchaseModel)
     private luckyDrawPurchaseModel: LuckyDrawPurchaseModel;

     public async all(){
          let filter : LuckyDrawFilter = {}
          filter.condition = `status in ('active', 'expire', 'pending', 'complete')`;
          
          return (await this.luckyDrawModel.all(filter));
     }

     public async list(filter:LuckyDrawFilter, paging: IPaging){
          let current = now();
          filter = filter || {}
          filter.condition = `(start_datetime <= '${current}' and end_datetime >= '${current}' and status in ('active', 'expire', 'pending'))`;

          filter.joinColumn = [
               {
                    joinTable: 'giftList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]

          let order:IOrder[] = [
               {
                    column: `(case when status = 'active' then 1 else (case when status = 'expire' then 2 else 3 end) end)`,
                    dir: 'ASC',
                    custom: true
               },
               {
                    column: `seqNo`,
                    dir: 'DESC'
               },
               {
                    column: `grade`,
                    dir: 'ASC',
                    table: 'giftList'
               }
          ]

          let res = await this.luckyDrawModel.list(filter, order, paging, LuckyDrawJoin);
          let list : LuckyDrawJoin[] = res.list;
          for(let luckyDraw of list) {
               luckyDraw.joinCount = await this.luckyDrawPurchaseModel.getJoinCount(luckyDraw.seqNo);
          }

          return res;
     }

     public async completeList(filter:LuckyDrawFilter, paging: IPaging){
          let current = now();
          filter = filter || {}
          filter.condition = `(start_datetime <= '${current}' and end_datetime >= '${current}' and status = 'complete')`;

          filter.joinColumn = [
               {
                    joinTable: 'giftList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]

          let order:IOrder[] = [
               {
                    column: `seqNo`,
                    dir: 'DESC'
               },
               {
                    column: `grade`,
                    dir: 'ASC',
                    table: 'giftList'
               }
          ]

          let res = await this.luckyDrawModel.list(filter, order, paging, LuckyDrawJoin);
          let list : LuckyDrawJoin[] = res.list;
          for(let luckyDraw of list) {
               luckyDraw.joinCount = await this.luckyDrawPurchaseModel.getJoinCount(luckyDraw.seqNo);
          }

          return res;
     }

     public async get(seqNo:number){
          let filter : LuckyDrawFilter = {};
          filter.seqNo = seqNo;
          filter.condition = `(status in ('active', 'expire', 'pending', 'complete'))`;
          let order:IOrder[] = [
               {
                    column: `seqNo`,
                    dir: 'DESC'
               }
          ]
          return await this.luckyDrawModel.getByFilter(filter, order, LuckyDraw);
     }

     public async checkPrivate(seqNo:number, privateKey:string){
          let filter : LuckyDrawFilter = {};
          filter.seqNo = seqNo;
          filter.privateKey = privateKey;
          
          let luckyDraw = await this.luckyDrawModel.getByFilter(filter);
          return luckyDraw ? true : false;
     }
}