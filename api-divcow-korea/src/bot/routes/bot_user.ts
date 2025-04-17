import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { BotUserService } from "../services/bot_user";

@JsonController('/botUser')
export class CacheController extends CoreController {

    @Inject(()=> BotUserService)
    private botUserService: BotUserService;

    constructor() {
        super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @BodyParam('telegram_id') telegram_id: number) {
        return await this.botUserService.create(req, res, telegram_id);
    }


}