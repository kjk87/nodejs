import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { HistoryPoint } from "../entities/histroy_point";
import { HistoryBallFilter, HistoryPointFilter } from "../services/history";
import { HistoryBall } from "../entities/histroy_ball";

@Service()
export class HistoryBallModel extends CoreModel<HistoryBall> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, HistoryBall);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryBall> | UpdateQueryBuilder<HistoryBall> | DeleteQueryBuilder<HistoryBall>, filter: HistoryBallFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<HistoryBall>, filter: HistoryBallFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}