import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { TelegramUserMissions } from "../entities/telegram_user_missions";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TelegramUserMissionsListFilter } from "../services/telegram_user_missions";

@Service()
export class TelegramUserMissionsModel extends CoreModel<TelegramUserMissions> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TelegramUserMissions);
    }

    public async setFilter(builder: SelectQueryBuilder<TelegramUserMissions> | UpdateQueryBuilder<TelegramUserMissions> | DeleteQueryBuilder<TelegramUserMissions>, filter: TelegramUserMissionsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.mission_level_id) {
                builder.andWhere('mission_level_id = :mission_level_id', filter);
            }
            if(filter.level) {
                builder.andWhere('level = :level', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TelegramUserMissions>, filter: TelegramUserMissionsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}