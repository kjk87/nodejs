import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LotteryJoinUserModel } from "../models/lottery_join_user";
import { IsNotEmpty } from "../../common/services/decorators";
import { LotteryJoin } from "../entities/lottery_join";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { EntityManager, Transaction } from "typeorm";
import { Lottery } from "../entities/lottery";
import { LotteryModel } from "../models/lottery";
import { LotteryService } from "./lottery";
import { safeNumber } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LotteryJoinListFilter } from "./lottery_join";
import { CoreListResponse } from "../../common/core/CoreListResponse";

export class LotteryJoinUserCreateParams {
    
     @IsNotEmpty()
     public joinType: string;

     @IsNotEmpty()
     public count: number;
     
}
export class LotteryJoinUserUpdateParams {
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
export class LotteryJoinUserListFilter extends ListFilter {

     @IsNotEmpty()
     public lotteryRound?: number;
     public userKey?: string;
     public no1?: number;
     public no2?: number;
     public no3?: number;
     public no4?: number;
     public no5?: number;
     public no6?: number;
     public joinType?: string;
     public regDatetime?: any;
     public seqNo?: number;
}

export class LatestCountFilter extends ListFilter {
     
     @IsNotEmpty()
     public lotteryRound: number;
     public userKey?: string;
}

@Service()
export class LotteryJoinUserService extends CoreService {

     @Inject(()=> LotteryJoinUserModel)
     private lotteryJoinUserModel: LotteryJoinUserModel;

     constructor() {
         super();
     }

     //내 응모 리스트
     public async list(req: Request, res: Response, params: LotteryJoinListFilter, member: MemberA, paging: IPaging = {page: 1, limit: 10}) {
          
          let offset = (Number(paging.page) - 1) * Number(paging.limit);
          let list = await this.lotteryJoinUserModel.getJoinList(member.userKey, params.lotteryRound, offset, paging.limit);
          let count = await this.lotteryJoinUserModel.getJoinCount(member.userKey, params.lotteryRound);

          return new CoreListResponse(list, count);
     }

     public async latestJoinCount(req: Request, res: Response, params: LatestCountFilter, member: MemberA) {

          let data = await this.lotteryJoinUserModel.getJoinCount(member.userKey, params.lotteryRound);

          return data;
          
     }
}