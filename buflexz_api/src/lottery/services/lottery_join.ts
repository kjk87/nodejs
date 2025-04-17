import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LotteryJoinModel } from "../models/lottery_join";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LotteryJoin } from "../entities/lottery_join";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { EntityManager } from "typeorm";
import { Lottery } from "../entities/lottery";
import { LotteryModel } from "../models/lottery";
import { LotteryService } from "./lottery";
import { LotteryJoinUserModel } from "../models/lottery_join_user";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { MemberA } from "../../member/entities/member_a";
import { LotteryJoinType } from "../../common/services/type";
import { E_INVALID_ARG, E_NOTFOUND, E_SUCCESS } from "../../common/services/errorType";
import { CoreListResponse } from "../../common/core/CoreListResponse";

export class LotteryJoinCreateParams {
    
     @IsNotEmpty()
     public joinType: string;
     public count: number;
     public userKey?: string;
}
export class LotteryJoinUpdateParams {
    public seqNo?: string;
    public lotteryRound?: number;
    public userKey?: string;
    public no1?: number;
    public no2?: number;
    public no3?: number;
    public no4?: number;
    public no5?: number;
    public no6?: number;
    public joinType?: string;
    public regDatetime?: string;
}
export class LotteryJoinListFilter extends ListFilter {

     @IsNotEmpty()
     public lotteryRound?: number;

     public userKey?: string;
     public joinType?: string;
     public seqNo?: number;
}

export class LatestCountFilter extends ListFilter {
     
     @IsNotEmpty()
     public lotteryRound: number;

     @IsNotEmpty()
     public userKey?: string;
}

export class LotteryJoinTestCreateParams {
    
     @IsNotEmpty()
     public count: number;
     public joinType: string;
     public userKey?: string;
     public lotteryRound?: number;
}

@Service()
export class LotteryJoinService extends CoreService {

     @Inject(()=> LotteryJoinModel)
     private lotteryJoinModel: LotteryJoinModel;

     @Inject(()=> LotteryService)
     private lotteryService: LotteryService;

     @Inject(()=> LotteryJoinUserModel)
     private lotteryJoinUserModel: LotteryJoinUserModel;


     constructor() {
         super();
     }


     @Transaction()
     public async create(req: Request, res: Response, params: LotteryJoinCreateParams, member: MemberA, manager?: EntityManager) {
          return await this.lotteryJoin(params, member, manager);
     }


     //로또 응모
     public async lotteryJoin(params: LotteryJoinCreateParams, member: MemberA, manager?: EntityManager) {
          let lottery: Lottery = await this.lotteryService.latest(manager);

          if(lottery) {
               if(params.joinType == LotteryJoinType.ADVERTISE) {
                    params.count = 1;
               } else if(params.joinType == LotteryJoinType.LOTTO) {

               } else if(params.joinType == LotteryJoinType.INVITE) {

               } else  {
                    if(!params.joinType){
                         throw new CoreError(E_INVALID_ARG, 'invalid joinType');
                    }
                    
               }
               await this.lotteryJoinModel.procJoinLottery(member, lottery, params, manager);
               return E_SUCCESS;
          }
          throw new CoreError(E_NOTFOUND);
     }

     public async inviteLotteryJoin(member: MemberA, count:number, manager?: EntityManager){
          let param = new LotteryJoinCreateParams();
          param.count = count;
          param.joinType = 'invite';
          param.userKey = member.userKey;
          return await this.lotteryJoin(param, member, manager);
     }
}