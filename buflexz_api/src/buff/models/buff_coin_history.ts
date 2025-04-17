import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BuffCoinHistory } from "../entities/buff_coin_history";
import { BuffCoinHistoryListFilter } from "../services/buff_coin_history";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class BuffCoinHistoryModel extends CoreModel<BuffCoinHistory> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BuffCoinHistory);
    }

    public async setFilter(builder: SelectQueryBuilder<BuffCoinHistory> | UpdateQueryBuilder<BuffCoinHistory> | DeleteQueryBuilder<BuffCoinHistory>, filter: BuffCoinHistoryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.coin) {
                builder.andWhere('coin = :coin', filter);
            }
            if(filter.subject) {
                builder.andWhere('subject = :subject', filter);
            }
            if(filter.historyProp) {
                builder.andWhere('history_prop = :historyProp', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<BuffCoinHistory>, filter: BuffCoinHistoryListFilter, entity?: any): Promise<void> {
        		if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}