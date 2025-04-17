import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxEntry } from "../entities/luckybox_entry";
import { LuckyboxEntryListFilter } from "../services/luckybox_entry";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxEntryModel extends CoreModel<LuckyboxEntry> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxEntry);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxEntry> | UpdateQueryBuilder<LuckyboxEntry> | DeleteQueryBuilder<LuckyboxEntry>, filter: LuckyboxEntryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                if(Array.isArray(filter.seqNo)) {
                    builder.andWhere('seq_no in (:seqNo)', filter);
                } else {
                    builder.andWhere('seq_no = :seqNo', filter);
                }
                
            }
            if(filter.luckyboxProductGroupSeqNo) {
                if(Array.isArray(filter.luckyboxProductGroupSeqNo)) {
                    builder.andWhere('luckybox_product_group_seq_no in (:luckyboxProductGroupSeqNo)', filter);
                } else {
                    builder.andWhere('luckybox_product_group_seq_no = :luckyboxProductGroupSeqNo', filter);
                }
            }
            if(filter.luckyboxSeqNo) {
                if(Array.isArray(filter.luckyboxSeqNo)) {
                    builder.andWhere('luckybox_seq_no in (:luckyboxSeqNo)', filter);
                } else {
                    builder.andWhere('luckybox_seq_no = :luckyboxSeqNo', filter);
                }
            }
            if(filter.temp) {
                builder.andWhere('temp = :temp', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxEntry>, filter: LuckyboxEntryListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}