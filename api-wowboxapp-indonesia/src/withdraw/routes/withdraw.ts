import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { WithdrawCreateParams, WithdrawService } from "../services/withdraw";


@JsonController('/withdraw')
export class WithdrawController extends CoreController {

    @Inject(()=> WithdrawService)
    private withdrawService: WithdrawService;

    constructor() {
        super();
    }


    @Authorized()
    @Post()
    public async reward(@Req() req: Request, @Res() res: Response, @Body() params: WithdrawCreateParams, @CurrentUser() member:MemberA) {
        return returnForm(await this.withdrawService.create(req, res, params, member));
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.withdrawService.list(req, res, paging, member));
    }
}