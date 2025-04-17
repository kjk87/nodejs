import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Provinsi } from "../entities/provinsi";
import { ProvinsiFilter } from "../services/provinsi";

@Service()
export class ProvinsiModel extends CoreModel<Provinsi> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Provinsi);
    }

    public async setFilter(builder: SelectQueryBuilder<Provinsi> | UpdateQueryBuilder<Provinsi> | DeleteQueryBuilder<Provinsi>, filter: ProvinsiFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Provinsi>, filter: ProvinsiFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}