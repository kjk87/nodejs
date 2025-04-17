import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { VoucherService } from "../service/voucher";


@JsonController('/voucher')
export class VourcherController extends CoreController {

    @Inject(()=> VoucherService)
    private voucherService: VoucherService;

    constructor() {
        super();
    }

    @Post('/order')
    public async order(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.voucherService.order());
    }
}