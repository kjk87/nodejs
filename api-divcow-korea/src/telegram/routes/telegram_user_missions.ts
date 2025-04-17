import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { TelegramUserMissionsService, TelegramUserMissionsCreateParams, TelegramUserMissionsUpdateParams, TelegramUserMissionsListFilter } from "../services/telegram_user_missions";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/telegramUserMissions')
export class TelegramUserMissionsController extends CoreController {

    @Inject(()=> TelegramUserMissionsService)
    private telegramUserMissionsService: TelegramUserMissionsService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: TelegramUserMissionsCreateParams) {
//         return await this.telegramUserMissionsService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserMissionsService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: TelegramUserMissionsListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.telegramUserMissionsService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: TelegramUserMissionsUpdateParams) {
//         return await this.telegramUserMissionsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserMissionsService.delete(req, res, seqNo);
//     }

}