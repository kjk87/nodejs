import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxEntryService, LuckyboxEntryCreateParams, LuckyboxEntryUpdateParams, LuckyboxEntryListFilter } from "../services/luckybox_entry";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/luckyboxEntry')
export class LuckyboxEntryController extends CoreController {

    @Inject(()=> LuckyboxEntryService)
    private luckyboxEntryService: LuckyboxEntryService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxEntryCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxEntryService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxEntryService.get(req, res, seqNo, sessionMember));
//    }

//    @Get()
//    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxEntryListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxEntryService.list(req, res, filter, order, paging, sessionMember));
//    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxEntryUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxEntryService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxEntryService.delete(req, res, seqNo, sessionMember));
//    }

}