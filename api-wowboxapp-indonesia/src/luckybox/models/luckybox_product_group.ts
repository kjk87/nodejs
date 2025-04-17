import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxProductGroup } from "../entities/luckybox_product_group";
import { LuckyboxProductGroupListFilter } from "../services/luckybox_product_group";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxProductGroupModel extends CoreModel<LuckyboxProductGroup> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxProductGroup);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxProductGroup> | UpdateQueryBuilder<LuckyboxProductGroup> | DeleteQueryBuilder<LuckyboxProductGroup>, filter: LuckyboxProductGroupListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.turnNo) {
                builder.andWhere('turn_no = :turnNo', filter);
            }
            if(filter.priority) {
                builder.andWhere('priority = :priority', filter);
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

    public async setJoin(builder: SelectQueryBuilder<LuckyboxProductGroup>, filter: LuckyboxProductGroupListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}