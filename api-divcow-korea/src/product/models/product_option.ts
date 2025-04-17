import { EntityManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductOption } from "../entities/product_option";
import { ProductOptionListFilter } from "../services/product_option";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductOptionModel extends CoreModel<ProductOption> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, ProductOption);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductOption> | UpdateQueryBuilder<ProductOption> | DeleteQueryBuilder<ProductOption>, filter: ProductOptionListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('entity.product_seq_no = :productSeqNo', filter);
            }
            if(filter.name) {
                builder.andWhere('entity.name = :name', filter);
            }
            if(filter.item) {
                builder.andWhere('entity.item = :item', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductOption>, filter: ProductOptionListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}