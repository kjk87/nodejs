import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawFilter, LuckyDrawService } from "../services/lucky_draw";


@JsonController('/luckyDraw')
export class LuckyDrawController extends CoreController {

    @Inject(()=> LuckyDrawService)
    private luckyDrawService: LuckyDrawService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyDrawFilter, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.luckyDrawService.list(filter, paging));
    }

    @Get('/completeList')
    public async completeList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyDrawFilter, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.luckyDrawService.completeList(filter, paging));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.luckyDrawService.get(seqNo));
    }

    @Get('/checkPrivate/:seqNo(\\d+)')
    public async checkPrivate(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @QueryParam('privateKey') privateKey: string) {
        return returnForm(await this.luckyDrawService.checkPrivate(seqNo, privateKey));
    }
}