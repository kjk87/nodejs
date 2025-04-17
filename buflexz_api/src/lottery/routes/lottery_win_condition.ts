import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LotteryWinService, ReceivePrizeParams, WinListFilter } from "../services/lottery_win";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { LotteryWinConditionService } from "../services/lottery_win_condition";


@JsonController('/lotteryWinCondition')
export class LotteryWinConditionController extends CoreController {

    @Inject(()=> LotteryWinConditionService)
    private lotteryWinConditionService: LotteryWinConditionService;

    constructor() {
        super();
    }

    @Get('/:lotteryRound(\\d+)')
    public async list(@Req() req: Request, @Res() res: Response, @Param('lotteryRound') lotteryRound: number) {
        return returnForm(await this.lotteryWinConditionService.getCondition(req, res, lotteryRound));
    }


}