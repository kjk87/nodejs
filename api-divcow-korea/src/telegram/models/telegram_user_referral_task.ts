import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { TelegramUserReferralTask } from "../entities/telegram_user_referral_task";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TelegramUserReferralTaskListFilter } from "../services/telegram_user_referral_task";

@Service()
export class TelegramUserReferralTaskModel extends CoreModel<TelegramUserReferralTask> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TelegramUserReferralTask);
    }

    public async setFilter(builder: SelectQueryBuilder<TelegramUserReferralTask> | UpdateQueryBuilder<TelegramUserReferralTask> | DeleteQueryBuilder<TelegramUserReferralTask>, filter: TelegramUserReferralTaskListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.referral_task_id) {
                builder.andWhere('referral_task_id = :referral_task_id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.is_completed) {
                builder.andWhere('is_completed = :is_completed', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TelegramUserReferralTask>, filter: TelegramUserReferralTaskListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}