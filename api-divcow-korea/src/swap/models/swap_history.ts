import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { SwapHistory } from "../entities/swap_history";
import { SwapHistoryListFilter } from "../services/swap_history";

@Service()
export class SwapHistoryModel extends CoreModel<SwapHistory> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, SwapHistory);
    }

    public async setFilter(builder: SelectQueryBuilder<SwapHistory> | UpdateQueryBuilder<SwapHistory> | DeleteQueryBuilder<SwapHistory>, filter: SwapHistoryListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.telegram_user_id) {
                builder.andWhere('telegram_user_id = :telegram_user_id', filter);
            }
            if(filter.amount) {
                builder.andWhere('amount = :amount', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<SwapHistory>, filter: SwapHistoryListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}