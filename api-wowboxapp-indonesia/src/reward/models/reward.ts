import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Reward } from "../entities/reward";
import { RewardFilter } from "../services/reward";

@Service()
export class RewardModel extends CoreModel<Reward> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Reward);
    }

    public async setFilter(builder: SelectQueryBuilder<Reward> | UpdateQueryBuilder<Reward> | DeleteQueryBuilder<Reward>, filter: RewardFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.depth) {
                builder.andWhere('depth = :depth', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Reward>, filter: RewardFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}