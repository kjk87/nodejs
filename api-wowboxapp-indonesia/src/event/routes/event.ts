import { Authorized, Body, BodyParam, CurrentUser, Get, JsonController, Param, Post, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { EventListFilter, EventService, WriteImpressionParams } from "../services/event";
import { returnForm } from "../../common/services/util";
import { Inject } from "typedi";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/event')
export class EventController extends CoreController {

    @Inject(()=> EventService)
    private eventService: EventService;

    //이벤트 리스트
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: EventListFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.list(req, res, filter, paging, member));
    }

    //이벤트 상세
    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.get(req, res, seqNo, member));
    }

    //이벤트 응모
    @Authorized()
    @CheckApiKey()
    @Post('/join')
    public async join(@Req() req: Request, @Res() res: Response, @Body() params: any, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.join(req, res, params, member))
    }

    //이벤트 소감 작성
    @Authorized()
    @CheckApiKey()
    @Post('/writeImpression')
    public async writeImpression(@Req() req: Request, @Res() res: Response, @Body() params: WriteImpressionParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.writeImpression(req, res, params, member));
    }
    // @Post('/listByGroup')
    // public async getEventListByGroup(@Req() req: Request, @Res() res: Response, @Body() filter: EventgroupListFilter, @BodyParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
    //     return returnForm(await this.eventgroupService.list(req, res, filter, paging, member));
    // }

    // @Post('/getByNumber')
    // public async getByNumber(@Req() req: Request, @Res() res: Response, @Body() filter: EventListFilter, @CurrentUser() member: MemberA) {
    //     return returnForm(await this.eventService.getByNumber(req, res, filter, member));
    // }

    @Post('/getWinList')
    public async getWinList(@Req() req: Request, @Res() res: Response, @Body() filter: EventListFilter, @BodyParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.getWinList(req, res, filter, paging, member));
    }

    @CheckApiKey()
    @Post('/getWinCountOnlyPresentByMemberSeqNo')
    public async getWinCountOnlyPresentByMemberSeqNo(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.getWinCountOnlyPresentByMemberSeqNo(req, res, member))
    }

    @CheckApiKey()
    @Post('/getWinCountOnlyPresentToday')
    public async getWinCountOnlyPresentToday(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.getWinCountOnlyPresentToday(req, res, member))
    }

    @CheckApiKey()
    @Get('/getWinAnnounceList')
    public async getWinAnnounceList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: any, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventService.getWinAnnounceList(req, res, filter, paging, member));
    }
    
}