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
import { TermsModel } from "../models/terms";
import { Terms } from "../entities/terms";
import { MemberA } from "../../member/entities/member_a";
import { TermsAgree } from "../entities/terms_agree";
import { TermsAgreeModel } from "../models/terms_agree";


export interface TermsFilter extends ListFilter {
    seqNo?: number;
    code?: string;
    nation?: string;
    compulsory?: boolean;
    status?: string;
    condition?: string;
}

export interface TermsAgreeFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     termsSeqNo?: number;
 }

@Service()
export class TermsService extends CoreService {

     @Inject(()=> TermsModel)
     private termsModel: TermsModel;

     @Inject(()=> TermsAgreeModel)
     private termsAgreeModel: TermsAgreeModel;

     constructor() {
          super();
     }

     public async insertTermsAgree(userKey:string, termsList:string[], manager?: EntityManager) {

          for (const idx in termsList) {
               let termsAgree = new TermsAgree();
               termsAgree.userKey = userKey;
               termsAgree.termsSeqNo = Number(termsList[idx]);
               await this.termsAgreeModel.create(termsAgree, TermsAgree, manager);
          }
          
          return true;
     }

     public async compulsoryList(nation:string, manager?: EntityManager) {

          let filter:TermsFilter = {};

          filter.condition = `(nation = 'all' or nation like '%${nation}%') and status = 'active' and compulsory = true`;

          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.termsModel.all(filter, order, Terms, manager);
     }

     public async activeList(nation:string) {

          let filter:TermsFilter = {};

          filter.condition = `(nation = 'all' or nation like '%${nation}%') and status = 'active'`;

          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.termsModel.all(filter, order, Terms);
     }

     public async notSignedList(member:MemberA, filter?:TermsFilter) {

          filter = filter || {};

          filter.condition = `(nation = 'all' or nation like '%${member.nation}%') and status = 'active' and not exists (select ta.seq_no from terms_agree ta where ta.user_key = '${member.userKey}' and ta.terms_seq_no = entity.seq_no)`;

          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.termsModel.all(filter, order, Terms);
     }
     

     public async getTerms(seqNo:number){
          let filter:TermsFilter = {};
          filter.seqNo = seqNo
          return await this.termsModel.getByFilter(filter);
     }

     public async agreeAddTerms(termsNo : string, member:MemberA){
          let termsList = termsNo.split(',');
          let filter:TermsFilter = {};
          filter.compulsory = true

          let compulsoryTerms = await this.notSignedList(member, filter);

          compulsoryTerms.list.forEach(function(terms, idx) {
               if(!termsList.includes(terms.seqNo.toString())){
                    throw new CoreError(ErrorType.E_NEED_COMPULSORY_TERMS, '필수약관 에러')
               }
          });

          return await this.insertTermsAgree(member.userKey, termsList);
     }
}