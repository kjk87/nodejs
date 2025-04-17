import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxPurchaseCancelService, LuckyboxPurchaseCancelCreateParams, LuckyboxPurchaseCancelUpdateParams, LuckyboxPurchaseCancelListFilter } from "../services/luckybox_purchase_cancel";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/luckyboxPurchaseCancel')
export class LuckyboxPurchaseCancelController extends CoreController {

    @Inject(()=> LuckyboxPurchaseCancelService)
    private luckyboxPurchaseCancelService: LuckyboxPurchaseCancelService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxPurchaseCancelCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseCancelService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseCancelService.get(req, res, seqNo, sessionMember));
//    }

//    @Get()
//    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxPurchaseCancelListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseCancelService.list(req, res, filter, order, paging, sessionMember));
//    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxPurchaseCancelUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseCancelService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseCancelService.delete(req, res, seqNo, sessionMember));
//    }

}