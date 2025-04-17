import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { TelegramUserDailyTasks } from "../entities/telegram_user_daily_tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TelegramUserDailyTasksListFilter } from "../services/telegram_user_daily_tasks";

@Service()
export class TelegramUserDailyTasksModel extends CoreModel<TelegramUserDailyTasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TelegramUserDailyTasks);
    }

    public async setFilter(builder: SelectQueryBuilder<TelegramUserDailyTasks> | UpdateQueryBuilder<TelegramUserDailyTasks> | DeleteQueryBuilder<TelegramUserDailyTasks>, filter: TelegramUserDailyTasksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.daily_task_id) {
                builder.andWhere('daily_task_id = :daily_task_id', filter);
            }
            if(filter.completed) {
                builder.andWhere('completed = :completed', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TelegramUserDailyTasks>, filter: TelegramUserDailyTasksListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async dailyTasks(id: number, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT DATE_FORMAT(tudt.created_at, '%Y-%m-%d %H:%i:%S') as created_at
            FROM telegram_user_daily_tasks tudt
            INNER JOIN daily_tasks dt ON tudt.daily_task_id = dt.id
            WHERE tudt.telegram_user_id = ?
            ORDER BY tudt.created_at DESC
            LIMIT 1
        `, [id]);
    }

    public async resetDailyTasks(id: number, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            delete from telegram_user_daily_tasks
            where telegram_user_id = ?
        `, [id]);
    }
}