import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductDeliveryService, ProductDeliveryCreateParams, ProductDeliveryUpdateParams, ProductDeliveryListFilter } from "../services/product_delivery";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@Controller('/productDelivery')
export class ProductDeliveryController extends CoreController {

    @Inject(()=> ProductDeliveryService)
    private productDeliveryService: ProductDeliveryService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductDeliveryCreateParams) {
         return returnForm(await this.productDeliveryService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productDeliveryService.get(req, res, seqNo));
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductDeliveryListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
         return returnForm(await this.productDeliveryService.list(req, res, filter, order, paging));
    }

    @Put('/:seqNo(\\d+)')
    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductDeliveryUpdateParams) {
         return returnForm(await this.productDeliveryService.update(req, res, seqNo, params));
    }

    @Delete('/:seqNo(\\d+)')
    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productDeliveryService.delete(req, res, seqNo));
    }

}