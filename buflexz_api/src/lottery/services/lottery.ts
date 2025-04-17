import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Status } from "../../common/services/type";
import { LotteryModel } from "../models/lottery";
import { IsNotEmpty } from "../../common/services/decorators";
import { Lottery, LotteryJoin } from "../entities/lottery";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { now, safeNumber } from "../../common/services/util";
import { ValidateIf } from "class-validator";
import { EntityManager } from "typeorm";

export interface LotteryListFilter extends ListFilter {
    seqNo?: number;
    lotteryRound?: number;
    title?: string;
    eventStartDatetime?: string;
    eventEndDatetime?: string;
    status?: string;
    announceDatetime?: string;
    no1?: number;
    no2?: number;
    no3?: number;
    no4?: number;
    no5?: number;
    no6?: number;
    bonusNo?: number;
    firstType?: string;
    firstMoney?: number;
    secondType?: string;
    secondMoney?: number;
    thirdType?: string;
    thirdMoney?: number;
    forthType?: string;
    forthMoney?: number;
    fifthType?: string;
    fifthMoney?: number;
    regDatetime?: string;
    firstAdd?: number;
    secondAdd?: number;
    thirdAdd?: number;
    forthAdd?: number;
    fifthAdd?: number;
    modDatetime?: string;
}

export class LotteryRoundFilter extends ListFilter {

     @ValidateIf(o => !o.seqNo)
     @IsNotEmpty()
     public lotteryRound: number;

     @ValidateIf(o => !o.lotteryRound)
     @IsNotEmpty()
     public seqNo: number;
     public announceDatetime?: string;
}

@Service()
export class LotteryService extends CoreService {

     @Inject(()=> LotteryModel)
     private lotteryModel: LotteryModel;

     constructor() {
          super();
     }

     public async get(req: Request, res: Response) {
          return await this.latest();
     }


     //진행중 로또 가져오기
     public async latest(manager?: EntityManager): Promise<Lottery> {

          let filter = {
               status: Status.ACTIVE,
               eventStartDatetime: now(),
               eventEndDatetime: now()
          }

          let lottery: Lottery = await this.lotteryModel.getByFilter(filter, undefined, undefined, manager);

          return lottery;
     }

     //회차로 로또정보 가져오기
     public async round(req: Request, res: Response, seqNo: number) {

          let filter: ListFilter = {
               joinColumn: [
                    {
                         joinTable: 'lotteryWinCondition'
                    }
               ]
          }
          let lottery: Lottery = await this.lotteryModel.get(seqNo, LotteryJoin, filter);

          return lottery;

     }

     //회차 리스트
     public async roundList(req: Request, res: Response) {
          let list = await this.lotteryModel.round(now());

          return {list: list}
     }

}