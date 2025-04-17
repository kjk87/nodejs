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
import { getUUIDv4, now, wordFilter } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { LuckyDrawWinReplyModel } from "../models/lucky_draw_win_reply";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawWinReply, LuckyDrawWinReplyJoin } from "../entities/lucky_draw_win_reply";


export interface LuckyDrawWinReplyFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    luckyDrawWinSeqNo?: number;
}

export class ReplyParams {

    @IsNotEmpty()
    public reply: string;

    @IsNotEmpty()
    public luckyDrawWinSeqNo: number;
}

export class UpdateReplyParams {

    @IsNotEmpty()
    public seqNo: number;

    @IsNotEmpty()
    public reply: string;

}

@Service()
export class LuckyDrawWinReplyService extends CoreService {
    @Inject(()=> LuckyDrawWinReplyModel)
    private luckyDrawWinReplyModel: LuckyDrawWinReplyModel;

    public async list(luckyDrawWinSeqNo : number, paging: IPaging){

        let filter:LuckyDrawWinReplyFilter = {}
        filter.luckyDrawWinSeqNo = luckyDrawWinSeqNo;
        filter.joinColumn = [
            {
                 joinTable: 'memberTotal',
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

       return await this.luckyDrawWinReplyModel.list(filter, order, paging, LuckyDrawWinReplyJoin);
    }

    @Transaction()
    public async reply(req: Request, res: Response, params:ReplyParams, member:MemberA, manager?: EntityManager){

        var languages = [member.language]
        if(member.language != 'en'){
             languages[1] = 'en'
        }

        if(wordFilter(params.reply, languages)){
            throw new CoreError(ErrorType.E_INCLUDE_CURSING);
       }

        let luckyDrawWinReply = new LuckyDrawWinReply();
        luckyDrawWinReply.userKey = member.userKey
        luckyDrawWinReply.luckyDrawWinSeqNo = params.luckyDrawWinSeqNo;
        luckyDrawWinReply.reply = params.reply;
        luckyDrawWinReply.regDatetime = now();
        luckyDrawWinReply.modDatetime = now();

        return await this.luckyDrawWinReplyModel.create(luckyDrawWinReply, LuckyDrawWinReply, manager);

    }

    @Transaction()
    public async updateReply(req: Request, res: Response, params:UpdateReplyParams, member:MemberA, manager?: EntityManager){

        let filter:LuckyDrawWinReplyFilter = {}
        filter.seqNo = params.seqNo;
        filter.userKey = member.userKey;

        let luckyDrawWinReply : LuckyDrawWinReply = await this.luckyDrawWinReplyModel.getByFilter(filter, undefined, undefined, manager);
        if(!luckyDrawWinReply){
            throw new CoreError(ErrorType.E_NOTFOUND);
        }

        var languages = [member.language]
        if(member.language != 'en'){
             languages[1] = 'en'
        }

        if(wordFilter(params.reply, languages)){
            throw new CoreError(ErrorType.E_INCLUDE_CURSING);
       }
        
        luckyDrawWinReply.reply = params.reply;
        luckyDrawWinReply.modDatetime = now();

        return await this.luckyDrawWinReplyModel.update(luckyDrawWinReply, LuckyDrawWinReply, manager);

    }

    @Transaction()
    public async deleteReply(req: Request, res: Response, seqNo:number, member:MemberA, manager?: EntityManager){

        let filter:LuckyDrawWinReplyFilter = {}
        filter.seqNo = seqNo;
        filter.userKey = member.userKey;

        let luckyDrawWinReply : LuckyDrawWinReply = await this.luckyDrawWinReplyModel.getByFilter(filter, undefined, undefined, manager);
        if(!luckyDrawWinReply){
            throw new CoreError(ErrorType.E_NOTFOUND);
        }
    

        return await this.luckyDrawWinReplyModel.delete(luckyDrawWinReply, manager);

    }
}