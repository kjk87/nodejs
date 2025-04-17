import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { LoginParams, MemberService, MobileLoginParams, PlatformLoginParams, RefreshKeyParams, UpdateLotteryParams, WithdrawalCancelParams } from "../services/member";
import { MemberA } from "../entities/member_a";
import { returnForm } from "../../common/services/util";
import { CoreError } from "../../common/core/CoreError";
import { CheckApiKey } from "../../common/services/decorators";
import { E_ACCESS_DENY } from "../../common/services/errorType";


@JsonController('/member')
export class MemberController extends CoreController {

    @Inject(()=> MemberService)
    private memberService: MemberService;

    constructor() {
        super();
    }

    // @CheckApiKey()
    // @Post('/join')
    // public async create(@Req() req: Request, @Res() res: Response, @Body() params: MemberA) {
    //     return returnForm(await this.memberService.create(req, res, params));
    // }
    
    @CheckApiKey()
    @Post('/join2')
    public async join(@Req() req: Request, @Res() res: Response, @Body() params: MemberA) {
        return returnForm(await this.memberService.join(req, res, params));
    }
    
    // @CheckApiKey()
    // @Authorized()
    // @Post('/wowMallJoin')
    // public async wowMallJoin(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
    //     return returnForm(await this.memberService.wowMallJoin(member));
    // }
    
    @CheckApiKey()
    @Authorized()
    @Post('/inputRecommender')
    public async inputRecommender(@Req() req: Request, @Res() res: Response, @BodyParam('recommendeeKey') recommendeeKey: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.inputRecommender(req, res, recommendeeKey, member));
    }

    @CheckApiKey()
    @Get('/checkNickname')
    public async checkNickname(@Req() req: Request, @Res() res: Response, @QueryParam('nickname') nickname: string, @QueryParam('language') language: string) {
        return returnForm(await this.memberService.checkNickname(nickname, language));
    }

    @CheckApiKey()
    @Post('/loginByPlatform')
    public async loginByPlatform(@Req() req: Request, @Res() res: Response, @Body() params:PlatformLoginParams) {
        return returnForm(await this.memberService.loginByPlatform(req, res, params));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/getSession')
    public async getSession(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberService.getSession(req));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/reloadSession')
    public async reloadSession(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberService.reloadSession(req));
    }

    @CheckApiKey()
    @Post('/refreshToken')
    public async refreshToken(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.memberService.refreshToken(req, res));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/updateProfile')
    public async updateProfile(@Req() req: Request, @Res() res: Response, @BodyParam('profile') profile: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.updateProfile(req, res, profile, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/update')
    public async update(@Req() req: Request, @Res() res: Response, @Body() params: MemberA, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.update(req, res, params, member));
    }
    
    @CheckApiKey()
    @Authorized()
    @Post('/updateMobileNumber')
    public async updateMobileNumber(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.updateMobileNumber(req, res, mobileNumber, member));
    }
    
    @CheckApiKey()
    @Authorized()
    @Post('/withdrawalWithVerify')
    public async withdrawalWithVerify(@Req() req: Request, @Res() res: Response, @BodyParam('reason') reason: string, @BodyParam('verifyType') verifyType: string, @BodyParam('otp') otp: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.withdrawalWithVerify(req, res, reason, verifyType, otp, member));
    }

    @CheckApiKey()
    @Post('/withdrawalCancelWithVerify')
    public async withdrawalCancelWithVerify(@Req() req: Request, @Res() res: Response, @BodyParam('userKey') userKey: string, @BodyParam('mobileNumber') mobileNumber: string, @BodyParam('verifyType') verifyType: string, @BodyParam('otp') otp: string) {
        return returnForm(await this.memberService.withdrawalCancelWithVerify(req, res, userKey, mobileNumber, verifyType, otp));
    }
    
    @Authorized()
    @CheckApiKey()
    @Post('/withdrawal')
    public async withdrawal(@Req() req: Request, @Res() res: Response, @BodyParam('reason') reason: string, @BodyParam('authNumber') authNumber: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.withdrawal(req, res, reason, authNumber, member));
    }
    
    @Post('/withdrawalByPlatformKey')
    public async withdrawalByPlatformKey(@Req() req: Request, @Res() res: Response, @BodyParam('reason') reason: string, @BodyParam('platformKey') platformKey: string) {
        return returnForm(await this.memberService.withdrawalByPlatformKey(req, res, reason, platformKey));
    }
    
    @CheckApiKey()
    @Post('/withdrawalCancel')
    public async withdrawalCancel(@Req() req: Request, @Res() res: Response, @Body() params: WithdrawalCancelParams) {
        return returnForm(await this.memberService.withdrawalCancel(req, res, params));
    }
    
    // @Authorized()
    // @Post('/authWalletEmail')
    // public async authWalletEmail(@Req() req: Request, @Res() res: Response, @BodyParam('authNumber') authNumber: string, @BodyParam('authEmail') authEmail:string, @CurrentUser() member:MemberA) {
    //     return returnForm(await this.memberService.authWalletEmail(req, res, member.userKey, authNumber, authEmail));
    // }

    @CheckApiKey()
    @Authorized()
    @Get('/inviteList')
    public async inviteList(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.inviteList(paging, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/makeInviteUrl')
    public async makeInviteUrl(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.makeInviteUrl(req, res, member));
    }

    @CheckApiKey()
    @Authorized()
    @Get('/attendance/check')
    public async checkEnableAttendance(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.checkEnableAttendance(req, res, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/attendance')
    public async attendance(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.attendance(req, res, member));
    }

    @CheckApiKey()
    @Post('/confirmDivc')
    public async confirmDivc(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber: string, @BodyParam('wallet') wallet: string) {
        return returnForm(await this.memberService.confirmDivc(req, res, mobileNumber, wallet));
    }

    @CheckApiKey()
    @Post('/checkJoinedMobile')
    public async checkJoinedMobile(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber: string, @BodyParam('type') type: string) {
        let apiKey = req.headers.api_key;
        if(process.env.API_KEY != apiKey){
            throw new CoreError(E_ACCESS_DENY, 'invaild api key')
        }
        return returnForm(await this.memberService.checkJoinedMobile(req, res, mobileNumber));
    }
    
    @CheckApiKey()
    @Post('/checkJoinedMobileNumber')
    public async checkJoinedMobileNumber(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber: string, @BodyParam('type') type: string) {
        return returnForm(await this.memberService.checkJoinedMobileNumber(req, res, mobileNumber));
    }

    @CheckApiKey()
    @Post('/checkJoinedPlatformKey')
    public async checkJoinedPlatformKey(@Req() req: Request, @Res() res: Response, @BodyParam('platformKey') platformKey: string) {
        return returnForm(await this.memberService.checkJoinedPlatformKey(req, res, platformKey));
    }
    
    @CheckApiKey()
    @Authorized()
    @Get('/getTokenBalance')
    public async getTokenBalance(@Req() req: Request, @Res() res: Response, @QueryParam('tokenName') tokenName: string, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.getTokenBalance(tokenName, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/swapCoin')
    public async swapCoin(@Req() req: Request, @Res() res: Response, @BodyParam('type') type: string, @BodyParam('address') address: string, @BodyParam('amount') amount: number, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.swapCoin(req, res, type, address, amount, member));
    }

    @CheckApiKey()
    @Authorized()
    @Post('/updateLotteryCount')
    public async updateTicket(@Req() req: Request, @Res() res: Response, @Body() params: UpdateLotteryParams, @CurrentUser() member:MemberA) {
        return returnForm(await this.memberService.updateLotteryCount(req, res, params, member));
    }
}