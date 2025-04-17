import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductService, ProductCreateParams, ProductUpdateParams, ProductListFilter, firstComeFilter } from "../services/product";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";

@Controller('/product')
export class ProductController extends CoreController {

    @Inject(()=> ProductService)
    private productService: ProductService;

    constructor() {
         super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: ProductCreateParams) {
         return returnForm(await this.productService.create(req, res, params));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
         return returnForm(await this.productService.get(req, res, seqNo));
    }

     @Get('/firstCome')
     public async firstCome(@Req() req: Request, @Res() res: Response, @QueryParams() filter: firstComeFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
          return returnForm(await this.productService.firstCome(req, res, filter, order, paging, member));
     }

     @Get()
     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
          return returnForm(await this.productService.list(req, res, filter, order, paging, member));
     }

     @Get('/random')
     public async random(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProductListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
          return returnForm(await this.productService.random(req, res, filter, order, paging, member));
     }

     @Put('/:seqNo(\\d+)')
     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ProductUpdateParams, @CurrentUser() member: MemberA) {
          return returnForm(await this.productService.update(req, res, seqNo, params, member));
     }

     @Delete('/:seqNo(\\d+)')
     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
          return returnForm(await this.productService.delete(req, res, seqNo));
     }

}