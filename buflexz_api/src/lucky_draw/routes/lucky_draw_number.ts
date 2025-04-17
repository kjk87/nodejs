import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawGiftService } from "../services/lucky_draw_gift";
import { LuckyDrawNumberService } from "../services/lucky_draw_number";


@JsonController('/luckyDrawNumber')
export class LuckyDrawNumberController extends CoreController {

    @Inject(()=> LuckyDrawNumberService)
    private luckyDrawNumberService: LuckyDrawNumberService;

    constructor() {
        super();
    }

    @Get('/remainCount')
    public async remainCount(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawSeqNo') luckyDrawSeqNo: number) {
        return returnForm(await this.luckyDrawNumberService.remainCount(luckyDrawSeqNo));
    }

    @Authorized()
    @Post('/selectNumber')
    public async selectNumber(@Req() req: Request, @Res() res: Response, @BodyParam('luckyDrawSeqNo') luckyDrawSeqNo: number) {
        return returnForm(await this.luckyDrawNumberService.selectNumber(luckyDrawSeqNo));
    }
    
    @Post('/deleteNumber')
    public async deleteNumber(@Req() req: Request, @Res() res: Response, @BodyParam('luckyDrawSeqNo') luckyDrawSeqNo: number, @BodyParam('winNumbers') winNumbers: string) {
        return returnForm(await this.luckyDrawNumberService.deleteNumber(luckyDrawSeqNo, winNumbers));
    }

}