import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { Partner } from "../entities/partner";
import { PartnerService } from "../services/partner";
import { ProfitPartnerFilter, ProfitPartnerService } from "../services/profit_partner";


@JsonController('/profitPartner')
export class PartnerController extends CoreController {

    @Inject(()=> ProfitPartnerService)
    private profitPartnerService: ProfitPartnerService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/getTotalProfit')
    public async getTotalProfit(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.profitPartnerService.getTotalProfit(member));
    }
    
    @Authorized()
    @Get('/getTotalBonusProfit')
    public async getTotalBonusProfit(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.profitPartnerService.getTotalBonusProfit(member));
    }

    @Authorized()
    @Get()
    public async getProfitPartner(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProfitPartnerFilter, @CurrentUser() member:MemberA) {
        return returnForm(await this.profitPartnerService.getProfitPartner(filter, member));
    }
    
    @Authorized()
    @Get('/childList')
    public async childList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ProfitPartnerFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.profitPartnerService.childList(filter, paging, order, member));
    }
}