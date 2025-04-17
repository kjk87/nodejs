import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxReviewImageService, LuckyboxReviewImageCreateParams, LuckyboxReviewImageUpdateParams, LuckyboxReviewImageListFilter } from "../services/luckybox_review_image";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/luckyboxReviewImage')
export class LuckyboxReviewImageController extends CoreController {

    @Inject(()=> LuckyboxReviewImageService)
    private luckyboxReviewImageService: LuckyboxReviewImageService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxReviewImageCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReviewImageService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReviewImageService.get(req, res, seqNo, sessionMember));
//    }

//    @Get()
//    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxReviewImageListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReviewImageService.list(req, res, filter, order, paging, sessionMember));
//    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxReviewImageUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReviewImageService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxReviewImageService.delete(req, res, seqNo, sessionMember));
//    }

}