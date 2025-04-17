import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductOptionItemService, ProductOptionItemCreateParams, ProductOptionItemUpdateParams, ProductOptionItemListFilter } from "../services/product_option_item";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/productOptionItem')
export class ProductOptionItemController extends CoreController {

    @Inject(()=> ProductOptionItemService)
    private productOptionItemService: ProductOptionItemService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductOptionItemCreateParams) {
         return returnForm(await this.productOptionItemService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionItemService.get(req, res, seqNo));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductOptionItemListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
         return returnForm(await this.productOptionItemService.list(req, res, filter, order, paging));
    }

    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductOptionItemUpdateParams) {
         return returnForm(await this.productOptionItemService.update(req, res, seqNo, params));
    }

    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionItemService.delete(req, res, seqNo));
    }

}