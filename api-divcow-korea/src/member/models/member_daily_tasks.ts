import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { MemberDailyTasks } from "../entities/member_daily_tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";

@Service()
export class MemberDailyTasksModel extends CoreModel<MemberDailyTasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, MemberDailyTasks);
    }

    public async setFilter(builder: SelectQueryBuilder<MemberDailyTasks> | UpdateQueryBuilder<MemberDailyTasks> | DeleteQueryBuilder<MemberDailyTasks>, filter: any, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.user_key) {
                builder.andWhere('user_key = :user_key', filter);
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

    public async setJoin(builder: SelectQueryBuilder<MemberDailyTasks>, filter: any, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async dailyTasks(userKey: string, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT DATE_FORMAT(mdt.created_at, '%Y-%m-%d %H:%i:%S') as created_at
            FROM member_daily_tasks mdt
            INNER JOIN daily_tasks dt ON mdt.daily_task_id = dt.id
            WHERE mdt.user_key = ?
            ORDER BY mdt.created_at DESC
            LIMIT 1
        `, [userKey]);
    }

    public async resetDailyTasks(userKey: string, manager?: EntityManager) {

        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            delete from member_daily_tasks
            where user_key = ?
        `, [userKey]);
    }
}