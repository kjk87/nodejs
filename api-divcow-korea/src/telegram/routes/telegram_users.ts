import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { TelegramUsersService, TelegramUsersCreateParams, TelegramUsersUpdateParams, TelegramUsersListFilter } from "../services/telegram_users";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TelegramUsers } from "../entities/telegram_users";

@JsonController('/telegramUsers')
export class TelegramUsersController extends CoreController {

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    constructor() {
        super();
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: TelegramUsersListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
        return await this.telegramUsersService.list(req, res, filter, order, paging);
    }

}