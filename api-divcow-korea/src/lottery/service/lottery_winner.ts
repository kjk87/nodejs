// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { LotteryWinnerModel } from "../models/lottery_winner";
import { HistoryLottery } from "../../history/entities/histroy_lottery";
import { Transaction } from "../../common/services/decorators";
import { MemberService } from "../../member/services/member";
import { now } from "../../common/services/util";
import { LotteryWinner } from "../entities/lottery_winner";
import moment = require("moment-timezone");
import { HistoryPoint } from "../../history/entities/histroy_point";

export interface LotteryWinnerFilter extends ListFilter {
     seqNo?: number;
     date?: string;
 }

@Service()
export class LotteryWinnerService extends CoreService {

     @Inject(()=> LotteryWinnerModel)
     private lotteryWinnerModel: LotteryWinnerModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     @Transaction()
     public async create(req, res, params, member, manager?){
          member = await this.memberService.getMember(member.userKey, manager);
          let amount = params.amount;

          let historyLottery = new HistoryLottery();
          historyLottery.userKey = member.userKey;
          historyLottery.type = 'used';
          historyLottery.category = 'lottery';
          historyLottery.count = 1;
          historyLottery.subject = 'lottery Scratch';
          historyLottery.comment = 'lottery Scratch';
          historyLottery.regDatetime = now();
          await this.memberService.updateLottery(historyLottery, member, manager);


          let lotteryWinner = new LotteryWinner();
          lotteryWinner.userKey = member.userKey;
          lotteryWinner.nickname = member.nickname;
          lotteryWinner.profile = member.profile;
          lotteryWinner.amount = amount;
          lotteryWinner.date = moment().format('YYYY-MM-DD');
          lotteryWinner.time = moment().format('HH:mm');


          if(amount >= 1000000) {
               lotteryWinner.rank = 1;
          } else if(amount >= 500000) {
               lotteryWinner.rank = 2;
          } else if(amount >= 100000) {
               lotteryWinner.rank = 3;
          } else if(amount >= 10000) {
               lotteryWinner.rank = 4;
          } else if(amount >= 5000) {
               lotteryWinner.rank = 5;
          } else if(amount >= 1000) {
               lotteryWinner.rank = 6;
          } else if(amount >= 500) {
               lotteryWinner.rank = 7;
          } else if(amount >= 100) {
               lotteryWinner.rank = 8;
          } else if(amount >= 20){
               lotteryWinner.rank = 9;
          } else if(amount >= 10) {
               lotteryWinner.rank = 10;
          } else {
               lotteryWinner.rank = 11;
          }

          await this.lotteryWinnerModel.create(lotteryWinner, undefined, manager);
          
          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'charge';
          historyPoint.category = 'lottery';
          historyPoint.point = amount;
          historyPoint.subject = 'lottery Scratch';
          historyPoint.comment = 'lottery Scratch';
          historyPoint.regDatetime = now();

          await this.memberService.updatePoint(historyPoint, member, manager);

          return true;
     }

     public async checkRank(params){

          return {
               rank1: 1,
               rank2: 2,
               rank3: 3,
               rank4: 4,
               rank5: 5,
               rank6: 6,
               rank7: 7,
               rank8: 8
          }
     }

     public async list(filter:LotteryWinnerFilter, order:IOrder[]){

          if(!order){
               order = [
                    {
                         column: 'rank',
                         dir: 'ASC'
                    }
               ]
          }

          return await this.lotteryWinnerModel.all(filter, order);
     }
}