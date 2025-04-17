import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { CoinService } from "../services/coin";
import { TokenService } from "../services/token";
import { returnForm } from "../../common/services/util";


@JsonController('/token')
export class TokenController extends CoreController {

    @Inject(()=> TokenService)
    private tokenService: TokenService;

    constructor() {
        super();
    }

    @Get('/vestingList')
    public async getVestingList(@Req() req: Request, @Res() res: Response, @QueryParam('address') address: string) {
        return returnForm(await this.tokenService.getVestingList(address));
    }
    
}