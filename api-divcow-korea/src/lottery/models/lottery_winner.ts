import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { LotteryWinner } from "../entities/lottery_winner";
import { LotteryWinnerFilter } from "../service/lottery_winner";

@Service()
export class LotteryWinnerModel extends CoreModel<LotteryWinner> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, LotteryWinner);
    }

    public async setFilter(builder: SelectQueryBuilder<LotteryWinner> | UpdateQueryBuilder<LotteryWinner> | DeleteQueryBuilder<LotteryWinner>, filter: LotteryWinnerFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.date) {
                builder.andWhere('date = :date', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LotteryWinner>, filter: LotteryWinnerFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}