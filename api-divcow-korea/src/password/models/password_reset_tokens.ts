import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { PasswordResetTokens } from "../entities/password_reset_tokens";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { PasswordResetTokensListFilter } from "../services/password_reset_tokens";

@Service()
export class PasswordResetTokensModel extends CoreModel<PasswordResetTokens> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, PasswordResetTokens);
    }

    public async setFilter(builder: SelectQueryBuilder<PasswordResetTokens> | UpdateQueryBuilder<PasswordResetTokens> | DeleteQueryBuilder<PasswordResetTokens>, filter: PasswordResetTokensListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.email) {
                builder.andWhere('email = :email', filter);
            }
            if(filter.token) {
                builder.andWhere('token = :token', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<PasswordResetTokens>, filter: PasswordResetTokensListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}