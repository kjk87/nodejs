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
import { getID, getUUIDv4, now, sendEmail } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";
import { PartnerModel } from "../models/partner";
import { Partner } from "../entities/partner";
import { NationService } from "../../nation/services/nation";
import { Nation } from "../../nation/entities/nation";
import { ProfitPartnerModel } from "../models/profit_partner";
import { ProfitPartnerJoin } from "../entities/profit_partner";

export interface ProfitPartnerFilter extends ListFilter {
     userKey?: string;
     status?: string;
     calculateMonth?: string;
     parentsPartner?: string;
     condition?: string;
 }

@Service()
export class ProfitPartnerService extends CoreService {

     @Inject(()=> ProfitPartnerModel)
     private profitPartnerModel: ProfitPartnerModel;

     constructor() {
          super();
     }

     public async getTotalProfit(member:MemberA){
          let filter : ProfitPartnerFilter = {};
          filter.userKey = member.userKey
          return await this.profitPartnerModel.getTotalProfit(filter);
     }
     
     public async getTotalBonusProfit(member:MemberA){
          let filter : ProfitPartnerFilter = {};
          filter.userKey = member.userKey;
          return await this.profitPartnerModel.getTotalBonusProfit(filter);
     }

     public async getProfitPartner(filter: ProfitPartnerFilter, member:MemberA){
          filter = filter || {};
          console.log('userKey:'+member.userKey);
          filter.userKey = member.userKey;
          console.log('filter.userKey:'+filter.userKey);
          filter.condition = `status in ('tranfer', 'complete')`;
          return await this.profitPartnerModel.getByFilter(filter);
     }

     //리스트 & 조인
     public async childList(filter: ProfitPartnerFilter, paging: IPaging, order: IOrder[], member:MemberA) {

          filter = filter || {};
          filter.parentsPartner = member.userKey;
          filter.joinColumn = [
               {
                    joinTable: 'memberTotal',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]
          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }

          return await this.profitPartnerModel.list(filter, order, paging, ProfitPartnerJoin);
     }
}