import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TetherRanking } from "../entities/tether_ranking";
import { TetherRankingListFilter } from "../services/tehter_ranking";

@Service()
export class TetherRankingModel extends CoreModel<TetherRanking> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TetherRanking);
    }

    public async setFilter(builder: SelectQueryBuilder<TetherRanking> | UpdateQueryBuilder<TetherRanking> | DeleteQueryBuilder<TetherRanking>, filter: TetherRankingListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TetherRanking>, filter: TetherRankingListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}