import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductImageService, ProductImageCreateParams, ProductImageUpdateParams, ProductImageListFilter } from "../services/product_image";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/productImage')
export class ProductImageController extends CoreController {

    @Inject(()=> ProductImageService)
    private productImageService: ProductImageService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductImageCreateParams) {
         return returnForm(await this.productImageService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productImageService.get(req, res, seqNo));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductImageListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
         return returnForm(await this.productImageService.list(req, res, filter, order, paging));
    }

    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductImageUpdateParams) {
         return returnForm(await this.productImageService.update(req, res, seqNo, params));
    }

    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productImageService.delete(req, res, seqNo));
    }

}