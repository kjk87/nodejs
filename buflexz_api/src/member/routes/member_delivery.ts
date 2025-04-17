import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberService, RefreshKeyParams } from "../services/member";
import { MemberA } from "../entities/member_a";
import { returnForm, sendEmail } from "../../common/services/util";
import { MemberDeliveryService } from "../services/member_delivery";


@Controller('/memberDelivery')
export class MemberDeliveryController extends CoreController {

    @Inject(()=> MemberDeliveryService)
    private memberDeliveryService: MemberDeliveryService;

    constructor() {
        super();
    }
    
    @Authorized()
    @Get()
    public async getByUserKey(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberDeliveryService.getByUserKey(member));
    }
}