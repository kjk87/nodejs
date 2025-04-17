import { MemberA } from './../../member/entities/member_a';
import { BodyParam, Controller, CurrentUser, Get, Param, Post, QueryParam, Req, Res, Session } from "routing-controllers";
import { CoreController } from "../core/CoreController";
import { Request, Response } from 'express';
import { returnForm, sendEmail, wordFilter } from "../services/util";
import { Redis } from "../services/redis";
import { LotteryJoinCreateParams, LotteryJoinService } from "../../lottery/services/lottery_join";
import { Inject } from "typedi";
import { getSession } from "../services/session";
import { LotteryJoinType } from '../services/type';
import { LoginParams, MemberService, PlatformLoginParams } from '../../member/services/member';

@Controller('/common')
export class CommonController extends CoreController {

    @Inject(()=> LotteryJoinService)
    private lotteryJoinService: LotteryJoinService;

    @Inject(()=> MemberService)
    private memberService: MemberService;

    @Get('/health')
    public async health() {
        return true;
    }

    @Get('/address')
    public async postCode(@Req() req: Request, @Res() res: Response) {

        res.render('address');

        throw false;
    }

    @Get('/withdrawal')
    public async withdrawal(@Req() req: Request, @Res() res: Response) {
        res.locals.authUrl = 'https://stg-api.buflexz.com/member/sendEmailForAuth';
        res.locals.reqUrl = 'sendEmailWithdrawalForOuter';
        res.render('withdrawal');

        throw false;
    }
    
    @Post('/sendEmailWithdrawalForOuter')
    public async sendEmail(@Req() req: Request, @Res() res: Response, @BodyParam('joinPlatform') joinPlatform:string, @BodyParam('platformEmail') platformEmail:string, @BodyParam('authNumber') authNumber:string) {

        var contents = `<b><회원탈퇴 요청합니다.</b><br>가입 플랫폼 : ${joinPlatform}<br>가입 이메일 : ${platformEmail}`;

        sendEmail('cs@buflexz.com', 'no_reply@buflexz.com', '회원탈퇴 요청메일입니다.', contents);

        return true;
    }

    @Get('/loginTest')
    public async loginTest(@Req() req: Request, @Res() res: Response) {

        var params = new LoginParams();
        params.device = 'f43ba4bd-3a4c-3d0d-ae8f-decea948a38c'
        params.userKey = 'ajshDXpYvT'
        return await this.memberService.loginByUserKey(req, res, params);
    }

    @Get('/platfomrLoginTest')
    public async platfomrLoginTest(@Req() req: Request, @Res() res: Response) {

        var params = new PlatformLoginParams();
        params.device = 'f43ba4bd-3a4c-3d0d-ae8f-decea948a38c'
        params.platformKey = '107301616068973285438'
        return await this.memberService.loginByPlatform(req, res, params);
    }

    @Get('/getInviteInfo/:userKey')
    public async getInviteInfo(@Req() req: Request, @Res() res: Response, @Param('userKey') userKey:string) {
        return returnForm(await this.memberService.getInviteInfo(userKey));
    }
}