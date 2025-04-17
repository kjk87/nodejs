import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Migrations } from "../entities/migrations";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { MigrationsListFilter } from "../services/migrations";

@Service()
export class MigrationsModel extends CoreModel<Migrations> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Migrations);
    }

    public async setFilter(builder: SelectQueryBuilder<Migrations> | UpdateQueryBuilder<Migrations> | DeleteQueryBuilder<Migrations>, filter: MigrationsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.migration) {
                builder.andWhere('migration = :migration', filter);
            }
            if(filter.batch) {
                builder.andWhere('batch = :batch', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Migrations>, filter: MigrationsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}