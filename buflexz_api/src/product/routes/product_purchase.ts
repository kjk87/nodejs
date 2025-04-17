import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductImageService } from "../services/product_image";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { ProductPurchaseFilter, ProductPurchaseService } from "../services/product_purchase";
import { ProductPurchase } from "../entities/product_purchase";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";

@JsonController('/productPurchase')
export class ProductPurchaseController extends CoreController {

    constructor() {
        super();
    }

    @Inject(()=> ProductPurchaseService)
    private productPurchaseService: ProductPurchaseService;


    @Authorized()
    @Post()
    public async purchase(@Req() req: Request, @Res() res: Response, @Body() params: ProductPurchase, @CurrentUser() member:MemberA) {
        return returnForm(await this.productPurchaseService.purchase(req, res, params, member));
    }

    @Authorized()
    @Get('/:seqNo(\\d+)')
    public async getOne(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.productPurchaseService.getOne(seqNo, member));
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter:ProductPurchaseFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.productPurchaseService.list(filter, paging, member));
    }
}