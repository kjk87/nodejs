// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { HistoryPoint } from "../entities/histroy_point";
import { HistoryPointModel } from "../models/history_point";
import { MemberA } from "../../member/entities/member_a";
import { HistoryTether } from "../entities/histroy_tether";
import { HistoryTetherModel } from "../models/history_tether";
import { HistoryLotteryModel } from "../models/history_lottery";
import { HistoryLottery } from "../entities/histroy_lottery";


export interface HistoryPointFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     type?: string;
}

export interface HistoryTetherFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     type?: string;
}

export interface HistoryLotteryFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     type?: string;
}

@Service()
export class HistoryService extends CoreService {


     @Inject(()=> HistoryPointModel)
     private historyPointModel: HistoryPointModel;
     
     @Inject(()=> HistoryTetherModel)
     private historyTetherModel: HistoryTetherModel;

     @Inject(()=> HistoryLotteryModel)
     private historyLotteryModel: HistoryLotteryModel;

     constructor() {
          super();
     }

     public async insertHistoryPoint(params: HistoryPoint, member: MemberA, manager?: EntityManager) {
          params.userKey = member.userKey;
          params.regDatetime = now();
          return await this.historyPointModel.create(params, HistoryPoint, manager);
     }

     public async historyPointList(filter: HistoryPointFilter, paging: IPaging, order: IOrder[], member:MemberA) {

          filter = filter || {};
          filter.userKey = member.userKey;

          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }
          
          return await this.historyPointModel.list(filter, order, paging);
     }
     
     public async insertHistoryTether(params: HistoryTether, member: MemberA, manager?: EntityManager) {
          params.userKey = member.userKey;
          params.regDatetime = now();
          return await this.historyTetherModel.create(params, HistoryTether, manager);
     }

     public async historyTetherList(filter: HistoryTetherFilter, paging: IPaging, order: IOrder[], member:MemberA) {

          filter = filter || {};
          filter.userKey = member.userKey;

          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }
          
          return await this.historyTetherModel.list(filter, order, paging);
     }

     public async insertHistoryLottery(params: HistoryLottery, member: MemberA, manager?: EntityManager) {
          params.userKey = member.userKey;
          params.regDatetime = now();
          return await this.historyLotteryModel.create(params, HistoryLottery, manager);
     }

     public async historyLotteryList(filter: HistoryLotteryFilter, paging: IPaging, order: IOrder[], member:MemberA) {

          filter = filter || {};
          filter.userKey = member.userKey;

          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }
          
          return await this.historyLotteryModel.list(filter, order, paging);
     }

}