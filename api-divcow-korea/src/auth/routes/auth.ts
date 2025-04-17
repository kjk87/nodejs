import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { AuthService, TelegramUserParams } from "../services/auth";

@JsonController('/auth')
export class AtuhController extends CoreController {

    @Inject(()=> AuthService)
    private authService: AuthService;

    constructor() {
        super();
    }

    @Post('/telegram-user')
    public async telegramUser(@Req() req: Request, @Res() res: Response, @Body() params: TelegramUserParams) {
        return await this.authService.telegramUser(req, res, params);
    }

}