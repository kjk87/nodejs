import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxService, LuckyboxCreateParams, LuckyboxUpdateParams, LuckyboxListFilter } from "../services/luckybox";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/luckybox')
export class LuckyboxController extends CoreController {

    @Inject(()=> LuckyboxService)
    private luckyboxService: LuckyboxService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxService.get(req, res, seqNo, sessionMember));
//    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.luckyboxService.list(req, res, filter, order, paging));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.luckyboxService.get(req, res, seqNo));
    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxService.delete(req, res, seqNo, sessionMember));
//    }



}