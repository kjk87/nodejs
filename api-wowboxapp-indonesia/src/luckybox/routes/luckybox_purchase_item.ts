import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { LuckyboxPurchaseItemService, LuckyboxPurchaseItemCreateParams, LuckyboxPurchaseItemUpdateParams, LuckyboxPurchaseItemListFilter, ConfirmLuckyboxPurchaseItemParams, CashBackParams } from "../services/luckybox_purchase_item";
import { returnForm } from "../../common/services/util";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { SQSParams } from "../../common/services/sqs";
import { MemberA } from "../../member/entities/member_a";
import { CheckApiKey } from "../../common/services/decorators";

@Controller('/luckyboxPurchaseItem')
export class LuckyboxPurchaseItemController extends CoreController {

    @Inject(()=> LuckyboxPurchaseItemService)
    private luckyboxPurchaseItemService: LuckyboxPurchaseItemService;

    constructor() {
        super();  
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: SQSParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.create(req, res, params, member));
    }

    @Get('/:seqNo(\\d+)')
    public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.luckyboxPurchaseItemService.get(req, res, seqNo));
    }

    @Authorized()
    @CheckApiKey()
    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxPurchaseItemListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.list(req, res, filter, order, paging));
    }

    @Authorized()
    @CheckApiKey()
    @Get('/notOpenList')
    public async notOpenList(@Req() req: Request, @Res() res: Response, @QueryParam('luckyboxPurchaseSeqNo') luckyboxPurchaseSeqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.notOpenList(req, res, luckyboxPurchaseSeqNo, member));
    }

    @Authorized()
    @CheckApiKey()
    @Post('/updateImpression')
    public async updateImpression(@Req() req: Request, @Res() res: Response, @BodyParam('seqNo') seqNo: number, @BodyParam('impression') impression: string, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.updateImpression(req, res, seqNo, impression, member));
    }

//    @Put('/:seqNo(\\d+)')
//    public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: LuckyboxPurchaseItemUpdateParams, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemService.update(req, res, seqNo, params, sessionMember));
//    }

//    @Delete('/:seqNo(\\d+)')
//    public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() sessionMember: SessionMember) {
//         return returnForm(await this.luckyboxPurchaseItemService.delete(req, res, seqNo, sessionMember));
//    }

    @Authorized()
    @CheckApiKey()
    @Get('/getCountNotOpen')
    public async getCountNotOpenLuckyBoxPurchaseItem(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.getCountNotOpenLuckyBoxPurchaseItem(req, res, member));
    }

    @Authorized()
    @CheckApiKey()
    @Get('/my')
    public async getOpenLuckyBoxPurchaseItemList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: LuckyboxPurchaseItemListFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.my(req, res, filter, paging, member));
    }

    @Authorized()
    @CheckApiKey()
    @Get('/confirm/:seqNo(\\d+)')
    public async confirmLuckyboxPurchaseItem(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.confirmLuckyBoxPurchaseItem(req, res, seqNo, member));
    }

    @Authorized()
    @CheckApiKey()
    @Post('/cashBack/:seqNo(\\d+)')
    public async cashBackLuckyBoxPurchaseItem(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: CashBackParams, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.cashBackLuckyBoxPurchaseItem(req, res, seqNo, params, member));
    }

    @Get('/total')
    public async getTotalLuckyPurchaseItemList(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.luckyboxPurchaseItemService.getTotalLuckyPurchaseItemList(req, res, paging));
    }

}