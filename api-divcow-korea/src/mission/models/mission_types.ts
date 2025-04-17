import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { MissionTypes } from "../entities/mission_types";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { MissionTypesListFilter } from "../services/mission_types";

@Service()
export class MissionTypesModel extends CoreModel<MissionTypes> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, MissionTypes);
    }

    public async setFilter(builder: SelectQueryBuilder<MissionTypes> | UpdateQueryBuilder<MissionTypes> | DeleteQueryBuilder<MissionTypes>, filter: MissionTypesListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MissionTypes>, filter: MissionTypesListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}