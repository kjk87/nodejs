import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { GamesService } from "../services/games";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { MemberA } from "../../member/entities/member_a";
import { GameCategoryService } from "../services/game_category";
import { returnForm } from "../../common/services/util";

@JsonController('/gameCategory')
export class GameCategoryController extends CoreController {

    @Inject(()=> GameCategoryService)
    private gameCategoryService: GameCategoryService;

    constructor() {
        super();
    }

    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('status') status: string) {
        return returnForm(await this.gameCategoryService.list(req, res, status));
    }


}