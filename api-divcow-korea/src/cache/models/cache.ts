import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Cache } from "../entities/cache";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { CacheListFilter } from "../services/cache";

@Service()
export class CacheModel extends CoreModel<Cache> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Cache);
    }

    public async setFilter(builder: SelectQueryBuilder<Cache> | UpdateQueryBuilder<Cache> | DeleteQueryBuilder<Cache>, filter: CacheListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.key) {
                builder.andWhere('key = :key', filter);
            }
            if(filter.value) {
                builder.andWhere('value = :value', filter);
            }
            if(filter.expiration) {
                builder.andWhere('expiration = :expiration', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Cache>, filter: CacheListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}