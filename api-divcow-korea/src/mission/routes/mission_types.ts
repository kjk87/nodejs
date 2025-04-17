import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { MissionTypesService, MissionTypesCreateParams, MissionTypesUpdateParams, MissionTypesListFilter } from "../services/mission_types";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/missionTypes')
export class MissionTypesController extends CoreController {

    @Inject(()=> MissionTypesService)
    private missionTypesService: MissionTypesService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: MissionTypesCreateParams) {
//         return await this.missionTypesService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.missionTypesService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: MissionTypesListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.missionTypesService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: MissionTypesUpdateParams) {
//         return await this.missionTypesService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.missionTypesService.delete(req, res, seqNo);
//     }

}