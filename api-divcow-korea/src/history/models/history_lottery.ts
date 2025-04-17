import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { HistoryLotteryFilter } from "../services/history";
import { HistoryLottery } from "../entities/histroy_lottery";

@Service()
export class HistoryLotteryModel extends CoreModel<HistoryLottery> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, HistoryLottery);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryLottery> | UpdateQueryBuilder<HistoryLottery> | DeleteQueryBuilder<HistoryLottery>, filter: HistoryLotteryFilter, entity?: any): Promise<void> {
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

    public async setJoin(builder: SelectQueryBuilder<HistoryLottery>, filter: HistoryLotteryFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}