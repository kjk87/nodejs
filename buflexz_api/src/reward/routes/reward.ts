import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { RewardService } from "../services/reward";


@JsonController('/reward')
export class RewardController extends CoreController {

    @Inject(()=> RewardService)
    private rewardService: RewardService;

    constructor() {
        super();
    }


    @Authorized()
    @Post()
    public async reward(@Req() req: Request, @Res() res: Response, @BodyParam('depth') depth:number, @CurrentUser() member:MemberA) {
        return returnForm(await this.rewardService.reward(req, res, depth, member));
    }
}