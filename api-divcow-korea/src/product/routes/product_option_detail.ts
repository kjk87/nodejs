import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductOptionDetailService, ProductOptionDetailCreateParams, ProductOptionDetailUpdateParams, ProductOptionDetailListFilter } from "../services/product_option_detail";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/productOptionDetail')
export class ProductOptionDetailController extends CoreController {

    @Inject(()=> ProductOptionDetailService)
    private productOptionDetailService: ProductOptionDetailService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductOptionDetailCreateParams) {
         return returnForm(await this.productOptionDetailService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionDetailService.get(req, res, seqNo));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductOptionDetailListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
         return returnForm(await this.productOptionDetailService.list(req, res, filter, order, paging));
    }

    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductOptionDetailUpdateParams) {
         return returnForm(await this.productOptionDetailService.update(req, res, seqNo, params));
    }

    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productOptionDetailService.delete(req, res, seqNo));
    }

}