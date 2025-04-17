import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { GamesService } from "../services/games";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { MemberA } from "../../member/entities/member_a";

@JsonController('/games')
export class GamesController extends CoreController {

    @Inject(()=> GamesService)
    private gamesService: GamesService;

    constructor() {
        super();
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('is_ranking') is_ranking: boolean, @QueryParam('type') type: string) {
        return await this.gamesService.list(req, res, is_ranking, type);
    }
    
    @Get('/listWithMyRanking')
    public async listWithMyRanking(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.gamesService.listWithMyRanking(req, res, user);
    }

    @Get('/listWithMyAppRanking')
    public async listWithMyAppRanking(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return await this.gamesService.listWithMyAppRanking(req, res, member);
    }

}