import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController, Controller } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { MemberService, RefreshKeyParams } from "../services/member";
import { MemberA } from "../entities/member_a";
import { returnForm, sendEmail } from "../../common/services/util";


@Controller('/profile')
export class ProfileController extends CoreController {

    @Inject(()=> MemberService)
    private memberService: MemberService;

    constructor() {
        super();
    }
    
    @Get('/:userKey')
    public async profile(@Req() req: Request, @Res() res: Response, @Param('userKey') userKey:string) {
        if(!userKey || userKey == 'null'){
            return null;
        }
        let profile = await this.memberService.getProfile(userKey);
        throw res.redirect(profile);
    }
}