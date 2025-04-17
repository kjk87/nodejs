import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { NationService } from "../services/nation";


@JsonController('/nation')
export class LuckyDrawController extends CoreController {

    @Inject(()=> NationService)
    private nationService: NationService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.nationService.list());
    }

    @Get()
    public async get(@Req() req: Request, @Res() res: Response, @Param('nation') nation: string) {
        return returnForm(await this.nationService.getOne(nation));
    }
}