import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { AirDropService } from "../services/air_drop";
import { MemberA } from "../../member/entities/member_a";


@JsonController('/airDrop')
export class AirDropController extends CoreController {

    @Inject(()=> AirDropService)
    private airDropService: AirDropService;

    constructor() {
        super();
    }

    @Authorized()
    @Get()
    public async getDevice(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.airDropService.getAirDrop(member));
    }

    @Authorized()
    @Post('/apply')
    public async apply(@Req() req: Request, @Res() res: Response, @BodyParam('wallet') wallet: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.airDropService.apply(req, res, wallet, member));
    }


}