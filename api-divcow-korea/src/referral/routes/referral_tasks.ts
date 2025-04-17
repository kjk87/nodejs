import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ReferralTasksService, ReferralTasksCreateParams, ReferralTasksUpdateParams, ReferralTasksListFilter } from "../services/referral_tasks";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/referralTasks')
export class ReferralTasksController extends CoreController {

    @Inject(()=> ReferralTasksService)
    private referralTasksService: ReferralTasksService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: ReferralTasksCreateParams) {
//         return await this.referralTasksService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.referralTasksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ReferralTasksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.referralTasksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ReferralTasksUpdateParams) {
//         return await this.referralTasksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.referralTasksService.delete(req, res, seqNo);
//     }

}