import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { GameRanking } from "../entities/game_ranking";
import { RankingListFilter } from "../services/game_ranking";
import { TelegramUsers } from "../../telegram/entities/telegram_users";

@Service()
export class GameRankingModel extends CoreModel<GameRanking> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, GameRanking);
    }

    public async setFilter(builder: SelectQueryBuilder<GameRanking> | UpdateQueryBuilder<GameRanking> | DeleteQueryBuilder<GameRanking>, filter: RankingListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.games_id) {
                builder.andWhere('games_id = :games_id', filter);
            }
            if(filter.best_score !== undefined) {
                builder.andWhere('best_score > :best_score', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<GameRanking>, filter: RankingListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getMyRanking(games_id: number, score: number, type: string, manager?: EntityManager) {
        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT
                COUNT(*) as _count
            FROM game_ranking
            WHERE
                games_id = ${games_id}
                AND best_score > ${score}
                AND type = '${type}'
        `))[0]._count
    }
}