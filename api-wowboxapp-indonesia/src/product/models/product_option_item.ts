import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductOptionItem } from "../entities/product_option_item";
import { ProductOptionItemListFilter } from "../services/product_option_item";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductOptionItemModel extends CoreModel<ProductOptionItem> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, ProductOptionItem);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductOptionItem> | UpdateQueryBuilder<ProductOptionItem> | DeleteQueryBuilder<ProductOptionItem>, filter: ProductOptionItemListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('entity.product_seq_no = :productSeqNo', filter);
            }
            if(filter.optionSeqNo) {
                builder.andWhere('entity.option_seq_no = :optionSeqNo', filter);
            }
            if(filter.item) {
                builder.andWhere('entity.item = :item', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductOptionItem>, filter: ProductOptionItemListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}