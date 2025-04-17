import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { FailedJobsService, FailedJobsCreateParams, FailedJobsUpdateParams, FailedJobsListFilter } from "../services/failed_jobs";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/failedJobs')
export class FailedJobsController extends CoreController {

    @Inject(()=> FailedJobsService)
    private failedJobsService: FailedJobsService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: FailedJobsCreateParams) {
//         return await this.failedJobsService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.failedJobsService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: FailedJobsListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.failedJobsService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: FailedJobsUpdateParams) {
//         return await this.failedJobsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.failedJobsService.delete(req, res, seqNo);
//     }

}