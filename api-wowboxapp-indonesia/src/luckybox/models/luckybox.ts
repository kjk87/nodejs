import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Luckybox } from "../entities/luckybox";
import { LuckyboxListFilter } from "../services/luckybox";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxModel extends CoreModel<Luckybox> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Luckybox);
    }

    public async setFilter(builder: SelectQueryBuilder<Luckybox> | UpdateQueryBuilder<Luckybox> | DeleteQueryBuilder<Luckybox>, filter: LuckyboxListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.engagePrice) {
                builder.andWhere('engage_price = :engagePrice', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.modDatetime) {
                builder.andWhere('mod_datetime = :modDatetime', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Luckybox>, filter: LuckyboxListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}