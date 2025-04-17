import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Users } from "../entities/users";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { UsersListFilter } from "../services/users";

@Service()
export class UsersModel extends CoreModel<Users> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Users);
    }

    public async setFilter(builder: SelectQueryBuilder<Users> | UpdateQueryBuilder<Users> | DeleteQueryBuilder<Users>, filter: UsersListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.email) {
                builder.andWhere('email = :email', filter);
            }
            if(filter.email_verified_at) {
                builder.andWhere('email_verified_at = :email_verified_at', filter);
            }
            if(filter.password) {
                builder.andWhere('password = :password', filter);
            }
            if(filter.remember_token) {
                builder.andWhere('remember_token = :remember_token', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Users>, filter: UsersListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}