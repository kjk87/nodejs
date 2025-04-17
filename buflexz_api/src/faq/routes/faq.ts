import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { FaqCategoryFilter, FaqFilter, FaqService } from '../service/faq';


@JsonController('/faq')
export class FaqController extends CoreController {

    @Inject(()=> FaqService)
    private faqService: FaqService;

    constructor() {
        super();
    }

    @Get('/category/list')
    public async categoryList(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.faqService.categoryList());
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: FaqFilter, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.faqService.list(filter, paging));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.faqService.get(seqNo));
    }
}