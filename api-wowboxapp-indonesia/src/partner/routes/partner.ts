import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { Partner } from "../entities/partner";
import { PartnerFilter, PartnerService } from "../services/partner";


@JsonController('/partner')
export class PartnerController extends CoreController {

    @Inject(()=> PartnerService)
    private partnerService: PartnerService;

    constructor() {
        super();
    }

    @Authorized()
    @Post()
    public async request(@Req() req: Request, @Res() res: Response, @Body() params: Partner, @CurrentUser() member:MemberA) {
        return returnForm(await this.partnerService.request(req, res, params, member));
    }

    @Authorized()
    @Post('/resendEmail')
    public async resendEmail(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.partnerService.resendEmail(req, res, member));
    }

    @Authorized()
    @Get()
    public async getOne(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.partnerService.getOne(member.userKey));
    }

    @Authorized()
    @Get('/childList')
    public async childList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: PartnerFilter, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.partnerService.childList(filter, paging, member));
    }
    
    @Authorized()
    @Get('/childCount')
    public async childCount(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.partnerService.childCount(member));
    }
    
}