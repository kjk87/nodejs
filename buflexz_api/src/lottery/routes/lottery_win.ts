import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LotteryWinService, ReceivePrizeParams, WinListFilter } from "../services/lottery_win";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";


@JsonController('/lotteryWin')
export class LotteryWinController extends CoreController {

    @Inject(()=> LotteryWinService)
    private lotteryWinService: LotteryWinService;

    constructor() {
        super();
    }

    //내 당첨 리스트
    @Authorized()
    @Get('/:lotteryRound(\\d+)')
    public async list(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinService.list(req, res, lotteryRound, paging, member));
    }
    
    @Authorized()
    @Get('/myCount/:lotteryRound(\\d+)')
    public async myCount(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinService.myCount(req, res, lotteryRound, member));
    }

    // 전체 당첨 리스트
    @Get('/all/:lotteryRound(\\d+)')
    public async allList(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number, @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.lotteryWinService.all(req, res, lotteryRound, paging));
    }
    
    // 전체 당첨 리스트
    @Get('/count/:lotteryRound(\\d+)')
    public async winnerCount(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number) {
        return returnForm(await this.lotteryWinService.winnerCount(req, res, lotteryRound));
    }

    //당첨금 받기
    @Authorized()
    @Post('/receive/:seqNo(\\d+)')
    public async receive(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @BodyParam('lotteryRound') lotteryRound: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinService.receiveOne(req, res, seqNo, lotteryRound, member));
    }

    //당첨금 전체 받기
    @Authorized()
    @Post('/receiveAll')
    public async receiveAll(@Req() req: Request, @Res() res: Response, @BodyParam('lotteryRound') lotteryRound: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinService.receiveAll(req, res, lotteryRound, member));
    }

    //남은 당첨금 count
    @Authorized()
    @Get('/remainCount')
    public async getRemainCount(@Req() req: Request, @Res() res: Response, @QueryParam('lotteryRound') lotteryRound: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinService.getRemainCount(req, res, lotteryRound, member));
    }
}