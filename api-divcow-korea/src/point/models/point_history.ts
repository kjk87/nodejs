import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { PointHistory } from "../entities/point_history";
import { PointHistoryListFilter } from "../services/point_history";

@Service()
export class PointHistoryModel extends CoreModel<PointHistory> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, PointHistory);
    }

    public async setFilter(builder: SelectQueryBuilder<PointHistory> | UpdateQueryBuilder<PointHistory> | DeleteQueryBuilder<PointHistory>, filter: PointHistoryListFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<PointHistory>, filter: PointHistoryListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}