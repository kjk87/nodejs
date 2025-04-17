import { Get, QueryParams, Req, Res, JsonController, Param, Post, CurrentUser, Authorized } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LotteryService, LotteryRoundFilter } from "../services/lottery";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";

@JsonController('/lottery')
export class LotteryController extends CoreController {

    @Inject(()=> LotteryService)
    private lotteryService: LotteryService;

    constructor() {
        super();
    }

    //진행중 로또 가져오기
    @Get()
    public async latest(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.lotteryService.latest());
    }

    //라운드로 로또정보 가져오기
    @Get('/:lotteryRound(\\d+)')
    public async round(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number) {
        return returnForm(await this.lotteryService.round(req, res, lotteryRound));
    }

    //회차 리스트
    @Get('/roundList')
    public async roundList(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.lotteryService.roundList(req, res));
    }

}