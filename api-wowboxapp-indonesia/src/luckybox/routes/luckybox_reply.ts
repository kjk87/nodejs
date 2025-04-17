import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxReplyService, LuckyboxReplyCreateParams, LuckyboxReplyUpdateParams, LuckyboxReplyListFilter } from "../services/luckybox_reply";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@Controller('/luckyboxReply')
export class LuckyboxReplyController extends CoreController {

    @Inject(()=> LuckyboxReplyService)
    private luckyboxReplyService: LuckyboxReplyService;

    constructor() {
        super();
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxReplyCreateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReplyService.create(req, res, params, member));
    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReplyService.get(req, res, seqNo, sessionMember));
//    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxReplyListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReplyService.list(req, res, filter, order, paging));
    }

    @Authorized()
    @CheckApiKey()
    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxReplyUpdateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReplyService.update(req, res, seqNo, params, member));
    }

    @Authorized()
    @CheckApiKey()
    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxReplyService.delete(req, res, seqNo, member));
    }

}