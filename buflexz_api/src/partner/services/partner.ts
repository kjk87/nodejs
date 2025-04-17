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
import { getID, getLang, getUUIDv4, now, partnerMail, sendEmail } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";
import { PartnerModel } from "../models/partner";
import { Partner, PartnerJoin } from "../entities/partner";
import { NationService } from "../../nation/services/nation";
import { Nation } from "../../nation/entities/nation";


export interface PartnerFilter extends ListFilter {
    userKey?: string;
    parents?: string;
}



@Service()
export class PartnerService extends CoreService {

     @Inject(()=> PartnerModel)
     private partnerModel: PartnerModel;

     @Inject(()=> NationService)
     private nationService: NationService;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async request(req: Request, res: Response, params: Partner, member:MemberA, manager?: EntityManager) {

          params.userKey = member.userKey;
          params.nation = member.nation;
          params.status = 'pending';
          params.requestDatetime = now();
          params.changeStatusDatetime = now();

          let nation:Nation = await this.nationService.getOne(member.nation.toUpperCase());
          if(nation){
               params.bonusCommission = nation.bonusCommission;
               params.adCommission = nation.adCommission;
               params.ballCommission = nation.ballCommission;
          }

          params.adCount = 0;
          params.lastCheckCount = 0;
          await this.partnerModel.create(params, Partner, manager);

          var langage = 'en';
          if(member.language == 'ko'){
               langage = 'ko';
          }
          sendEmail(params.email, 'partner@buflexz.com', getLang(langage).partnerMailTitle, partnerMail(langage));
          
          return true;
     }

     public async resendEmail(req: Request, res: Response, member:MemberA){
          let partner = await this.getOne(member.userKey);

          var langage = 'en';
          if(member.language == 'ko'){
               langage = 'ko';
          }
          sendEmail(partner.email, 'partner@buflexz.com', getLang(langage).partnerMailTitle, partnerMail(langage));
          return true;
     }

     public async getOne(userKey:string){
          let filter:PartnerFilter = {};
          filter.userKey = userKey

          return await this.partnerModel.getByFilter(filter);

     }

     //리스트 & 조인
     public async childList(filter: PartnerFilter, paging: IPaging, member:MemberA) {

          filter = filter || {};
          filter.parents = member.userKey;
          filter.joinColumn = [
               {
                    joinTable: 'memberTotal',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               },
          ]
          let order: IOrder[] = [
               {
                    column: 'user_key',
                    dir: 'DESC'
               }
          ]

          return await this.partnerModel.list(filter, order, paging, PartnerJoin);
     }

     public async childCount(member:MemberA){
          let filter: PartnerFilter = {};
          filter.parents = member.userKey;
          return await this.partnerModel.getCount(filter);
     }
}