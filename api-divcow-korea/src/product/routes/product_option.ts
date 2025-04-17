import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductOptionService, ProductOptionCreateParams, ProductOptionUpdateParams, ProductOptionListFilter } from "../services/product_option";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/productOption')
export class ProductOptionController extends CoreController {

    @Inject(()=> ProductOptionService)
    private productOptionService: ProductOptionService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductOptionCreateParams) {
         return returnForm(await this.productOptionService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionService.get(req, res, seqNo));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductOptionListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
         return returnForm(await this.productOptionService.list(req, res, filter, order, paging));
    }

    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductOptionUpdateParams) {
         return returnForm(await this.productOptionService.update(req, res, seqNo, params));
    }

    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionService.delete(req, res, seqNo));
    }

}