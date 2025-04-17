import { Authorized, Body, CurrentUser, Get, JsonController, Post, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { Inject } from "typedi";
import { CoreController } from "../../common/core/CoreController";
import { returnForm } from "../../common/services/util";
import { EventJoinService } from "../services/event_join";
import { Request, Response } from 'express';
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/eventJoin')
export class EventJoinController extends CoreController {
    @Inject(()=> EventJoinService)
    private eventJoinService: EventJoinService;

    @Authorized()
    @CheckApiKey()
    @Get('/getEventJoinCount')
    public async getEventJoinCount(@Req() req: Request, @Res() res: Response, @QueryParam('eventSeqNo') eventSeqNo, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventJoinService.getEventJoinCount(req, res, eventSeqNo, member));
    }

}