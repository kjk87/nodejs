import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { PointMallExchangeService } from "../services/point_mall_exchange";


@JsonController('/pointMall')
export class PartnerController extends CoreController {

    @Inject(()=> PointMallExchangeService)
    private pointMallExchangeService: PointMallExchangeService;

    constructor() {
        super();
    }


    @Authorized()
    @Post('/exchange')
    public async exchange(@Req() req: Request, @Res() res: Response, @BodyParam('point') point: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.pointMallExchangeService.exchange(req, res, point, member));
    }
    
}