import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { XenditService } from "../service/xendit";
import { PaymentParams } from "../../luckybox/services/luckybox_purchase";


@JsonController('/xendit')
export class XenditController extends CoreController {

    @Inject(()=> XenditService)
    private xenditService: XenditService;

    constructor() {
        super();
    }
    
    @Post('/paidCallback')
    public async paidCallback(@Req() req: Request, @Res() res: Response, @Body() params: PaymentParams) {
        return returnForm(await this.xenditService.paidCallback(req, res, params));
    }

    @Post('/refundCallback')
    public async refundCallback(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.xenditService.refundCallback(req, res));
    }

    @Get('/success')
    public async success(@Req() req: Request, @Res() res: Response) {
        return '';
    }

    @Get('/failure')
    public async failure(@Req() req: Request, @Res() res: Response) {
        return '';
    }
}