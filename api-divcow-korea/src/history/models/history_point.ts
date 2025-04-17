import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { HistoryPoint } from "../entities/histroy_point";
import { HistoryPointFilter } from "../services/history";

@Service()
export class HistoryPointModel extends CoreModel<HistoryPoint> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, HistoryPoint);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryPoint> | UpdateQueryBuilder<HistoryPoint> | DeleteQueryBuilder<HistoryPoint>, filter: HistoryPointFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<HistoryPoint>, filter: HistoryPointFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}