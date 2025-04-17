import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LotteryWinConditionModel } from "../models/lottery_win_condition";
import { LotteryWinCondition } from "../entities/lottery_win_condition";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { E_NOTFOUND } from "../../common/services/errorType";

export class LotteryWinConditionCreateParams {
    public seqNo?: number;
    public lotteryRound?: number;
    public firstGrade?: number;
    public secondGrade?: number;
    public thirdGrade?: number;
    public forthGrade?: number;
    public fifthGrade?: number;
    public firstMoney?: number;
    public secondMoney?: number;
    public thirdMoney?: number;
    public forthMoney?: number;
    public fifthMoney?: number;
    public winnerCount?: number;
    public winnerUsdtAmount?: number;
}
export class LotteryWinConditionUpdateParams {
    public seqNo?: number;
    public lotteryRound?: number;
    public firstGrade?: number;
    public secondGrade?: number;
    public thirdGrade?: number;
    public forthGrade?: number;
    public fifthGrade?: number;
    public firstMoney?: number;
    public secondMoney?: number;
    public thirdMoney?: number;
    public forthMoney?: number;
    public fifthMoney?: number;
    public winnerCount?: number;
    public winnerUsdtAmount?: number;
}
export interface LotteryWinConditionListFilter extends ListFilter {
    seqNo?: number;
    lotteryRound?: number;
    firstGrade?: number;
    secondGrade?: number;
    thirdGrade?: number;
    forthGrade?: number;
    fifthGrade?: number;
    firstMoney?: number;
    secondMoney?: number;
    thirdMoney?: number;
    forthMoney?: number;
    fifthMoney?: number;
    winnerCount?: number;
    winnerUsdtAmount?: number;
}
@Service()
export class LotteryWinConditionService extends CoreService {

    @Inject(()=> LotteryWinConditionModel)
    private lotteryWinConditionModel: LotteryWinConditionModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: LotteryWinConditionCreateParams) {
         let lotteryWinCondition = new LotteryWinCondition();

         lotteryWinCondition.seqNo = params.seqNo;
         lotteryWinCondition.lotteryRound = params.lotteryRound;
         lotteryWinCondition.firstGrade = params.firstGrade;
         lotteryWinCondition.secondGrade = params.secondGrade;
         lotteryWinCondition.thirdGrade = params.thirdGrade;
         lotteryWinCondition.forthGrade = params.forthGrade;
         lotteryWinCondition.fifthGrade = params.fifthGrade;
         lotteryWinCondition.firstMoney = params.firstMoney;
         lotteryWinCondition.secondMoney = params.secondMoney;
         lotteryWinCondition.thirdMoney = params.thirdMoney;
         lotteryWinCondition.forthMoney = params.forthMoney;
         lotteryWinCondition.fifthMoney = params.fifthMoney;
         lotteryWinCondition.winnerCount = params.winnerCount;
         lotteryWinCondition.winnerUsdtAmount = params.winnerUsdtAmount;

         await this.lotteryWinConditionModel.create(lotteryWinCondition);
         return lotteryWinCondition.toObject();
    }

     public async get(req: Request, res: Response, seqNo: number) {
          let lotteryWinCondition = await this.lotteryWinConditionModel.get(seqNo);
          if(!lotteryWinCondition) {
               throw new CoreError(E_NOTFOUND, 'lotteryWinCondition not found')
          }
          return lotteryWinCondition;
     }

     public async getCondition(req: Request, res: Response, lotteryRound: number) {
          return await this.lotteryWinConditionModel.getByFilter({lotteryRound: lotteryRound});
     }

    public async list(req: Request, res: Response, filter: LotteryWinConditionListFilter, order: IOrder[], paging: IPaging) {
         return await this.lotteryWinConditionModel.list(filter, order, paging);
    }

    public async update(Request, res: Response, seqNo: number, params: LotteryWinConditionUpdateParams) {
         let lotteryWinCondition = await this.lotteryWinConditionModel.get(seqNo);
         if(!lotteryWinCondition) {
              throw new CoreError(E_NOTFOUND, 'lotteryWinCondition not found')
         }

          if(params.seqNo !== undefined) {
               lotteryWinCondition.seqNo = params.seqNo;
          };
          if(params.lotteryRound !== undefined) {
               lotteryWinCondition.lotteryRound = params.lotteryRound;
          };
          if(params.firstGrade !== undefined) {
               lotteryWinCondition.firstGrade = params.firstGrade;
          };
          if(params.secondGrade !== undefined) {
               lotteryWinCondition.secondGrade = params.secondGrade;
          };
          if(params.thirdGrade !== undefined) {
               lotteryWinCondition.thirdGrade = params.thirdGrade;
          };
          if(params.forthGrade !== undefined) {
               lotteryWinCondition.forthGrade = params.forthGrade;
          };
          if(params.fifthGrade !== undefined) {
               lotteryWinCondition.fifthGrade = params.fifthGrade;
          };
          if(params.firstMoney !== undefined) {
               lotteryWinCondition.firstMoney = params.firstMoney;
          };
          if(params.secondMoney !== undefined) {
               lotteryWinCondition.secondMoney = params.secondMoney;
          };
          if(params.thirdMoney !== undefined) {
               lotteryWinCondition.thirdMoney = params.thirdMoney;
          };
          if(params.forthMoney !== undefined) {
               lotteryWinCondition.forthMoney = params.forthMoney;
          };
          if(params.fifthMoney !== undefined) {
               lotteryWinCondition.fifthMoney = params.fifthMoney;
          };
          if(params.winnerCount !== undefined) {
               lotteryWinCondition.winnerCount = params.winnerCount;
          };
          if(params.winnerUsdtAmount !== undefined) {
               lotteryWinCondition.winnerUsdtAmount = params.winnerUsdtAmount;
          };

         await this.lotteryWinConditionModel.update(lotteryWinCondition);
         return lotteryWinCondition;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let lotteryWinCondition = await this.lotteryWinConditionModel.get(seqNo);
         if(!lotteryWinCondition) {

              throw new CoreError(E_NOTFOUND, 'lotteryWinCondition not found');
         }

         await this.lotteryWinConditionModel.delete(lotteryWinCondition);
         return lotteryWinCondition;
    }

}