import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductCategory } from "../entities/product_category";
import { ProductCategoryListFilter } from "../services/product_category";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductCategoryModel extends CoreModel<ProductCategory> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, ProductCategory);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductCategory> | UpdateQueryBuilder<ProductCategory> | DeleteQueryBuilder<ProductCategory>, filter: ProductCategoryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductCategory>, filter: ProductCategoryListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}