import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductService, ProductCreateParams, ProductUpdateParams, ProductListFilter } from "../services/product";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";

//임시 sessionUserClass
export class SessionUser {
    public seqNo: number;
    public name: string;
    public status: Status;

}

@JsonController('/product')
export class ProductController extends CoreController {

    @Inject(()=> ProductService)
    private productService: ProductService;

    constructor() {
        super();
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Param('seqNo') seqNo: number) {
        return returnForm(await this.productService.get(seqNo));
    }

    @Get('/list')
    public async list(@QueryParams() filter: ProductListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
        return returnForm(await this.productService.list(filter, order, paging));
    }

}