import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { DailyTasksService, DailyTasksCreateParams, DailyTasksUpdateParams, DailyTasksListFilter } from "../services/daily_tasks";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";

@JsonController('/dailyTasks')
export class DailyTasksController extends CoreController {

    @Inject(()=> DailyTasksService)
    private dailyTasksService: DailyTasksService;

    constructor() {
        super();
    }

    @Get()
    public async appDailyTasks(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.dailyTasksService.appDailyTasks(req, res, member));
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: DailyTasksCreateParams) {
//         return await this.dailyTasksService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.dailyTasksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: DailyTasksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.dailyTasksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: DailyTasksUpdateParams) {
//         return await this.dailyTasksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.dailyTasksService.delete(req, res, seqNo);
//     }

}