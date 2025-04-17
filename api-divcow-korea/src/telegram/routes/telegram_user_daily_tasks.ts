import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { TelegramUserDailyTasksService, TelegramUserDailyTasksCreateParams, TelegramUserDailyTasksUpdateParams, TelegramUserDailyTasksListFilter } from "../services/telegram_user_daily_tasks";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/telegramUserDailyTasks')
export class TelegramUserDailyTasksController extends CoreController {

    @Inject(()=> TelegramUserDailyTasksService)
    private telegramUserDailyTasksService: TelegramUserDailyTasksService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: TelegramUserDailyTasksCreateParams) {
//         return await this.telegramUserDailyTasksService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserDailyTasksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: TelegramUserDailyTasksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.telegramUserDailyTasksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: TelegramUserDailyTasksUpdateParams) {
//         return await this.telegramUserDailyTasksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserDailyTasksService.delete(req, res, seqNo);
//     }

}