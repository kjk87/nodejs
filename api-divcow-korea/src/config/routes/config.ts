import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { ConfigService } from "../services/config";


@JsonController('/config')
export class TermsController extends CoreController {

    @Inject(()=> ConfigService)
    private configService: ConfigService;

    constructor() {
        super();
    }


    @Get('/:code')
    public async get(@Req() req: Request, @Res() res: Response, @Param('code') code:string) {
        return returnForm(await this.configService.get(code));
    }

}