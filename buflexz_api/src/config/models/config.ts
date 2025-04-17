import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Config } from "../entities/config";
import { ConfigFilter } from "../services/config";

@Service()
export class ConfigModel extends CoreModel<Config> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Config);
    }

    public async setFilter(builder: SelectQueryBuilder<Config> | UpdateQueryBuilder<Config> | DeleteQueryBuilder<Config>, filter: ConfigFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.code) {
                builder.andWhere('code = :code', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Config>, filter: ConfigFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}