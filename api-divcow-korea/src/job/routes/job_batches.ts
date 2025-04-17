import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { JobBatchesService, JobBatchesCreateParams, JobBatchesUpdateParams, JobBatchesListFilter } from "../services/job_batches";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/jobBatches')
export class JobBatchesController extends CoreController {

    @Inject(()=> JobBatchesService)
    private jobBatchesService: JobBatchesService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: JobBatchesCreateParams) {
//         return await this.jobBatchesService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.jobBatchesService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: JobBatchesListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.jobBatchesService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: JobBatchesUpdateParams) {
//         return await this.jobBatchesService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.jobBatchesService.delete(req, res, seqNo);
//     }

}