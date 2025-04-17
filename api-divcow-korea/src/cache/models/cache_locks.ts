import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { CacheLocks } from "../entities/cache_locks";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { CacheLocksListFilter } from "../services/cache_locks";

@Service()
export class CacheLocksModel extends CoreModel<CacheLocks> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, CacheLocks);
    }

    public async setFilter(builder: SelectQueryBuilder<CacheLocks> | UpdateQueryBuilder<CacheLocks> | DeleteQueryBuilder<CacheLocks>, filter: CacheLocksListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.key) {
                builder.andWhere('key = :key', filter);
            }
            if(filter.owner) {
                builder.andWhere('owner = :owner', filter);
            }
            if(filter.expiration) {
                builder.andWhere('expiration = :expiration', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<CacheLocks>, filter: CacheLocksListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}