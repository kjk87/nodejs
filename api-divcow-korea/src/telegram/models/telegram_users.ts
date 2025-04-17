import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { TelegramUsers } from "../entities/telegram_users";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TelegramUsersListFilter } from "../services/telegram_users";

@Service()
export class TelegramUsersModel extends CoreModel<TelegramUsers> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TelegramUsers);
    }

    public async setFilter(builder: SelectQueryBuilder<TelegramUsers> | UpdateQueryBuilder<TelegramUsers> | DeleteQueryBuilder<TelegramUsers>, filter: TelegramUsersListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_id) {
                builder.andWhere('telegram_id = :telegram_id', filter);
            }
            if(filter.first_name) {
                builder.andWhere('first_name = :first_name', filter);
            }
            if(filter.last_name) {
                builder.andWhere('last_name = :last_name', filter);
            }
            if(filter.username) {
                builder.andWhere('username = :username', filter);
            }
            if(filter.ton_wallet) {
                builder.andWhere('ton_wallet = :ton_wallet', filter);
            }
            if(filter.balance) {
                builder.andWhere('balance = :balance', filter);
            }
            if(filter.earn_per_tap) {
                builder.andWhere('earn_per_tap = :earn_per_tap', filter);
            }
            if(filter.available_energy) {
                builder.andWhere('available_energy = :available_energy', filter);
            }
            if(filter.max_energy) {
                builder.andWhere('max_energy = :max_energy', filter);
            }
            if(filter.multi_tap_level) {
                builder.andWhere('multi_tap_level = :multi_tap_level', filter);
            }
            if(filter.energy_limit_level) {
                builder.andWhere('energy_limit_level = :energy_limit_level', filter);
            }
            if(filter.booster_pack_2x) {
                builder.andWhere('booster_pack_2x = :booster_pack_2x', filter);
            }
            if(filter.booster_pack_3x) {
                builder.andWhere('booster_pack_3x = :booster_pack_3x', filter);
            }
            if(filter.booster_pack_7x) {
                builder.andWhere('booster_pack_7x = :booster_pack_7x', filter);
            }
            if(filter.booster_pack_active_until) {
                builder.andWhere('booster_pack_active_until = :booster_pack_active_until', filter);
            }
            if(filter.login_streak) {
                builder.andWhere('login_streak = :login_streak', filter);
            }
            if(filter.daily_booster_uses) {
                builder.andWhere('daily_booster_uses = :daily_booster_uses', filter);
            }
            if(filter.last_daily_booster_use) {
                builder.andWhere('last_daily_booster_use = :last_daily_booster_use', filter);
            }
            if(filter.production_per_hour) {
                builder.andWhere('production_per_hour = :production_per_hour', filter);
            }
            if(filter.referred_by) {
                builder.andWhere('referred_by = :referred_by', filter);
            }
            if(filter.level_id) {
                builder.andWhere('level_id = :level_id', filter);
            }
            if(filter.remember_token) {
                builder.andWhere('remember_token = :remember_token', filter);
            }
            if(filter.last_tap_date) {
                builder.andWhere('last_tap_date = :last_tap_date', filter);
            }
            if(filter.last_login_date) {
                builder.andWhere('last_login_date = :last_login_date', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TelegramUsers>, filter: TelegramUsersListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}