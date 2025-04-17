import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { TelegramUserReferralTaskService, TelegramUserReferralTaskCreateParams, TelegramUserReferralTaskUpdateParams, TelegramUserReferralTaskListFilter } from "../services/telegram_user_referral_task";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/telegramUserReferralTask')
export class TelegramUserReferralTaskController extends CoreController {

    @Inject(()=> TelegramUserReferralTaskService)
    private telegramUserReferralTaskService: TelegramUserReferralTaskService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: TelegramUserReferralTaskCreateParams) {
//         return await this.telegramUserReferralTaskService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserReferralTaskService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: TelegramUserReferralTaskListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.telegramUserReferralTaskService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: TelegramUserReferralTaskUpdateParams) {
//         return await this.telegramUserReferralTaskService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.telegramUserReferralTaskService.delete(req, res, seqNo);
//     }

}