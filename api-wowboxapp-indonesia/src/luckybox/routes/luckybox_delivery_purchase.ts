import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxDeliveryPurchaseService, LuckyboxDeliveryPurchaseCreateParams, LuckyboxDeliveryPurchaseUpdateParams, LuckyboxDeliveryPurchaseListFilter } from "../services/luckybox_delivery_purchase";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { PaymentParams } from "../services/luckybox_purchase";
import { CheckApiKey } from "../../common/services/decorators";

@Controller('/luckyboxDeliveryPurchase')
export class LuckyboxDeliveryPurchaseController extends CoreController {

    @Inject(()=> LuckyboxDeliveryPurchaseService)
    private luckyboxDeliveryPurchaseService: LuckyboxDeliveryPurchaseService;

    constructor() {
        super();
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxDeliveryPurchaseCreateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxDeliveryPurchaseService.create(req, res, params, member));
    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxDeliveryPurchaseService.get(req, res, seqNo, sessionMember));
//    }

//    @Get()
//    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxDeliveryPurchaseListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxDeliveryPurchaseService.list(req, res, filter, order, paging, sessionMember));
//    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxDeliveryPurchaseUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxDeliveryPurchaseService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxDeliveryPurchaseService.delete(req, res, seqNo, sessionMember));
//    }


    @Post('/payment')// 성공 후 return URL
    public async paymentLuckyBoxDeliveryPurchase(@Req() req: Request, @Res() res: Response, @Body() params: PaymentParams) {
        return returnForm(await this.luckyboxDeliveryPurchaseService.paymentLuckyBoxDeliveryPurchase(req, res, params));
    }

    // @Post('/billkey')
    // public async paymentBillkeyLuckyBoxDeliveryPurchase(@Req() req: Request, @Res() res: Response, @Body() params: BillkeyParams, @CurrentUser() member: MemberA) {
    //     return returnForm(await this.luckyboxDeliveryPurchaseService.paymentBillkeyLuckyBoxDeliveryPurchase(req, res, params, sessionMember));
    // }

}