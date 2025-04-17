import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { GameRankingModel } from "../models/game_ranking";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { GameRanking, GameRankingJoin } from "../entities/game_ranking";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import moment = require("moment-timezone");
import { Redis } from "../../common/services/redis";
import { GamesModel } from "../../games/models/games";
import { MemberA } from "../../member/entities/member_a";
import { MemberService } from "../../member/services/member";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";
import { HistoryLottery } from "../../history/entities/histroy_lottery";


export interface RankingListFilter extends ListFilter {
    id?: number;
    type?: string;
    telegram_user_id?: number;
    userKey?: string
    games_id?: number;
    best_score?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class GameRankingService extends CoreService {

    @Inject(()=> GameRankingModel)
    private gameRankingModel: GameRankingModel;

    @Inject(()=> GamesModel)
    private gamesModel: GamesModel;

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> MemberService)
    private memberService: MemberService;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    constructor() {
        super();
    }

    @Transaction()
    public async save(req: Request, res: Response, score:number, games_id:number, user: TelegramUsers, manager?: EntityManager) {
        let dateStr = now();
        let today = moment(dateStr).format('YYYY-MM-DD');
        let before = await Redis.getInstance().hGet(user.telegram_id+'_'+games_id);
        let todayRewardCount = await Redis.getInstance().hGet(user.telegram_id+'_'+today);
        if(!todayRewardCount){
            todayRewardCount = 0;
        }
        
        let game = await this.gamesModel.get(games_id);
        if(!game){
            return {success: false,
                message : 'game not found'
            };
        }
        if(game.is_ranking){
            let filter:RankingListFilter = {}
            filter.telegram_user_id = user.id;
            filter.games_id = games_id;
            let ranking = await this.gameRankingModel.getByFilter(filter, undefined, undefined, manager);
            if(!ranking){
                ranking = new GameRanking();
                ranking.type = 'web';
                ranking.telegram_user_id = user.id;
                ranking.games_id = games_id;
                ranking.best_score = score;
                ranking.created_at = dateStr;
                ranking.updated_at = dateStr;
                ranking = await this.gameRankingModel.create(ranking, undefined, manager);
            }else{
                
                if(ranking.best_score < score){
                    ranking.best_score = score;
                    ranking.updated_at = dateStr;
                    ranking = await this.gameRankingModel.update(ranking, undefined, manager);
                }
            }
        }
        
        if(todayRewardCount < 10 && (!before || before < moment(dateStr).format('YYYY-MM-DD'))){
            
            

            let pointHistory = new PointHistoryCreateParams();
            pointHistory.telegram_user_id = user.id;
            pointHistory.type = 'charge';
            pointHistory.subject = 'Participation Reward';
            pointHistory.comment = 'Participation Reward';
            pointHistory.amount = 100;
            await this.pointHistoryService.create(pointHistory, manager);

            user = await this.telegramUsersService.updateBalance(user, 100, manager);
            
            todayRewardCount++;
            await Redis.getInstance().hSet(user.telegram_id+'_'+games_id, dateStr, 1 * 24 * 60 * 60);
            await Redis.getInstance().hSet(user.telegram_id+'_'+today, todayRewardCount, 1 * 24 * 60 * 60);

            return {success: true,
                message : '+100 rewarded',
                balance : user.balance
            };
        }else{
            return {success: true,
                balance : user.balance
            }
        }

    }
    @Transaction()
    public async saveApp(req: Request, res: Response, score:number, games_id:number, member: MemberA, manager?: EntityManager) {
        let dateStr = now();
        
        
        let game = await this.gamesModel.get(games_id);

        if(!game){
            throw new CoreError(ErrorType.E_NOTFOUND);
        }

        if(game.is_ranking){
            let filter:RankingListFilter = {}
            filter.userKey = member.userKey;
            filter.games_id = games_id;
            let ranking = await this.gameRankingModel.getByFilter(filter, undefined, undefined, manager);
            if(!ranking){
                ranking = new GameRanking();
                ranking.type = 'app';
                ranking.userKey = member.userKey;
                ranking.games_id = games_id;
                ranking.best_score = score;
                ranking.created_at = dateStr;
                ranking.updated_at = dateStr;
                ranking = await this.gameRankingModel.create(ranking, undefined, manager);
            }else{
                
                if(ranking.best_score < score){
                    ranking.best_score = score;
                    ranking.updated_at = dateStr;
                    ranking = await this.gameRankingModel.update(ranking, undefined, manager);
                }
            }
        }

        if(score >= game.cut_off_score){
            let today = moment(dateStr).format('YYYY-MM-DD');
            let before = await Redis.getInstance().hGet(member.userKey+'_'+games_id);
            let todayRewardCount = await Redis.getInstance().hGet(member.userKey+'_'+today);
            if(!todayRewardCount){
                todayRewardCount = 0;
            }

            if(todayRewardCount < 10 && (!before || before < moment(dateStr).format('YYYY-MM-DD'))){
                todayRewardCount++;
                await Redis.getInstance().hSet(member.userKey+'_'+games_id, dateStr, 1 * 24 * 60 * 60);
                await Redis.getInstance().hSet(member.userKey+'_'+today, todayRewardCount, 1 * 24 * 60 * 60);

                let historyLottery = new HistoryLottery();
                historyLottery.userKey = member.userKey;
                historyLottery.type = 'charge';
                historyLottery.category = 'game';
                historyLottery.count = 1;
                historyLottery.subject = 'game reward';
                historyLottery.comment = 'game reward';
                historyLottery.regDatetime = now();
                await this.memberService.updateLottery(historyLottery, member, manager);

                return true;
            }
        }

        return false;
    }

    public async ranking(req: Request, res: Response, games_id:number) {
        let filter:RankingListFilter = {}
        filter.games_id = games_id;
        filter.type = 'web';
        filter.best_score = 0;
        filter.joinColumn = [
            {
                joinTable: 'telegram_users'
            }
        ]
        let paging : IPaging = { page: 1, limit: 100 }
        let order: IOrder[] = [
            {
                column: 'best_score',
                dir: 'DESC'
           }
        ]

        return (await this.gameRankingModel.list(filter, order, paging, GameRankingJoin)).list;
    }

    public async rankingApp(req: Request, res: Response, games_id:number) {
        let filter:RankingListFilter = {}
        filter.games_id = games_id;
        filter.type = 'app';
        filter.best_score = 0;
        filter.joinColumn = [
            {
                joinTable: 'memberTotal'
            }
        ]
        let paging : IPaging = { page: 1, limit: 100 }
        let order: IOrder[] = [
            {
                column: 'best_score',
                dir: 'DESC'
            }
        ]

        return (await this.gameRankingModel.list(filter, order, paging, GameRankingJoin)).list;
    }

    public async getMyRanking(req: Request, res: Response, games_id:number, user: TelegramUsers) {
        let filter:RankingListFilter = {}
        filter.games_id = games_id;
        filter.telegram_user_id = user.id;
        let myRanking = await this.gameRankingModel.getByFilter(filter);
        if(myRanking){
            let count = await this.gameRankingModel.getMyRanking(games_id, myRanking.best_score, 'web');
            myRanking.ranking = count + 1
        }

        return myRanking;
    }

    public async getMyAppRanking(req: Request, res: Response, games_id:number, member: MemberA) {
        let filter:RankingListFilter = {}
        filter.games_id = games_id;
        filter.userKey = member.userKey;
        let myRanking = await this.gameRankingModel.getByFilter(filter);
        if(myRanking){
            let count = await this.gameRankingModel.getMyRanking(games_id, myRanking.best_score, 'app');
            myRanking.ranking = count + 1
        }

        return myRanking;
    }

}