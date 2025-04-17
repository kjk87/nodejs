import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Sessions } from "../entities/sessions";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { SessionsListFilter } from "../services/sessions";

@Service()
export class SessionsModel extends CoreModel<Sessions> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Sessions);
    }

    public async setFilter(builder: SelectQueryBuilder<Sessions> | UpdateQueryBuilder<Sessions> | DeleteQueryBuilder<Sessions>, filter: SessionsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.user_id) {
                builder.andWhere('user_id = :user_id', filter);
            }
            if(filter.ip_address) {
                builder.andWhere('ip_address = :ip_address', filter);
            }
            if(filter.user_agent) {
                builder.andWhere('user_agent = :user_agent', filter);
            }
            if(filter.payload) {
                builder.andWhere('payload = :payload', filter);
            }
            if(filter.last_activity) {
                builder.andWhere('last_activity = :last_activity', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Sessions>, filter: SessionsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}