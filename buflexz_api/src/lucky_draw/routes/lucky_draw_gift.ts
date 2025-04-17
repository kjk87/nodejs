import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawGiftService } from "../services/lucky_draw_gift";


@JsonController('/luckyDrawGift')
export class LuckyDrawGiftController extends CoreController {

    @Inject(()=> LuckyDrawGiftService)
    private luckyDrawGiftService: LuckyDrawGiftService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawSeqNo') luckyDrawSeqNo: number) {
        return returnForm(await this.luckyDrawGiftService.list(luckyDrawSeqNo));
    }
}