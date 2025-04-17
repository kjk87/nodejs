import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Status, LotteryGiftType, LotteryJoinType } from "../../common/services/type";
import { LotteryWinModel } from "../models/lottery_win";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { getLang, now } from "../../common/services/util";
import { LotteryJoinCreateParams, LotteryJoinService } from "./lottery_join";
import { LotteryWin } from "../entities/lottery_win";


import { EntityManager } from "typeorm";

import { E_NOTFOUND, E_SUCCESS } from "../../common/services/errorType";
import { MemberA } from "../../member/entities/member_a";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { MemberService } from "../../member/services/member";
import { CoreListResponse } from "../../common/core/CoreListResponse";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { LANGUAGE } from "../../language";
import { HistoryCash } from "../../history/entities/histroy_cash";

export class WinListFilter extends ListFilter {
    @IsNotEmpty()
    lotteryRound: number;


    userKey?: string;

    seqNo?: number;

    grade?: boolean;
    status?: string;
}

export class ReceivePrizeParams {

     @IsNotEmpty()
     userKey: string;
}

@Service()
export class LotteryWinService extends CoreService {

     @Inject(()=> LotteryWinModel)
     private lotteryWinModel: LotteryWinModel;

     @Inject(()=> LotteryJoinService)
     private lotteryJoinService: LotteryJoinService;

     @Inject(()=> MemberService)
     private memberService: MemberService;


     constructor() {
          super();
     }

     //내 당첨 리스트
     public async list(req: Request, res: Response, lotteryRound: number, paging: IPaging, member: MemberA) {
          
          let filter = {
               lotteryRound: lotteryRound,
               userKey: member.userKey
          }
          
          let offset = (Number(paging.page) - 1) * Number(paging.limit);
          let lotteryWinList = await this.lotteryWinModel.myList(filter, offset, paging);
          for(let lotteryWin of lotteryWinList) {
               lotteryWin.winNo1 = (lotteryWin.winNo1 == 1);
               lotteryWin.winNo2 = (lotteryWin.winNo2 == 1);
               lotteryWin.winNo3 = (lotteryWin.winNo3 == 1);
               lotteryWin.winNo4 = (lotteryWin.winNo4 == 1);
               lotteryWin.winNo5 = (lotteryWin.winNo5 == 1);
               lotteryWin.winNo6 = (lotteryWin.winNo6 == 1);
               lotteryWin.winAdd = (lotteryWin.winAdd == 1);
          }

          let count = await this.lotteryWinModel.myListCount(filter);

          return new CoreListResponse(lotteryWinList, count);

     }

     public async myCount(req: Request, res: Response, lotteryRound: number, member: MemberA) {
          
          let filter = {
               lotteryRound: lotteryRound,
               userKey: member.userKey
          }

          return await this.lotteryWinModel.myListCount(filter);
     }

     //전체 당첨 리스트
     public async all(req: Request, res: Response, lotteryRound: number, paging: IPaging) {
     
          let filter = {
               lotteryRound: lotteryRound,
          }
          
          let lotteryWinList = await this.lotteryWinModel.all(filter);

          for(let lotteryWin of lotteryWinList) {
               lotteryWin.member = await this.memberService.getMember(lotteryWin.userKey);
               lotteryWin.winNo1 = (lotteryWin.winNo1 == 1);
               lotteryWin.winNo2 = (lotteryWin.winNo2 == 1);
               lotteryWin.winNo3 = (lotteryWin.winNo3 == 1);
               lotteryWin.winNo4 = (lotteryWin.winNo4 == 1);
               lotteryWin.winNo5 = (lotteryWin.winNo5 == 1);
               lotteryWin.winNo6 = (lotteryWin.winNo6 == 1);
               lotteryWin.winAdd = (lotteryWin.winAdd == 1);
          }
          return {list:lotteryWinList};
     }

     //전체 당첨 count
     public async winnerCount(req: Request, res: Response, lotteryRound: number) {
     
          let filter = {
               lotteryRound: lotteryRound,
          }
          
          let count = await this.lotteryWinModel.winnerCount(filter);
          return count;
     }

     @Transaction()
     public async receiveOne(req: Request, res: Response, seqNo: number, lotteryRound: number, member: MemberA, manager?: EntityManager) {
          return await this.procReceive(req, res, seqNo, lotteryRound, member, manager);
     }

     @Transaction()
     public async receiveAll(req: Request, res: Response, lotteryRound: number, member: MemberA, manager?: EntityManager) {

          let winList: LotteryWin[] = await this.lotteryWinModel.receiveAll({userKey: member.userKey, lotteryRound: lotteryRound})
               
          for(let win of winList) {
               await this.procReceive(req, res, win.seqNo, win.lotteryRound, member, manager);
          }
          
          return E_SUCCESS;

     }

     public async procReceive(req: Request, res: Response, seqNo: number, lotteryRound: number, member: MemberA, manager: EntityManager) {
          let lotteryWin = await this.lotteryWinModel.getOne(seqNo, lotteryRound, member.userKey, manager);
          if(!lotteryWin) {
               throw new CoreError(E_NOTFOUND, '당첨정보가 없습니다')
          }

          if(lotteryWin.userKey != member.userKey) {
               throw new CoreError(E_NOTFOUND, '잘못된 접근입니다')
          }

          if(lotteryWin.status != Status.ACTIVE) {
               throw new CoreError(E_NOTFOUND, '잘못된 접근입니다')
          }

          let point = lotteryWin.money;
          if(lotteryWin.giftType == LotteryGiftType.POINT) {
               let historyPoint = new HistoryPoint();
               historyPoint.userKey = member.userKey;
               historyPoint.type = 'charge';
               historyPoint.category = 'lottery';
               historyPoint.point = point;
               historyPoint.subject = getLang('id').winLotteryPointSubject;
               historyPoint.comment = getLang('id').winLotteryPointComment;
               historyPoint.regDatetime = now();
               await this.memberService.updatePoint(historyPoint, member, manager);

          } else if(lotteryWin.giftType == LotteryGiftType.CASH) {

               let histroyCash = new HistoryCash();
               histroyCash.userKey = member.userKey;
               histroyCash.type = 'charge';
               histroyCash.category = 'lottery';
               histroyCash.cash = point;
               histroyCash.subject = getLang('id').winLotteryCashSubject;
               histroyCash.comment = getLang('id').winLotteryCashComment;
               histroyCash.regDatetime = now();
               member = await this.memberService.updateCash(histroyCash, member, manager);

          } else if(lotteryWin.giftType == LotteryGiftType.LOTTO) {
               let params = {
                    count: point,
                    joinType: LotteryJoinType.LOTTO
               }
               if(!await this.lotteryJoinService.lotteryJoin(params, member, manager)) {
                    throw new CoreError(E_NOTFOUND, '응모가능한 로또 이벤트가 없습니다')
               }
          }

          lotteryWin.status = 'complete';
          lotteryWin.statusDatetime = now();
          await this.lotteryWinModel.updateStatus(lotteryWin, lotteryRound, manager);

          
          return E_SUCCESS;
     }

     public async getRemainCount(req: Request, res: Response, lotteryRound: number, member: MemberA, manager?: EntityManager) {
          return await this.lotteryWinModel.remainCount({userKey: member.userKey, lotteryRound: lotteryRound})
     }
}