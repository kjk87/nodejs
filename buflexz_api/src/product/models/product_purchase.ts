import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { ProductPurchase } from "../entities/product_purchase";
import { ProductPurchaseFilter } from "../services/product_purchase";

@Service()
export class ProductPurchaseModel extends CoreModel<ProductPurchase> {
    constructor() {
        super(BUFLEXZ_DATASOURCE, ProductPurchase);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductPurchase> | UpdateQueryBuilder<ProductPurchase> | DeleteQueryBuilder<ProductPurchase>, filter: ProductPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('product_seq_no = :productSeqNo', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductPurchase>, filter: ProductPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}