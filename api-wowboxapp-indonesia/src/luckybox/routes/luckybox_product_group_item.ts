import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxProductGroupItemService, LuckyboxProductGroupItemCreateParams, LuckyboxProductGroupItemUpdateParams, LuckyboxProductGroupItemListFilter } from "../services/luckybox_product_group_item";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";

@Controller('/luckyboxProductGroupItem')
export class LuckyboxProductGroupItemController extends CoreController {

    @Inject(()=> LuckyboxProductGroupItemService)
    private luckyboxProductGroupItemService: LuckyboxProductGroupItemService;

    constructor() {
        super();
    }

//    @Post()
//    public async create(@Req() req: Request, @Res() res: Response, @Body() params: LuckyboxProductGroupItemCreateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxProductGroupItemService.create(req, res, params, sessionMember));
//    }

//    @Get('/:seqNo(\\d+)')
//    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxProductGroupItemService.get(req, res, seqNo, sessionMember));
//    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxProductGroupItemListFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxProductGroupItemService.list(req, res, filter, paging));
    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxProductGroupItemUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxProductGroupItemService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxProductGroupItemService.delete(req, res, seqNo, sessionMember));
//    }

}