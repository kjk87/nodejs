import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawGiftService } from "../services/lucky_draw_gift";
import { LuckyDrawWinService } from "../services/lucky_draw_win";


@JsonController('/luckyDrawWin')
export class LuckyDrawWinController extends CoreController {

    @Inject(()=> LuckyDrawWinService)
    private luckyDrawWinService: LuckyDrawWinService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawSeqNo') luckyDrawSeqNo: number, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.luckyDrawWinService.list(luckyDrawSeqNo, paging));
    }

    @Authorized()
    @Get('/myWinList')
    public async myWinList(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawSeqNo') luckyDrawSeqNo: number, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinService.myWinList(luckyDrawSeqNo, member));
    }

    @Authorized()
    @Get('/myWinListAll')
    public async myWinListAll(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinService.myWinListAll(member, paging));
    }

    @Authorized()
    @Post('/updateImpression')
    public async updateImpression(@Req() req: Request, @Res() res: Response, @BodyParam('seqNo') seqNo: number, @BodyParam('impression') impression:string, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinService.updateImpression(req, res, seqNo, impression, member));
    }
}