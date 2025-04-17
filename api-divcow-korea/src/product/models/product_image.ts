import { EntityManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductImage } from "../entities/product_image";
import { ProductImageListFilter } from "../services/product_image";
import { safeArray } from "../../common/services/util";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductImageModel extends CoreModel<ProductImage> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, ProductImage);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductImage> | UpdateQueryBuilder<ProductImage> | DeleteQueryBuilder<ProductImage>, filter: ProductImageListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.productSeqNo) {
                if(Array.isArray(filter.productSeqNo)) {
                    builder.andWhere('entity.product_seq_no in (:productSeqNo)', filter);
                } else {
                    builder.andWhere('entity.product_seq_no = :productSeqNo', filter);
                }
                
            }
            if(filter.image) {
                builder.andWhere('entity.image = :image', filter);
            }
            if(filter.array) {
                builder.andWhere('entity.array = :array', filter);
            }
            if(filter.deligate) {
                builder.andWhere('entity.deligate = :deligate', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductImage>, filter: ProductImageListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}