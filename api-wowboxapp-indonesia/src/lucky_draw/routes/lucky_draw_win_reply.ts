import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawWinReplyService, ReplyParams, UpdateReplyParams } from "../services/lucky_draw_win_reply";
import { CheckApiKey } from "../../common/services/decorators";


@JsonController('/luckyDrawWinReply')
export class LuckyDrawWinController extends CoreController {

    @Inject(()=> LuckyDrawWinReplyService)
    private luckyDrawWinReplyService: LuckyDrawWinReplyService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('luckyDrawWinSeqNo') luckyDrawWinSeqNo: number, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.luckyDrawWinReplyService.list(luckyDrawWinSeqNo, paging));
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async reply(@Req() req: Request, @Res() res: Response, @Body() params : ReplyParams, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinReplyService.reply(req, res, params, member));
    }
    
    @Authorized()
    @CheckApiKey()
    @Post('/update')
    public async updateReply(@Req() req: Request, @Res() res: Response, @Body() params : UpdateReplyParams, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinReplyService.updateReply(req, res, params, member));
    }
    
    @Authorized()
    @CheckApiKey()
    @Post('/delete')
    public async deleteReply(@Req() req: Request, @Res() res: Response, @Body() seqNo : number, @CurrentUser() member : MemberA) {
        return returnForm(await this.luckyDrawWinReplyService.deleteReply(req, res, seqNo, member));
    }

}