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
import { getID, getLang, getUUIDv4, now, partnerMail, sendEmail } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";
import { NationService } from "../../nation/services/nation";
import { Nation } from "../../nation/entities/nation";
import { RewardModel } from "../models/reward";
import { Reward } from "../entities/reward";
import { LotteryService } from "../../lottery/services/lottery";
import { LotteryJoinCreateParams, LotteryJoinService } from "../../lottery/services/lottery_join";
import { BuffWalletService } from "../../buffWallet/services/buff_wallet";
import { HistoryCash } from "../../history/entities/histroy_cash";


export interface RewardFilter extends ListFilter {
    depth?: number;
    type?: string;
}



@Service()
export class RewardService extends CoreService {

     @Inject(()=> RewardModel)
     private rewardModel: RewardModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     @Inject(()=> LotteryJoinService)
     private lotteryJoinService: LotteryJoinService;

     @Inject(()=> BuffWalletService)
     private buffWalletService: BuffWalletService;

     constructor() {
          super();
     }


     public async getReward(depth:number){
          let filter:RewardFilter = {};
          filter.depth = depth;

          return await this.rewardModel.getByFilter(filter);
     }

     @Transaction()
     public async reward(req: Request, res: Response, depth:number, member: MemberA, manager?: EntityManager){

          member = await this.memberService.getMember(member.userKey);
          if(depth == 1 && member.rewardDate){
               let rewardDate = new Date(member.rewardDate);
               let currentTime = new Date().getTime();
               
               var hour3 = 0;

               if(process.env.NODE_ENV == 'PROD'){
                    hour3 = 3*60*60*1000;
               }else{
                    hour3 = 60*1000;
               }
               
               if(currentTime > (rewardDate.getTime() + hour3)){
                    member.rewardTicket = null;
                    member.rewardPoint = null;
                    member.rewardPoint2 = null;
                    member.rewardDate = null;
               }else{
                    throw new CoreError(ErrorType.E_TIME_LIMIT);
               }
          }

          if(depth == 2 && !member.rewardTicket){
               throw new CoreError(ErrorType.E_NOTPERMISSION);
          }

          if(depth == 3 && (!member.rewardPoint || !member.rewardTicket)){
               throw new CoreError(ErrorType.E_NOTPERMISSION);
          }

          let reward: Reward = await this.getReward(depth);
          var amount = Math.floor(Math.random() * reward.max) + 1;
          if(amount < reward.min){
               amount = reward.min;
          }

          switch(depth){
               case 1:
                    amount = 3;
                    var param = new LotteryJoinCreateParams();
                    param.count = amount;
                    param.joinType = 'reward';
                    param.userKey = member.userKey;
                    await this.lotteryJoinService.lotteryJoin(param, member, manager);
                    member.rewardTicket = amount;
                    await this.memberService.updateMember(member, manager);
                    return amount;
               case 2:
                    amount = 5;
                    var param = new LotteryJoinCreateParams();
                    param.count = amount;
                    param.joinType = 'reward';
                    param.userKey = member.userKey;
                    await this.lotteryJoinService.lotteryJoin(param, member, manager);
                    member.rewardPoint = amount;
                    await this.memberService.updateMember(member, manager);
                    return amount;
                    // var historyPoint = new HistoryPoint();
                    // historyPoint.userKey = member.userKey;
                    // historyPoint.type = 'charge';
                    // historyPoint.category = 'reward';
                    // historyPoint.point = amount;
                    // historyPoint.subject = getLang('id').rewardPointSubject;
                    // historyPoint.comment = getLang('id').rewardPointComment;
                    // historyPoint.regDatetime = now();
                    // member = await this.memberService.updatePoint(historyPoint, member, manager);
                    // member.rewardPoint = amount;
                    // await this.memberService.updateMember(member, manager);
                    // return amount;
               case 3:
                    amount = 10;
                    var param = new LotteryJoinCreateParams();
                    param.count = amount;
                    param.joinType = 'reward';
                    param.userKey = member.userKey;
                    await this.lotteryJoinService.lotteryJoin(param, member, manager);
                    member.rewardPoint2 = amount;
                    member.rewardDate = now();
                    await this.memberService.updateMember(member, manager);
                    return amount;

                    // var historyPoint = new HistoryPoint();
                    // historyPoint.userKey = member.userKey;
                    // historyPoint.type = 'charge';
                    // historyPoint.category = 'reward';
                    // historyPoint.point = amount;
                    // historyPoint.subject = getLang('id').rewardPointSubject;
                    // historyPoint.comment = getLang('id').rewardPointComment;
                    // historyPoint.regDatetime = now();
                    // member = await this.memberService.updatePoint(historyPoint, member, manager);
                    // member.rewardPoint2 = amount;
                    // member.rewardDate = now();
                    // await this.memberService.updateMember(member, manager);
                    // await this.memberService.updateMember(member, manager);
                    // return amount;

                    // let histroyCash = new HistoryCash();
                    // histroyCash.userKey = member.userKey;
                    // histroyCash.type = 'charge';
                    // histroyCash.category = 'reward';
                    // histroyCash.cash = amount;
                    // histroyCash.subject = getLang('id').rewardRpSubject;
                    // histroyCash.comment = getLang('id').rewardRpComment;
                    // histroyCash.regDatetime = now();
                    // member = await this.memberService.updateCash(histroyCash, member, manager);
                    
          }
     }
}