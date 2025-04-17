import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { TetherHistoryService } from "../services/tether_history";

@JsonController('/tetherHistory')
export class TonHistoryController extends CoreController {

    @Inject(()=> TetherHistoryService)
    private tetherHistoryService: TetherHistoryService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: PopupsCreateParams) {
//         return await this.popupsService.create(req, res, params);
//     }

    // @Get()
    // public async get(@Req() req: Request, @Res() res: Response) {
    //     return await this.popupsService.get(req, res);
    // }

    @Authorized()
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() user: TelegramUsers) {
        return await this.tetherHistoryService.list(req, res, paging, user);
    }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: PopupsUpdateParams) {
//         return await this.popupsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.popupsService.delete(req, res, seqNo);
//     }

}