import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Req, Res } from "routing-controllers";
import { EventService } from "./event";
import { Event } from "../entities/event";
import moment = require("moment");
import { EventJoinModel } from "../models/event_join";
import { MemberA } from "../../member/entities/member_a";


@Service()
export class EventJoinService extends CoreService {

    @Inject(()=> EventService)
    private eventService: EventService;

    @Inject(()=> EventJoinModel)
    private eventJoinModel: EventJoinModel;


    public async getEventJoinCount(@Req() req: Request, @Res() res: Response, eventSeqNo: number, member: MemberA) {

        let _filter = {
            event_seq_no: eventSeqNo,
            user_key: member.userKey,
        }

        let data = await this.eventJoinModel.all(_filter);

        return {
            count: data.length
        }
    }
    


}