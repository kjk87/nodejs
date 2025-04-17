import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { PersonalAccessTokens } from "../entities/personal_access_tokens";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { PersonalAccessTokensListFilter } from "../services/personal_access_tokens";

@Service()
export class PersonalAccessTokensModel extends CoreModel<PersonalAccessTokens> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, PersonalAccessTokens);
    }

    public async setFilter(builder: SelectQueryBuilder<PersonalAccessTokens> | UpdateQueryBuilder<PersonalAccessTokens> | DeleteQueryBuilder<PersonalAccessTokens>, filter: PersonalAccessTokensListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.tokenable_type) {
                builder.andWhere('tokenable_type = :tokenable_type', filter);
            }
            if(filter.tokenable_id) {
                builder.andWhere('tokenable_id = :tokenable_id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.token) {
                builder.andWhere('token = :token', filter);
            }
            if(filter.abilities) {
                builder.andWhere('abilities = :abilities', filter);
            }
            if(filter.last_used_at) {
                builder.andWhere('last_used_at = :last_used_at', filter);
            }
            if(filter.expires_at) {
                builder.andWhere('expires_at = :expires_at', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<PersonalAccessTokens>, filter: PersonalAccessTokensListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}