import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { HistoryCash } from "../entities/histroy_cash";
import { HistoryCashFilter } from "../services/history";

@Service()
export class HistoryCashModel extends CoreModel<HistoryCash> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, HistoryCash);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryCash> | UpdateQueryBuilder<HistoryCash> | DeleteQueryBuilder<HistoryCash>, filter: HistoryCashFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<HistoryCash>, filter: HistoryCashFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}