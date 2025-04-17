import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { CacheLocksService, CacheLocksCreateParams, CacheLocksUpdateParams, CacheLocksListFilter } from "../services/cache_locks";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/cacheLocks')
export class CacheLocksController extends CoreController {

    @Inject(()=> CacheLocksService)
    private cacheLocksService: CacheLocksService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: CacheLocksCreateParams) {
//         return await this.cacheLocksService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.cacheLocksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: CacheLocksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.cacheLocksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: CacheLocksUpdateParams) {
//         return await this.cacheLocksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.cacheLocksService.delete(req, res, seqNo);
//     }

}