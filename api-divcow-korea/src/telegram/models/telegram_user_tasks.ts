import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { TelegramUserTasks } from "../entities/telegram_user_tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TelegramUserTasksListFilter } from "../services/telegram_user_tasks";

@Service()
export class TelegramUserTasksModel extends CoreModel<TelegramUserTasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TelegramUserTasks);
    }

    public async setFilter(builder: SelectQueryBuilder<TelegramUserTasks> | UpdateQueryBuilder<TelegramUserTasks> | DeleteQueryBuilder<TelegramUserTasks>, filter: TelegramUserTasksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.task_id) {
                builder.andWhere('task_id = :task_id', filter);
            }
            if(filter.is_submitted) {
                builder.andWhere('is_submitted = :is_submitted', filter);
            }
            if(filter.is_rewarded) {
                builder.andWhere('is_rewarded = :is_rewarded', filter);
            }
            if(filter.submitted_at) {
                builder.andWhere('submitted_at = :submitted_at', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TelegramUserTasks>, filter: TelegramUserTasksListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}