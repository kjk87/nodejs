import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { TelegramUserTasksService, TelegramUserTasksCreateParams, TelegramUserTasksUpdateParams, TelegramUserTasksListFilter } from "../services/telegram_user_tasks";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/telegramUserTasks')
export class TelegramUserTasksController extends CoreController {

    @Inject(()=> TelegramUserTasksService)
    private telegramUserTasksService: TelegramUserTasksService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: TelegramUserTasksCreateParams) {
//         return await this.telegramUserTasksService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserTasksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: TelegramUserTasksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.telegramUserTasksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: TelegramUserTasksUpdateParams) {
//         return await this.telegramUserTasksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserTasksService.delete(req, res, seqNo);
//     }

}