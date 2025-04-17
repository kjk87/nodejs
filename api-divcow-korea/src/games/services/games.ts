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

export interface GamesListFilter extends ListFilter {
    id?: number;
    type?:string;
    status?:string;
    name?: string;
    image?: string;
    banner_image?: string;
    url?: string;
    priority?:number;
    is_ranking?:boolean;
}

@Service()
export class GamesService extends CoreService {

    @Inject(()=> GamesModel)
    private gamesModel: GamesModel;

    @Inject(()=> GameRankingModel)
    private gameRankingModel: GameRankingModel;
    
    constructor() {
        super();
    }

    public async list(req: Request, res: Response, is_ranking: boolean, type:string){
        if(!type){
            type = 'web';
        }

        let filter : GamesListFilter = {};
        filter.type = type;
        filter.status = 'active';
        filter.is_ranking = is_ranking;
        let order : IOrder[] = [
            {
                column : 'priority',
                dir : 'ASC'
            }
        ]

        return (await this.gamesModel.all(filter, order)).list;
    }
    
    public async listWithMyRanking(req: Request, res: Response, user: TelegramUsers){

        let filter : GamesListFilter = {};
        filter.status = 'active';
        filter.is_ranking = true;
        filter.joinColumn = [
            {
                joinTable: 'ranking',
                joinCondition : `ranking.telegram_user_id = ${user.id}`
            }
        ]
        let order : IOrder[] = [
            {
                column : 'priority',
                dir : 'ASC'
            }
        ]

        let list:GamesJoin[] = (await this.gamesModel.all(filter, order, GamesJoin)).list;
        for(let game of list){
            if(game.ranking){
                if(game.ranking.best_score > 0){
                    let count = await this.gameRankingModel.getMyRanking(game.id, game.ranking.best_score, 'web');
                    game.ranking.ranking = count + 1
                }else{
                    game.ranking = null;
                }
                
            }
        }

        return list;
    }
    
    public async listWithMyAppRanking(req: Request, res: Response, member: MemberA){

        let userKey = null;
        if(member){
            userKey = member.userKey;
        }
        let filter : GamesListFilter = {};
        filter.status = 'active';
        filter.is_ranking = true;
        filter.joinColumn = [
            {
                joinTable: 'ranking',
                joinCondition : `ranking.user_key = '${userKey}'`
            }
        ]
        let order : IOrder[] = [
            {
                column : 'priority',
                dir : 'ASC'
            }
        ]

        let list:GamesJoin[] = (await this.gamesModel.all(filter, order, GamesJoin)).list;
        for(let game of list){
            if(game.ranking){
                if(game.ranking.best_score > 0){
                    let count = await this.gameRankingModel.getMyRanking(game.id, game.ranking.best_score, 'app');
                    game.ranking.ranking = count + 1
                }else{
                    game.ranking = null;
                }
                
            }
        }

        return list;
    }

}