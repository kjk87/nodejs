import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { HistoryTether } from "../entities/histroy_tether";
import { HistoryTetherFilter } from "../services/history";

@Service()
export class HistoryTetherModel extends CoreModel<HistoryTether> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, HistoryTether);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryTether> | UpdateQueryBuilder<HistoryTether> | DeleteQueryBuilder<HistoryTether>, filter: HistoryTetherFilter, entity?: any): Promise<void> {
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

        }
    }

    public async setJoin(builder: SelectQueryBuilder<HistoryTether>, filter: HistoryTetherFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}