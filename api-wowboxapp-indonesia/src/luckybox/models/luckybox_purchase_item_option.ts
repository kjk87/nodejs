import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxPurchaseItemOption } from "../entities/luckybox_purchase_item_option";
import { LuckyboxPurchaseItemOptionListFilter } from "../services/luckybox_purchase_item_option";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxPurchaseItemOptionModel extends CoreModel<LuckyboxPurchaseItemOption> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxPurchaseItemOption);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxPurchaseItemOption> | UpdateQueryBuilder<LuckyboxPurchaseItemOption> | DeleteQueryBuilder<LuckyboxPurchaseItemOption>, filter: LuckyboxPurchaseItemOptionListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxPurchaseItemSeqNo) {
                builder.andWhere('luckybox_purchase_item_seq_no = :luckyboxPurchaseItemSeqNo', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('product_seq_no = :productSeqNo', filter);
            }
            if(filter.productOptionDetailSeqNo) {
                builder.andWhere('product_option_detail_seq_no = :productOptionDetailSeqNo', filter);
            }
            if(filter.quantity) {
                builder.andWhere('quantity = :quantity', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.depth1) {
                builder.andWhere('depth1 = :depth1', filter);
            }
            if(filter.depth2) {
                builder.andWhere('depth2 = :depth2', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxPurchaseItemOption>, filter: LuckyboxPurchaseItemOptionListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}