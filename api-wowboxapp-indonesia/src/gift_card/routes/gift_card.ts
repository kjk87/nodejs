import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { GiftCardService } from "../services/gift_card";


@JsonController('/giftCard')
export class GiftCardController extends CoreController {

    @Inject(()=> GiftCardService)
    private giftCardService: GiftCardService;

    constructor() {
        super();
    }

    @Get('/:seqNo(\\d+)')
    public async getOne(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
        return returnForm(await this.giftCardService.getOne(seqNo));
    }

    @Get('/list/:brandSeqNo(\\d+)')
    public async list(@Req() req: Request, @Res() res: Response, @Param('brandSeqNo') brandSeqNo: number, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[]) {
        return returnForm(await this.giftCardService.list(brandSeqNo, paging, order));
    }
}