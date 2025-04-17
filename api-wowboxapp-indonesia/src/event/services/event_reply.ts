import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { EventReply, EventReplyJoinToMember } from "../entities/event_reply";
import { now } from "../../common/services/util";
import { EventReplyModel } from "../models/event_reply";
import { CoreError } from "../../common/core/CoreError";
import * as ErrorType from "../../common/services/errorType";
import { MemberA } from "../../member/entities/member_a";

@Service()
export class EventReplyService extends CoreService {

    @Inject(()=> EventReplyModel)
    private eventReplyModel: EventReplyModel;


    public async create(req: Request, res: Response, params, member: MemberA) {
        let eventReply = new EventReply();

        params.reply = params.reply;

        eventReply.userKey = member.userKey;
        eventReply.eventSeqNo = params.eventSeqNo;
        eventReply.eventWinSeqNo = params.eventWinSeqNo;
        eventReply.eventReviewSeqNo = params.eventReviewSeqNo;
        eventReply.reply = params.reply;
        eventReply.regDatetime = now();
        eventReply.modDatetime = now();
        eventReply.status = 1;
        
        eventReply = await this.eventReplyModel.create(eventReply);

        return eventReply;
    }

    public async update(req: Request, res: Response, replySeqNo: number, params, member: MemberA) {
        
        let reply = await this.eventReplyModel.get(replySeqNo);

        if(!reply) throw new CoreError(ErrorType.E_NOTFOUND);

        if(reply.userKey != member.userKey){
            throw new CoreError(ErrorType.E_NOTPERMISSION);
        }

        reply.reply = params.reply;
        reply.modDatetime = now();
        reply.status = 1;

        reply = await this.eventReplyModel.update(reply);

        return reply;
    }

    public async list(req: Request, res: Response, filter, order, paging) {
        

        let _filter = {
            event_review_seq_no: filter.eventReviewSeqNo,
            event_seq_no: filter.eventSeqNo,
            event_win_seq_no: filter.eventWinSeqNo,
            joinColumn : [{joinTable: 'memberTotal'}]
        }

        //order = orderingKey(order);
        
        return await this.eventReplyModel.list(_filter, order, paging, EventReplyJoinToMember);
    }

    public async delete(req: Request, res: Response, replySeqNo: number, member: MemberA) {
        
        let reply = await this.eventReplyModel.get(replySeqNo);

        if(!reply) throw new CoreError(ErrorType.E_NOTFOUND);

        if(reply.userKey != member.userKey){
            throw new CoreError(ErrorType.E_NOTPERMISSION);
        }

        reply.status = -999;

        reply = await this.eventReplyModel.update(reply);

        return reply;
    }
}