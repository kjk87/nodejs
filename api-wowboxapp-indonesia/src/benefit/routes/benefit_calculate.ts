import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { BenefitService } from "../services/benefit";
import { BenefitCalculateFilter, BenefitCalculateService } from "../services/benefit_calculate";


@JsonController('/benefitCalculate')
export class BenefitCalculateController extends CoreController {

    @Inject(()=> BenefitCalculateService)
    private benefitCalculateService: BenefitCalculateService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/list')
    public async categoryList(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging,  @QueryParams() filter : BenefitCalculateFilter, @CurrentUser() member:MemberA) {
        return returnForm(await this.benefitCalculateService.list(req, res, paging, filter, member));
    }
}