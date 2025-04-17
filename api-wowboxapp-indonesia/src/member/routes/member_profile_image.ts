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
import { MemberProfileImageService } from "../services/member_profile_image";


@Controller('/memberProfileImage')
export class MemberProfileImageServiceController extends CoreController {

    @Inject(()=> MemberProfileImageService)
    private memberProfileImageService: MemberProfileImageService;

    constructor() {
        super();
    }
    
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberProfileImageService.list());
    }
}