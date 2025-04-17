import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { GiftCardService } from "../services/gift_card";
import { GiftCardPurchaseFilter, GiftCardPurchaseService } from "../services/gift_card_purchase";
import { GiftCardPurchase } from "../entities/gift_card_purchase";
import { MemberA } from "../../member/entities/member_a";


@JsonController('/giftCardPurchase')
export class GiftCardController extends CoreController {

    @Inject(()=> GiftCardPurchaseService)
    private giftCardPurchaseService: GiftCardPurchaseService;

    constructor() {
        super();
    }

    @Authorized()
    @Post()
    public async purchase(@Req() req: Request, @Res() res: Response, @Body() params: GiftCardPurchase, @CurrentUser() member:MemberA) {
        return returnForm(await this.giftCardPurchaseService.purchase(req, res, params, member));
    }

    @Authorized()
    @Get('/:seqNo(\\d+)')
    public async getOne(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.giftCardPurchaseService.getOne(seqNo, member));
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter:GiftCardPurchaseFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.giftCardPurchaseService.list(filter, paging, member));
    }
    
}