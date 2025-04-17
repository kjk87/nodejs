import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Withdraw } from "../entities/withdraw";
import { WithdrawFilter } from "../services/withdraw";


@Service()
export class WithdrawModel extends CoreModel<Withdraw> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Withdraw);
    }

    public async setFilter(builder: SelectQueryBuilder<Withdraw> | UpdateQueryBuilder<Withdraw> | DeleteQueryBuilder<Withdraw>, filter: WithdrawFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Withdraw>, filter: WithdrawFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}