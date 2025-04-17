import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductCategoryService } from "../services/product_category";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";

@JsonController('/productCategory')
export class ProductCategoryController extends CoreController {

    constructor() {
        super();
    }

    @Inject(()=> ProductCategoryService)
    private productCategoryService: ProductCategoryService;

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.productCategoryService.list());
    }
}