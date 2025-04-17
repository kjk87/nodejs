import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { KodePos } from "../entities/kode_pos";
import { KodePosFilter } from "../services/kode_pos";

@Service()
export class KodePosModel extends CoreModel<KodePos> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, KodePos);
    }

    public async setFilter(builder: SelectQueryBuilder<KodePos> | UpdateQueryBuilder<KodePos> | DeleteQueryBuilder<KodePos>, filter: KodePosFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.parentId) {
                builder.andWhere('parent_id = :parentId', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<KodePos>, filter: KodePosFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}