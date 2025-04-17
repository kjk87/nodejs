import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawPurchaseService } from "../services/lucky_draw_purchase";
import { LuckyDrawPurchase } from "../entities/lucky_draw_purchase";


@JsonController('/luckyDrawPurchase')
export class LuckyDrawPurchaseController extends CoreController {

    @Inject(()=> LuckyDrawPurchaseService)
    private luckyDrawPurchaseService: LuckyDrawPurchaseService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.luckyDrawPurchaseService.list(paging, member));
    }

    @Authorized()
    @Get('/getJoinCount')
    public async getJoinCount(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawSeqNo') luckyDrawSeqNo: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.luckyDrawPurchaseService.getJoinCount(luckyDrawSeqNo, member));
    }

    @Authorized()
    @Post()
    public async purchase(@Req() req: Request, @Res() res: Response, @Body() luckyDrawPurchase:LuckyDrawPurchase, @CurrentUser() member:MemberA) {
        return returnForm(await this.luckyDrawPurchaseService.purchase(req, res, luckyDrawPurchase, member));
    }
}