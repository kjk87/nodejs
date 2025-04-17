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
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { LuckyDrawGiftModel } from "../models/lucky_draw_gift";
import { LuckyDrawWinModel } from "../models/lucky_draw_win";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawWin, LuckyDrawWinJoin } from "../entities/lucky_draw_win";


export interface LuckyDrawWinFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    luckyDrawSeqNo?: number;
    luckyDrawPurchaseSeqNo?: number;
    luckyDrawGiftSeqNo?: number;
}


@Service()
export class LuckyDrawWinService extends CoreService {
    @Inject(()=> LuckyDrawWinModel)
    private luckyDrawWinModel: LuckyDrawWinModel;

    public async list(luckyDrawSeqNo : number, paging: IPaging){

        let filter:LuckyDrawWinFilter = {}
        filter.luckyDrawSeqNo = luckyDrawSeqNo;
        filter.joinColumn = [
            {
                 joinTable: 'memberTotal',
                 join: 'left',//optional (default left)
                 defaultTable: 'entity'//optional (default entity)
            },
            {
                joinTable: 'luckyDrawGift',
                join: 'left',//optional (default left)
                defaultTable: 'entity'//optional (default entity)
           },
       ];

        let order:IOrder[] = [
            {
                 column: `gift_grade`,
                 dir: 'ASC'
            }
       ]

       return await this.luckyDrawWinModel.list(filter, order, paging, LuckyDrawWinJoin);
    }

    public async myWinList(luckyDrawSeqNo : number, member:MemberA){
        let filter:LuckyDrawWinFilter = {}
        filter.luckyDrawSeqNo = luckyDrawSeqNo;
        filter.userKey = member.userKey;
        filter.joinColumn = [
            {
                 joinTable: 'luckyDrawGift',
                 join: 'left',//optional (default left)
                 defaultTable: 'entity'//optional (default entity)
            },
       ];

        let order:IOrder[] = [
            {
                 column: `gift_grade`,
                 dir: 'ASC'
            }
       ]

        return await this.luckyDrawWinModel.all(filter, order, LuckyDrawWinJoin);
    }

    public async myWinListAll(member:MemberA, paging: IPaging){
        let filter:LuckyDrawWinFilter = {}

        filter.userKey = member.userKey;
        filter.joinColumn = [
            {
                 joinTable: 'luckyDrawGift',
                 join: 'left',//optional (default left)
                 defaultTable: 'entity'//optional (default entity)
            },
            {
                 joinTable: 'luckyDraw',
                 join: 'left',//optional (default left)
                 defaultTable: 'entity'//optional (default entity)
            },
       ];

        let order:IOrder[] = [
            {
                 column: `seqNo`,
                 dir: 'DESC'
            }
       ]

        return await this.luckyDrawWinModel.list(filter, order, paging, LuckyDrawWinJoin);
    }

    @Transaction()
    public async updateImpression(req: Request, res: Response, seqNo : number, impression:string, member:MemberA, manager?: EntityManager){
        let filter:LuckyDrawWinFilter = {}
        filter.seqNo = seqNo;
        filter.userKey = member.userKey;
        let luckyDrawWin : LuckyDrawWin = await this.luckyDrawWinModel.getByFilter(filter, undefined, undefined, manager);

        if(!luckyDrawWin){
            throw new CoreError(ErrorType.E_NOTFOUND, 'luckyDrawWin is null');
        }

        if(!impression){
            throw new CoreError(ErrorType.E_INVALID_ARG, 'impression is empty');
        }

        luckyDrawWin.impression = impression;


        await this.luckyDrawWinModel.update(luckyDrawWin, LuckyDrawWin, manager);
        return luckyDrawWin;
    }
}