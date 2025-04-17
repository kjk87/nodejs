import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Levels } from "../entities/levels";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { LevelsListFilter } from "../services/levels";

@Service()
export class LevelsModel extends CoreModel<Levels> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Levels);
    }

    public async setFilter(builder: SelectQueryBuilder<Levels> | UpdateQueryBuilder<Levels> | DeleteQueryBuilder<Levels>, filter: LevelsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.level) {
                builder.andWhere('level = :level', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.from_balance) {
                builder.andWhere('from_balance = :from_balance', filter);
            }
            if(filter.to_balance) {
                builder.andWhere('to_balance = :to_balance', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Levels>, filter: LevelsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}