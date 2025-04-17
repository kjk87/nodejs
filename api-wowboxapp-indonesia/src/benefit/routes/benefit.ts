import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { BenefitService } from "../services/benefit";


@JsonController('/benefit')
export class BenefitController extends CoreController {

    @Inject(()=> BenefitService)
    private benefitService: BenefitService;

    constructor() {
        super();
    }

    @Authorized()
    @Get()
    public async categoryList(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.benefitService.get(req, res, member));
    }
}