import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxPurchaseService, LuckyboxPurchaseCreateParams, LuckyboxPurchaseUpdateParams, LuckyboxPurchaseListFilter, PaymentParams } from "../services/luckybox_purchase";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@Controller('/luckyboxPurchase')
export class LuckyboxPurchaseController extends CoreController {

    @Inject(()=> LuckyboxPurchaseService)
    private luckyboxPurchaseService: LuckyboxPurchaseService;

    constructor() {
        super();
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxPurchaseCreateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseService.create(req, res, params, member));
    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseService.get(req, res, seqNo, sessionMember));
//    }

    @Authorized()
    @CheckApiKey()
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxPurchaseListFilter, @QueryParam('order') order: IOrder[], @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseService.list(req, res, filter, order, member));
    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxPurchaseUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseService.update(req, res, seqNo, params, sessionMember));
//    }

    @Authorized()
    @CheckApiKey()
    @Delete('/:seqNo(\\d+)')
    public async cancel(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseService.cancel(req, res, seqNo, member));
    }

    @Post('/payment')
    public async paymentLuckyBoxPurchase(@Req() req: Request, @Res() res: Response, @Body() params: PaymentParams) {
        return returnForm(await this.luckyboxPurchaseService.paymentLuckyBoxPurchase(req, res, params));
    }
}