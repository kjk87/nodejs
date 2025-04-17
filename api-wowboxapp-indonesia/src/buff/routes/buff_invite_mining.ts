import { Authorized, Body, BodyParam, CurrentUser, Get, JsonController, Post, QueryParam, Req, Res } from "routing-controllers";
import { Inject } from "typedi";
import { CoreController } from "../../common/core/CoreController";
import { returnForm } from "../../common/services/util";
import { Request, Response } from 'express';
import { MemberA } from "../../member/entities/member_a";
import { BuffInviteMiningService } from "../services/buff_invite_mining";
import { IPaging } from "../../common/core/CoreModel";


// @Authorized()
@JsonController('/buffInviteMining')
export class BuffWalletController extends CoreController {

    @Inject(()=> BuffInviteMiningService)
    private buffInviteMiningService: BuffInviteMiningService;


    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffInviteMiningService.list(req, res, paging, member));
    }

    @Authorized()
    @Get('/getSumCoin')
    public async getSumCoin(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffInviteMiningService.getSumCoin(req, res, member));
    }
    
    @Authorized()
    @Get('/getCount')
    public async getCount(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffInviteMiningService.getCount(req, res, member));
    }
}