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
import { HistoryPoint } from "../entities/histroy_point";
import { HistoryPointModel } from "../models/history_point";
import { MemberA } from "../../member/entities/member_a";
import { HistoryBallModel } from "../models/history_ball";
import { HistoryBall } from "../entities/histroy_ball";
import { HistoryCommission } from "../entities/histroy_commission";
import { Partner } from "../../partner/entities/partner";
import { HistoryCommissionlModel } from "../models/history_commission";
import { HistoryBenefitModel } from "../models/history_benefit";


export interface HistoryPointFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    type?: string;
}

export interface HistoryBallFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     type?: string;
 }

 export interface HistoryCommissionFilter extends ListFilter {
     seqNo?: number;
     partner?: string;
     startDate?: string;
     endDate?: string;
 }

 export interface HistoryBenefitFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     startDate?: string;
     endDate?: string;
 }

@Service()
export class HistoryService extends CoreService {

     @Inject(()=> HistoryCommissionlModel)
     private historyCommissionlModel: HistoryCommissionlModel;

     @Inject(()=> HistoryPointModel)
     private historyPointModel: HistoryPointModel;

     @Inject(()=> HistoryBallModel)
     private historyballlModel: HistoryBallModel;
     
     @Inject(()=> HistoryBenefitModel)
     private historyBenefitModel: HistoryBenefitModel;

     constructor() {
          super();
     }

     public async insertHistoryCommission(params: HistoryCommission, partner:Partner, manager?: EntityManager) {
          params.userKey = partner.userKey;
          params.regDatetime = now();
          return await this.historyCommissionlModel.create(params, HistoryCommission, manager);
     }


     public async insertHistoryPoint(params: HistoryPoint, member: MemberA, manager?: EntityManager) {
          params.userKey = member.userKey;
          params.regDatetime = now();
          return await this.historyPointModel.create(params, HistoryPoint, manager);
     }


     public async insertHistoryBall(params: HistoryBall, member: MemberA, manager?: EntityManager) {
          params.userKey = member.userKey;
          params.regDatetime = now();
          return await this.historyballlModel.create(params, HistoryBall, manager);
     }

     public async getCommission(filter : HistoryCommissionFilter, member:MemberA){
          filter  = filter || {};
          filter.partner = member.userKey
          return await this.historyCommissionlModel.getCommission(filter);
     }

     public async historyCommissionList(filter: HistoryCommissionFilter, paging: IPaging, order: IOrder[], member:MemberA) {

          filter = filter || {};
          filter.partner = member.userKey;

          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }
          

          return await this.historyCommissionlModel.list(filter, order, paging);
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

     public async historyBallList(filter: HistoryBallFilter, paging: IPaging, order: IOrder[], member:MemberA) {

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

          return await this.historyballlModel.list(filter, order, paging);
     }

     public async historyBenefitList(filter: HistoryBenefitFilter, paging: IPaging, order: IOrder[], member:MemberA) {

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
          

          return await this.historyBenefitModel.list(filter, order, paging);
     }

     public async getTotalBenefit(filter : HistoryBenefitFilter, member:MemberA){
          filter  = filter || {};
          filter.userKey = member.userKey
          return await this.historyBenefitModel.getSumBenfit(filter);
     }
}