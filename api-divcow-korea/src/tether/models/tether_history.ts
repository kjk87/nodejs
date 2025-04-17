import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TetherHistory } from "../entities/tether_history";
import { TetherHistoryListFilter } from "../services/tether_history";

@Service()
export class TetherHistoryModel extends CoreModel<TetherHistory> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TetherHistory);
    }

    public async setFilter(builder: SelectQueryBuilder<TetherHistory> | UpdateQueryBuilder<TetherHistory> | DeleteQueryBuilder<TetherHistory>, filter: TetherHistoryListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.subject) {
                builder.andWhere('subject = :subject', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<TetherHistory>, filter: TetherHistoryListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}