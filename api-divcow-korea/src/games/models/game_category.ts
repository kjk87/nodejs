import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { Games } from "../entities/games";
import { GamesListFilter } from "../services/games";
import { GameCategory } from "../entities/game_category";
import { GameCategoryListFilter } from "../services/game_category";

@Service()
export class GameCategoryModel extends CoreModel<GameCategory> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, GameCategory);
    }

    public async setFilter(builder: SelectQueryBuilder<GameCategory> | UpdateQueryBuilder<GameCategory> | DeleteQueryBuilder<GameCategory>, filter: GameCategoryListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<GameCategory>, filter: GameCategoryListFilter, entity?: any): Promise<void> {

        builder.addSelect(`(select count(*) from games g where g.category_seq_no = entity.seq_no)`, 'entity_gameCount')

        if(filter) {
            if(filter.joinColumn) {
                this.joinColumn(builder, filter.joinColumn);
            }
        }
    }
}