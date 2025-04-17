import { Authorized, Body, BodyParam, CurrentUser, JsonController, Post, Req, Res } from "routing-controllers";
import { Inject } from "typedi";
import { CoreController } from "../../common/core/CoreController";
import { returnForm } from "../../common/services/util";
import { BuffWalletService, ExchangeBuffCoinToPointParams, UpdateCoinParams } from "../services/buff_wallet";
import { Request, Response } from 'express';
import { MemberA } from "../../member/entities/member_a";
import { MemberService } from "../../member/services/member";


// @Authorized()
@JsonController('/buffWallet')
export class BuffWalletController extends CoreController {

    @Inject(()=> BuffWalletService)
    private buffWalletService: BuffWalletService;

    @Inject(()=> MemberService)
    private memberService: MemberService;

    @Authorized()
    @Post('/signUp')
    public async walletSignUp(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffWalletService.walletSignUp(req, res, member));
    }

    @Authorized()
    @Post('/sync')
    public async walletSync(@Req() req: Request, @Res() res: Response, @BodyParam('password') password: string, @CurrentUser() user) {
        return returnForm(await this.buffWalletService.walletSync(req, res, password, user));
    }

    @Authorized()
    @Post('/balance')
    public async walletBalance(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffWalletService.walletBalance(req, res, member));
    }

    @Post('/duplicateUser')
    public async duplicateUser(@Req() req: Request, @Res() res: Response, @BodyParam('email') email: string) {
        return returnForm(await this.buffWalletService.duplicateUser(req, res, email));
    }

    @Authorized()
    @Post('/coinBalance')
    public async buffCoinBalance(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.buffWalletService.buffCoinBalance(req, res, member));
    }

    @Post('/updateCoin')
    public async updateCoin(@Req() req: Request, @Res() res: Response, @BodyParam('userKey') userKey: string, @BodyParam('type') type: string, @BodyParam('isIncrease') isIncrease: boolean) {
        let member:MemberA = await this.memberService.getMember(userKey);
        return returnForm(await this.buffWalletService.updateCoin(type, isIncrease, 1, member));
    }
}