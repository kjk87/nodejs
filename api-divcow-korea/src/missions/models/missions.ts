import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Missions } from "../entities/missions";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { MissionsListFilter } from "../services/missions";

@Service()
export class MissionsModel extends CoreModel<Missions> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Missions);
    }

    public async setFilter(builder: SelectQueryBuilder<Missions> | UpdateQueryBuilder<Missions> | DeleteQueryBuilder<Missions>, filter: MissionsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.mission_type_id) {
                builder.andWhere('mission_type_id = :mission_type_id', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.required_user_level) {
                builder.andWhere('required_user_level = :required_user_level', filter);
            }
            if(filter.required_friends_invitation) {
                builder.andWhere('required_friends_invitation = :required_friends_invitation', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Missions>, filter: MissionsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}