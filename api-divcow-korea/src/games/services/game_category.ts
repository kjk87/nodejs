import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { MissionLevelsModel } from "../../mission/models/mission_levels";
import { GamesModel } from "../models/games";
import { GamesJoin } from "../entities/games";
import { GameRankingModel } from "../../ranking/models/game_ranking";
import { MemberA } from "../../member/entities/member_a";
import { GameCategoryModel } from "../models/game_category";
import { GameCategoryJoin } from "../entities/game_category";

export interface GameCategoryListFilter extends ListFilter {
    seqNo?: number;
    status?:string;
    title?: string;
}

@Service()
export class GameCategoryService extends CoreService {

    @Inject(()=> GameCategoryModel)
    private gameCategoryModel: GameCategoryModel;
    
    constructor() {
        super();
    }

    public async list(req: Request, res: Response, status: string){


        let filter : GameCategoryListFilter = {};
        filter.status = 'active';
        filter.joinColumn = [
            {
                joinTable: 'games'
            }
        ]
        let order : IOrder[] = [
            {
                column : 'priority',
                dir : 'ASC',
                table: 'entity'
            },
            {
                column : 'priority',
                dir : 'ASC',
                table: 'games'
            }
        ]

        return await this.gameCategoryModel.all(filter, order, GameCategoryJoin);
    }

}