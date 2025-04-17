import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { JobsService, JobsCreateParams, JobsUpdateParams, JobsListFilter } from "../services/jobs";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/jobs')
export class JobsController extends CoreController {

    @Inject(()=> JobsService)
    private jobsService: JobsService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: JobsCreateParams) {
//         return await this.jobsService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.jobsService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: JobsListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.jobsService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: JobsUpdateParams) {
//         return await this.jobsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.jobsService.delete(req, res, seqNo);
//     }

}