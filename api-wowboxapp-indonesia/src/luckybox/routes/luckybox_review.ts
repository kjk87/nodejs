import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxReviewService, LuckyboxReviewCreateParams, LuckyboxReviewUpdateParams, LuckyboxReviewListFilter } from "../services/luckybox_review";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@Controller('/luckyboxReview')
export class LuckyboxReviewController extends CoreController {

    @Inject(()=> LuckyboxReviewService)
    private luckyboxReviewService: LuckyboxReviewService;

    constructor() {
        super();
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxReviewCreateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReviewService.create(req, res, params, member));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReviewService.get(req, res, seqNo, member));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxReviewListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReviewService.list(req, res, filter, order, paging, member));
    }

    @Authorized()
    @CheckApiKey()
    @Get('/my')
    public async myList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxReviewListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReviewService.myList(req, res, filter, order, paging, member));
    }

    @Authorized()
    @CheckApiKey()
    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxReviewUpdateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReviewService.update(req, res, seqNo, params, member));
    }

    // @Delete('/:seqNo(\\d+)')
    // public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
    //     return returnForm(await this.luckyboxReviewService.delete(req, res, seqNo, sessionMember));
    // }

}