import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { PointHistoryService, PointHistoryCreateParams, PointHistoryUpdateParams, PointHistoryListFilter } from "../services/point_history";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";

@JsonController('/pointHistory')
export class PointHistoryController extends CoreController {

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    constructor() {
        super();
    }

    @Authorized()
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() user: TelegramUsers) {
        return await this.pointHistoryService.list(req, res, paging, user);
    }

}