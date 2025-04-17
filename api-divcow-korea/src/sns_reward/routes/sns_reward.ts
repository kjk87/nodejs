import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { SnsRewardService } from "../services/sns_reward";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { CheckApiKey } from "../../common/services/decorators";

@JsonController('/snsReward')
export class SnsRewardController extends CoreController {

    @Inject(()=> SnsRewardService)
    private snsRewardService: SnsRewardService;

    constructor() {
        super();
    }

    @CheckApiKey()
    @Authorized()
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.snsRewardService.get(req, res, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post()
    public async save(@Req() req: Request, @Res() res: Response, @BodyParam('type') type:string, @CurrentUser() member:MemberA) {
        return returnForm(await this.snsRewardService.save(req, res, type, member));
    }

}