import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { TonHistory } from "../entities/ton_history";
import { TonHistoryListFilter } from "../services/ton_history";

@Service()
export class TonHistoryModel extends CoreModel<TonHistory> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, TonHistory);
    }

    public async setFilter(builder: SelectQueryBuilder<TonHistory> | UpdateQueryBuilder<TonHistory> | DeleteQueryBuilder<TonHistory>, filter: TonHistoryListFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<TonHistory>, filter: TonHistoryListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}