import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Tasks } from "../entities/tasks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TasksListFilter } from "../services/tasks";

@Service()
export class TasksModel extends CoreModel<Tasks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Tasks);
    }

    public async setFilter(builder: SelectQueryBuilder<Tasks> | UpdateQueryBuilder<Tasks> | DeleteQueryBuilder<Tasks>, filter: TasksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.description) {
                builder.andWhere('description = :description', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.reward_coins) {
                builder.andWhere('reward_coins = :reward_coins', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.action_name) {
                builder.andWhere('action_name = :action_name', filter);
            }
            if(filter.link) {
                builder.andWhere('link = :link', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Tasks>, filter: TasksListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}