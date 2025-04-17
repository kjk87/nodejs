import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { LotteryWinnerFilter, LotteryWinnerService } from "../service/lottery_winner";
import { CheckApiKey } from "../../common/services/decorators";


@JsonController('/lotteryWinner')
export class LotteryWinnerController extends CoreController {

    @Inject(()=> LotteryWinnerService)
    private lotteryWinnerService: LotteryWinnerService;

    constructor() {
        super();
    }

    @CheckApiKey()
    @Authorized()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryWinnerService.create(req, res, params, member));
    }

    @Post('/checkRank')
    public async checkRank(@Req() req: Request, @Res() res: Response, @Body() params) {
        return returnForm(await this.lotteryWinnerService.checkRank(params));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LotteryWinnerFilter, @QueryParam('order') order:IOrder[]) {
        return returnForm(await this.lotteryWinnerService.list(filter, order));
    }
}