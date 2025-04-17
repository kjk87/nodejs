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
import { MemberA } from "../../member/entities/member_a";
import { ReplyReportModel } from "../models/reply_report";
import { ReplyReport } from "../entities/reply_report";


export interface ReplyReportFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    luckyDrawWinReplySeqNo?: number;
}

export class ReportParams {

    @IsNotEmpty()
    public reason: string;

    @IsNotEmpty()
    public type: string;

    @IsNotEmpty()
    public luckyDrawWinReplySeqNo: number;
}

@Service()
export class ReplyReportService extends CoreService {
    @Inject(()=> ReplyReportModel)
    private replyReportModel: ReplyReportModel;

    @Transaction()
    public async report(req: Request, res: Response, params:ReportParams, member:MemberA, manager?: EntityManager){

        let replyReport = new ReplyReport();
        replyReport.userKey = member.userKey
        replyReport.type = params.type;
        if(params.type == 'luckyDrawWin'){
            replyReport.luckyDrawWinReplySeqNo = params.luckyDrawWinReplySeqNo;
        }        
        replyReport.reason = params.reason;
        replyReport.regDatetime = now();

        return await this.replyReportModel.create(replyReport, ReplyReport, manager);

    }
}