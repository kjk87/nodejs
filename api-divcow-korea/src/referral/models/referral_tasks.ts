import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ReferralTasks } from "../entities/referral_tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { ReferralTasksListFilter } from "../services/referral_tasks";

@Service()
export class ReferralTasksModel extends CoreModel<ReferralTasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, ReferralTasks);
    }

    public async setFilter(builder: SelectQueryBuilder<ReferralTasks> | UpdateQueryBuilder<ReferralTasks> | DeleteQueryBuilder<ReferralTasks>, filter: ReferralTasksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.number_of_referrals) {
                builder.andWhere('number_of_referrals = :number_of_referrals', filter);
            }
            if(filter.reward) {
                builder.andWhere('reward = :reward', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_referral_task.telegram_user_id = :telegram_user_id', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ReferralTasks>, filter: ReferralTasksListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}