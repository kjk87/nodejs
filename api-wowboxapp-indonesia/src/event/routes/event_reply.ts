import { CoreController } from "../../common/core/CoreController";
import { Response, Request } from 'express';
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Params, Post, Put, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { returnForm } from "../../common/services/util";
import { Inject } from "typedi";
import { EventReplyService } from "../services/event_reply";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/eventReply')
export class EventReplyController extends CoreController {

    @Inject(()=> EventReplyService)
    private eventReplyService: EventReplyService;


    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params,  @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReplyService.create(req, res, params, member));
    }

    @Authorized()
    @CheckApiKey()
    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') replySeqNo, @Body() params, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReplyService.update(req, res, replySeqNo, params, member));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response,@QueryParams() filter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.eventReplyService.list(req, res, filter, order, paging));
    }

    @Authorized()
    @CheckApiKey()
    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') replySeqNo, @Body() params, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReplyService.delete(req, res, replySeqNo, member));
    }

} 