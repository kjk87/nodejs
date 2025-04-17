import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { PrizeRanking } from "../entities/prize_ranking";
import { PrizeRankingListFilter } from "../services/prize_ranking";

@Service()
export class PrizeRankingModel extends CoreModel<PrizeRanking> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, PrizeRanking);
    }

    public async setFilter(builder: SelectQueryBuilder<PrizeRanking> | UpdateQueryBuilder<PrizeRanking> | DeleteQueryBuilder<PrizeRanking>, filter: PrizeRankingListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<PrizeRanking>, filter: PrizeRankingListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}