import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { NoticeFilter, NoticeService } from "../service/notice";


@JsonController('/notice')
export class FaqController extends CoreController {

    @Inject(()=> NoticeService)
    private noticeService: NoticeService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: NoticeFilter, @QueryParam('order') order:IOrder[], @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.noticeService.list(filter, order, paging));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.noticeService.get(seqNo));
    }
}