import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Authorized, Body, CurrentUser, Get, JsonController, Param, Params, Post, Put, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { Inject } from "typedi";
import { EventReviewService } from "../services/event_review";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/eventReview')
export class EventReviewController extends CoreController {

    @Inject(()=> EventReviewService)
    private eventReviewService: EventReviewService;


    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReviewService.create(req, res, params, member))
    }

    @Authorized()
    @CheckApiKey()
    @Put('/:reviewSeqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('reviewSeqNo') reviewSeqNo: number, @Body() params, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReviewService.update(req, res, reviewSeqNo, params, member))
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response,@QueryParams() filter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.eventReviewService.list(req, res, filter, order, paging))
    }

    @Authorized()
    @CheckApiKey()
    @Get('/my')
    public async myList(@Req() req: Request, @Res() res: Response, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.eventReviewService.myList(req, res, order, paging, member))
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.eventReviewService.get(req, res, seqNo))
    }
}