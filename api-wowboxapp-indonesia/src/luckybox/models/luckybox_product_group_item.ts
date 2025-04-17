import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxProductGroupItem } from "../entities/luckybox_product_group_item";
import { LuckyboxProductGroupItemListFilter } from "../services/luckybox_product_group_item";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxProductGroupItemModel extends CoreModel<LuckyboxProductGroupItem> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxProductGroupItem);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxProductGroupItem> | UpdateQueryBuilder<LuckyboxProductGroupItem> | DeleteQueryBuilder<LuckyboxProductGroupItem>, filter: LuckyboxProductGroupItemListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxProductGroupSeqNo) {
                if(Array.isArray(filter.luckyboxProductGroupSeqNo)) {
                    builder.andWhere('luckybox_product_group_seq_no in (:luckyboxProductGroupSeqNo)', filter);
                } else {
                    builder.andWhere('luckybox_product_group_seq_no = :luckyboxProductGroupSeqNo', filter);
                }  
            }
            if(filter.productSeqNo) {
                builder.andWhere('product_seq_no = :productSeqNo', filter);
            }
            if(filter.temp) {
                builder.andWhere('temp = :temp', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.productName) {
                builder.andWhere('product_name = :productName', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxProductGroupItem>, filter: LuckyboxProductGroupItemListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}