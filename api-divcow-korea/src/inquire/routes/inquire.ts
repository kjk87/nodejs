import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { InquireService } from "../service/inquire";
import { Inquire } from "../entities/inquire";


@JsonController('/inquire')
export class FaqController extends CoreController {

    @Inject(()=> InquireService)
    private inquireService: InquireService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.inquireService.list(paging, member));
    }

    @Authorized()
    @Post()
    public async inquire(@Req() req: Request, @Res() res: Response, @Body() params:Inquire, @CurrentUser() member:MemberA) {
        return returnForm(await this.inquireService.inquire(req, res, params, member));
    }
}