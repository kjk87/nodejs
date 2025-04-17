import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Kabkota } from "../entities/kabkota";
import { KabkotaFilter } from "../services/kabkota";

@Service()
export class KabkotaModel extends CoreModel<Kabkota> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Kabkota);
    }

    public async setFilter(builder: SelectQueryBuilder<Kabkota> | UpdateQueryBuilder<Kabkota> | DeleteQueryBuilder<Kabkota>, filter: KabkotaFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.parentId) {
                builder.andWhere('parent_id = :parentId', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Kabkota>, filter: KabkotaFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}