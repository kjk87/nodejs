import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Nation } from "../entities/nation";
import { NationFilter } from "../services/nation";

@Service()
export class NationModel extends CoreModel<Nation> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Nation);
    }

    public async setFilter(builder: SelectQueryBuilder<Nation> | UpdateQueryBuilder<Nation> | DeleteQueryBuilder<Nation>, filter: NationFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.code) {
                builder.andWhere('code = :code', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Nation>, filter: NationFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}