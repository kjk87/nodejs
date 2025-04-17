import { MemberA } from './../../member/entities/member_a';
import { BodyParam, Controller, CurrentUser, Get, Param, Post, QueryParam, Req, Res, Session } from "routing-controllers";
import { CoreController } from "../core/CoreController";
import { Request, Response } from 'express';
import { encrypt, returnForm, sendEmail, wordFilter } from "../services/util";
import { Redis } from "../services/redis";
import { LotteryJoinCreateParams, LotteryJoinService } from "../../lottery/services/lottery_join";
import { Inject } from "typedi";
import { LoginParams, MemberService, PlatformLoginParams } from '../../member/services/member';
import { _axios } from '../services/axios';
import { CoinService } from '../../coin/services/coin';

@Controller('/common')
export class CommonController extends CoreController {

    @Inject(()=> LotteryJoinService)
    private lotteryJoinService: LotteryJoinService;

    @Inject(()=> MemberService)
    private memberService: MemberService;
    
    @Inject(()=> CoinService)
    private coinService: CoinService;

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

        sendEmail('cs@wowboxapp.com', 'no_reply@wowboxapp.com', '회원탈퇴 요청메일입니다.', contents);

        return true;
    }

    @Get('/getInviteInfo/:userKey')
    public async getInviteInfo(@Req() req: Request, @Res() res: Response, @Param('userKey') userKey:string) {
        return returnForm(await this.memberService.getInviteInfo(userKey));
    }

    @Get('/send')
    public async send(@Req() req: Request, @Res() res: Response) {
        res.locals.reqUrl = 'sendWhatsappTest';
        res.render('send');

        throw false;
    }

    @Post('/sendWhatsappTest')
    public async sendWhatsappTest(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber:string) {
        return await this.memberService.sendWhatsappTest(req, res, mobileNumber);
    }

    @Post('/encrypt')
    public async encrypt(@Req() req: Request, @Res() res: Response, @BodyParam('mobileNumber') mobileNumber:string) {
        return encrypt(mobileNumber);
    }
    @Post('/sendDivc')
    public async sendDivc(@Req() req: Request, @Res() res: Response, @BodyParam('wallet') wallet:string, @BodyParam('amount') amount:string) {
        return await this.coinService.sendDivc(req, res, wallet, amount)
    }
}