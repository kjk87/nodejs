import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DailyTasks } from "../entities/daily_tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { DailyTasksListFilter } from "../services/daily_tasks";

@Service()
export class DailyTasksModel extends CoreModel<DailyTasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, DailyTasks);
    }

    public async setFilter(builder: SelectQueryBuilder<DailyTasks> | UpdateQueryBuilder<DailyTasks> | DeleteQueryBuilder<DailyTasks>, filter: DailyTasksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.description) {
                builder.andWhere('description = :description', filter);
            }
            if(filter.required_login_streak) {
                builder.andWhere('required_login_streak = :required_login_streak', filter);
            }
            if(filter.reward_coins) {
                builder.andWhere('reward_coins = :reward_coins', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<DailyTasks>, filter: DailyTasksListFilter, entity?: any): Promise<void> {

        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async dailyTasks(loginStreak: number, telegramUserId: number, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
                dt.*,
                tudt.completed,
                dt.required_login_streak <= ? as available
            FROM daily_tasks dt
            LEFT JOIN telegram_user_daily_tasks tudt
            ON dt.id = tudt.daily_task_id and tudt.telegram_user_id = ?
        `, [loginStreak, telegramUserId])

    }
    
    public async appDailyTasks(loginStreak: number, userKey: string, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
                dt.*,
                ifnull(mdt.completed, 0) as completed,
                dt.required_login_streak <= ${loginStreak} as available
            FROM daily_tasks dt
            LEFT JOIN member_daily_tasks mdt
            ON dt.id = mdt.daily_task_id and mdt.user_key = '${userKey}'
        `, )

    }
}