import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxPurchaseItemOptionService, LuckyboxPurchaseItemOptionCreateParams, LuckyboxPurchaseItemOptionUpdateParams, LuckyboxPurchaseItemOptionListFilter } from "../services/luckybox_purchase_item_option";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/luckyboxPurchaseItemOption')
export class LuckyboxPurchaseItemOptionController extends CoreController {

    @Inject(()=> LuckyboxPurchaseItemOptionService)
    private luckyboxPurchaseItemOptionService: LuckyboxPurchaseItemOptionService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxPurchaseItemOptionCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemOptionService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemOptionService.get(req, res, seqNo, sessionMember));
//    }

//    @Get()
//    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxPurchaseItemOptionListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemOptionService.list(req, res, filter, order, paging, sessionMember));
//    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxPurchaseItemOptionUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemOptionService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemOptionService.delete(req, res, seqNo, sessionMember));
//    }

}