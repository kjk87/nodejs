import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LotteryJoinService, LotteryJoinCreateParams, LotteryJoinUpdateParams, LotteryJoinTestCreateParams, LotteryJoinListFilter } from "../services/lottery_join";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { LotteryJoinModel } from "../models/lottery_join";
import { Lottery } from "../entities/lottery";
import { LotteryService } from "../services/lottery";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { LatestCountFilter, LotteryJoinUserService } from "../services/lottery_join_user";

@Authorized()
@JsonController('/lotteryJoin')
export class LotteryJoinController extends CoreController {

    @Inject(()=> LotteryJoinService)
    private lotteryJoinService: LotteryJoinService;

    @Inject(()=> LotteryJoinUserService)
    private lotteryJoinUserService: LotteryJoinUserService;

    constructor() {
        super();
    }

    //로또 응모
    @Post()
    async create(@Req() req: Request, @Res() res: Response, @Body() params: LotteryJoinCreateParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryJoinService.create(req, res, params, member));
    }

    //내 응모 리스트
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() params: LotteryJoinListFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryJoinUserService.list(req, res, params, member, paging));
    }
    
    //내 응모 리스트
    @Get('/count')
    public async getJoinCount(@Req() req: Request, @Res() res: Response, @QueryParams() params: LatestCountFilter, @CurrentUser() member: MemberA) {
        return returnForm(await this.lotteryJoinUserService.latestJoinCount(req, res, params, member));
    }

}