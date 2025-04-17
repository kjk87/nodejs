import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { BuffCoinInfo } from "../entities/buff_coin_info";

export class BuffCoinInfoModel extends CoreModel<BuffCoinInfo> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BuffCoinInfo)
    }

    public async setFilter(builder: SelectQueryBuilder<BuffCoinInfo> | UpdateQueryBuilder<BuffCoinInfo> | DeleteQueryBuilder<BuffCoinInfo>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere(`seq_no = :seqNo`, filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<BuffCoinInfo>, filter: any, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}