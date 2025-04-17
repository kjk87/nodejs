import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { MissionLevelsService, MissionLevelsCreateParams, MissionLevelsUpdateParams, MissionLevelsListFilter } from "../services/mission_levels";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/missionLevels')
export class MissionLevelsController extends CoreController {

    @Inject(()=> MissionLevelsService)
    private missionLevelsService: MissionLevelsService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: MissionLevelsCreateParams) {
//         return await this.missionLevelsService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.missionLevelsService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: MissionLevelsListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.missionLevelsService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: MissionLevelsUpdateParams) {
//         return await this.missionLevelsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.missionLevelsService.delete(req, res, seqNo);
//     }

}