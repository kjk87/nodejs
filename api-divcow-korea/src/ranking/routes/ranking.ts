import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { GameRankingService } from "../services/game_ranking";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { PrizeRankingService } from "../services/prize_ranking";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";
import { TetherRankingService } from "../services/tehter_ranking";

@JsonController('/ranking')
export class RankingController extends CoreController {

    @Inject(()=> GameRankingService)
    private gameRankingService: GameRankingService;
    
    @Inject(()=> PrizeRankingService)
    private prizeRankingService: PrizeRankingService;

    @Inject(()=> TetherRankingService)
    private tetherRankingService: TetherRankingService;

    constructor() {
        super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @BodyParam('score') score: number, @BodyParam('games_id') games_id: number, @CurrentUser() user: TelegramUsers) {
        return await this.gameRankingService.save(req, res, score, games_id, user);
    }
    
    @Authorized()
    @Post('/saveApp')
    public async saveApp(@Req() req: Request, @Res() res: Response, @BodyParam('score') score: number, @BodyParam('games_id') games_id: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.gameRankingService.saveApp(req, res, score, games_id, member));
    }

    @Get()
    public async ranking(@Req() req: Request, @Res() res: Response, @QueryParam('games_id') games_id: number) {
        return await this.gameRankingService.ranking(req, res, games_id);
    }
    
    @Get('/app')
    public async rankingApp(@Req() req: Request, @Res() res: Response, @QueryParam('games_id') games_id: number) {
        return await this.gameRankingService.rankingApp(req, res, games_id);
    }
    
    @Get('/prize')
    public async prizeRanking(@Req() req: Request, @Res() res: Response) {
        return await this.prizeRankingService.ranking(req, res);
    }
    @Get('/tether')
    public async tetherRanking(@Req() req: Request, @Res() res: Response) {
        return await this.tetherRankingService.ranking(req, res);
    }

    @Authorized()
    @Get('/my')
    public async getMyRanking(@Req() req: Request, @Res() res: Response, @QueryParam('games_id') games_id: number, @CurrentUser() user: TelegramUsers) {
        return await this.gameRankingService.getMyRanking(req, res, games_id, user);
    }

    @Authorized()
    @Get('/myApp')
    public async getMyAppRanking(@Req() req: Request, @Res() res: Response, @QueryParam('games_id') games_id: number, @CurrentUser() member: MemberA) {
        return returnForm(await this.gameRankingService.getMyAppRanking(req, res, games_id, member));
    }
}