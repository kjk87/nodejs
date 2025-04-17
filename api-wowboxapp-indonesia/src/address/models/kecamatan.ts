import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Kecamatan } from "../entities/kecamatan";
import { KecamatanFilter } from "../services/kecamatan";

@Service()
export class KecamatanModel extends CoreModel<Kecamatan> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Kecamatan);
    }

    public async setFilter(builder: SelectQueryBuilder<Kecamatan> | UpdateQueryBuilder<Kecamatan> | DeleteQueryBuilder<Kecamatan>, filter: KecamatanFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.parentId) {
                builder.andWhere('parent_id = :parentId', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Kecamatan>, filter: KecamatanFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}