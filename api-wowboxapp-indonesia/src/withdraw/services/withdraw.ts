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
import { getLang, getUUIDv4, now, safeNumber } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { MemberA } from "../../member/entities/member_a";
import { WithdrawModel } from "../models/withdraw";
import { Withdraw } from "../entities/withdraw";
import { MemberService } from "../../member/services/member";
import { HistoryCash } from "../../history/entities/histroy_cash";
import { HistoryPoint } from "../../history/entities/histroy_point";


export class  WithdrawCreateParams {
    
     @IsNotEmpty()
     public bank: number;

     @IsNotEmpty()
     public name?: string;

     @IsNotEmpty()
     public account?: string;

     @IsNotEmpty()
     public request?: string;
}

export interface WithdrawFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
}

@Service()
export class WithdrawService extends CoreService {

     @Inject(()=> WithdrawModel)
     private withdrawModel: WithdrawModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     @Transaction()
     public async create(req: Request, res: Response, params: WithdrawCreateParams, member:MemberA, manager?: EntityManager) {
          let withdraw : Withdraw = Withdraw.fromObject(params, Withdraw);

          member = await this.memberService.getMember(member.userKey);
          
          if(safeNumber(withdraw.request) && safeNumber(withdraw.request) > safeNumber(member.point)) {
               throw new CoreError(ErrorType.E_LACK_COST);
          }

          if(withdraw.request >= 3000000){
               withdraw.fee = Math.floor(withdraw.request*0.2);
          }else if(withdraw.request >= 2000000){
               withdraw.fee = Math.floor(withdraw.request*0.25);
          }else if(withdraw.request >= 1000000){
               withdraw.fee = Math.floor(withdraw.request*0.3);
          }else if(withdraw.request >= 500000){
               withdraw.fee = Math.floor(withdraw.request*0.35);
          }else if(withdraw.request >= 300000){
               withdraw.fee = Math.floor(withdraw.request*0.4);
          }else if(withdraw.request >= 150000){
               withdraw.fee = Math.floor(withdraw.request*0.5);
          }else{
               throw new CoreError(ErrorType.E_NOTPERMISSION);
          }

          withdraw.userKey = member.userKey;
          withdraw.nickname = member.nickname;
          withdraw.status = 'pending';
          withdraw.withdraw = withdraw.request - withdraw.fee;
          withdraw.regDatetime = now()
          withdraw.changeDatetime = now();
          await this.withdrawModel.create(withdraw, Withdraw, manager);

          // let histroyCash = new HistoryCash();
          // histroyCash.userKey = member.userKey;
          // histroyCash.type = 'used';
          // histroyCash.category = 'withdraw';
          // histroyCash.cash = withdraw.request;
          // histroyCash.subject = getLang('id').withdrawCashSubject;
          // histroyCash.comment = getLang('id').withdrawCashComment;
          // histroyCash.regDatetime = now();
          // member = await this.memberService.updateCash(histroyCash, member, manager);

          let histroyPoint = new HistoryPoint();
          histroyPoint.userKey = member.userKey;
          histroyPoint.type = 'used';
          histroyPoint.category = 'withdraw';
          histroyPoint.point = withdraw.request;
          histroyPoint.subject = getLang('id').withdrawPointSubject;
          histroyPoint.comment = getLang('id').withdrawPointComment;
          histroyPoint.regDatetime = now();
          member = await this.memberService.updatePoint(histroyPoint, member, manager);
          return withdraw;
     }

     public async list(req: Request, res: Response, paging: IPaging, member:MemberA) {
          let filter : WithdrawFilter = {};
          filter.userKey = member.userKey;

          let order:IOrder[] = [
               {
                    column: `seqNo`,
                    dir: 'DESC'
               }
          ]

          return await this.withdrawModel.list(filter, order, paging);
     }

}