import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { LoginParams, MemberService, PlatformLoginParams, RefreshKeyParams } from "../services/member";
import { MemberA } from "../entities/member_a";
import { returnForm, sendEmail } from "../../common/services/util";


@JsonController('/member')
export class MemberController extends CoreController {

    @Inject(()=> MemberService)
    private memberService: MemberService;

    constructor() {
        super();
    }

    @Post('/join')
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: MemberA) {
        return returnForm(await this.memberService.create(req, res, params));
    }

    @Get('/checkNickname')
    public async checkNickname(@Req() req: Request, @Res() res: Response, @QueryParam('nickname') nickname: string, @QueryParam('language') language: string) {
        return returnForm(await this.memberService.checkNickname(nickname, language));
    }

    @Post('/loginByPlatform')
    public async loginByPlatform(@Req() req: Request, @Res() res: Response, @Body() params:PlatformLoginParams) {
        return returnForm(await this.memberService.loginByPlatform(req, res, params));
    }

    @Post('/login')
    public async login(@Req() req: Request, @Res() res: Response, @Body() params:LoginParams) {
        return returnForm(await this.memberService.loginByUserKey(req, res, params));
    }

    @Authorized()
    @Post('/getSession')
    public async getSession(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberService.getSession(req));
    }

    @Authorized()
    @Post('/reloadSession')
    public async reloadSession(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberService.reloadSession(req));
    }

    @Post('/refreshToken')
    public async refreshToken(@Req() req: Request, @Res() res: Response, @Body() params: RefreshKeyParams) {
        return returnForm(await this.memberService.refreshToken(req, res, params));
    }

    @Authorized()
    @Post('/exchangePointToBall')
    public async exchangePointToBall(@Req() req: Request, @Res() res: Response, @BodyParam('ball') ball: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.exchangePointToBall(req, res, ball, member));
    }

    @Authorized()
    @Post('/updateProfile')
    public async updateProfile(@Req() req: Request, @Res() res: Response, @BodyParam('profile') profile: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.updateProfile(req, res, profile, member));
    }

    @Authorized()
    @Post('/update')
    public async update(@Req() req: Request, @Res() res: Response, @Body() params: MemberA, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.update(req, res, params, member));
    }

    @Authorized()
    @Post('/withdrawal')
    public async withdrawal(@Req() req: Request, @Res() res: Response, @BodyParam('reason') reason: string, @BodyParam('authNumber') authNumber: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.withdrawal(req, res, reason, authNumber, member));
    }
    
    @Post('/withdrawalCancel')
    public async withdrawalCancel(@Req() req: Request, @Res() res: Response, @BodyParam('userKey') userKey: string, @BodyParam('authNumber') authNumber: string) {
        return returnForm(await this.memberService.withdrawalCancel(req, res, userKey, authNumber));
    }
    
    @Authorized()
    @Post('/authWalletEmail')
    public async authWalletEmail(@Req() req: Request, @Res() res: Response, @BodyParam('authNumber') authNumber: string, @BodyParam('authEmail') authEmail:string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.authWalletEmail(req, res, member.userKey, authNumber, authEmail));
    }

    @Post('/sendEmailForAuth')
    public async sendEmailForAuth(@Req() req: Request, @Res() res: Response, @BodyParam('type') type: string, @BodyParam('email') email: string, @BodyParam('language') language: string) {
        return returnForm(await this.memberService.sendEmailForAuth(type, email, language));
    }

    @Authorized()
    @Post('/updateMarketingReceiving')
    public async updateMarketingReciving(@Req() req: Request, @Res() res: Response, @BodyParam('marketingReceiving') marketingReceiving:boolean, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.updateMarketingReciving(req, res, marketingReceiving, member));
    }
    
    @Authorized()
    @Get('/inviteList')
    public async inviteList(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.inviteList(paging, member));
    }

    @Authorized()
    @Post('/makeInviteUrl')
    public async makeInviteUrl(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.makeInviteUrl(req, res, member));
    }

    @Authorized()
    @Post('/attendance')
    public async attendance(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.attendance(req, res, member));
    }
}