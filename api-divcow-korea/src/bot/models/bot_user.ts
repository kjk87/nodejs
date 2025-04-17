import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { BotUser } from "../entities/bot_user";
import { BotUserListFilter } from "../services/bot_user";

@Service()
export class BotUserModel extends CoreModel<BotUser> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, BotUser);
    }

    public async setFilter(builder: SelectQueryBuilder<BotUser> | UpdateQueryBuilder<BotUser> | DeleteQueryBuilder<BotUser>, filter: BotUserListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.telegram_id) {
                builder.andWhere('telegram_id = :telegram_id', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<BotUser>, filter: BotUserListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}