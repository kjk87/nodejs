import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { SnsReward } from "../entities/sns_reward";
import { SnsRewardFilter } from "../services/sns_reward";

@Service()
export class SnsRewardModel extends CoreModel<SnsReward> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, SnsReward);
    }

    public async setFilter(builder: SelectQueryBuilder<SnsReward> | UpdateQueryBuilder<SnsReward> | DeleteQueryBuilder<SnsReward>, filter: SnsRewardFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<SnsReward>, filter: SnsRewardFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}