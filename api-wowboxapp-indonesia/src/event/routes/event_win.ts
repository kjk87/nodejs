import { Authorized, Body, BodyParam, CurrentUser, Get, JsonController, Post, Put, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { EventWinListFilter, EventWinService } from "../services/event_win";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/eventwin')
export class EventWinController extends CoreController {

    @Inject(()=> EventWinService)
    private eventWinService: EventWinService;

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: EventWinListFilter, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.eventWinService.list(req, res, filter, paging));
    }

    @Post('/getWinListOnlyPresent')
    public async getWinListOnlyPresent(@Req() req: Request, @Res() res: Response, @Body() filter, @BodyParam('paging') paging: IPaging) {
        return returnForm(await this.eventWinService.getWinListOnlyPresent(req, res, filter, paging));
    }

    @Authorized()
    @CheckApiKey()
    @Post('/getMyWinListOnlyPresent')
    public async getMyWinListOnlyPresent(@Req() req: Request, @Res() res: Response, @Body() filter, @BodyParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventWinService.getMyWinListOnlyPresent(req, res, filter, paging, member));
    }

    @Post('/getWinBySeqNo')
    public async getWinBySeqNo(@Req() req: Request, @Res() res: Response, @Body() filter) {
        return returnForm(await this.eventWinService.getWinBySeqNo(req, res, filter));
    }

    @Authorized()
    @CheckApiKey()
    @Post('/getNewWinCountByUser')
    public async getNewWinCountByUser(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventWinService.getNewWinCountByUser(req, res, member));
    }

    @Authorized()
    @CheckApiKey()
    @Get('/getUserWinList')
    public async getUserWinList(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging,  @CurrentUser() member: MemberA) {
        return returnForm(await this.eventWinService.getUserWinList(req, res, paging, member));
    }

    @Authorized()
    @CheckApiKey()
    @Post('/existsResult')
    public async existsResult(@Req() req: Request, @Res() res: Response, @BodyParam('eventSeqNo') eventSeqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventWinService.existsResult(req, res, eventSeqNo, member))
    }

    @Authorized()
    @CheckApiKey()
    @Post('/getWinAll')
    public async getWinAll(@Req() req: Request, @Res() res: Response, @BodyParam('eventSeqNo') eventSeqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventWinService.getEventWinAllByUser(req, res, eventSeqNo, member))
    }
}

