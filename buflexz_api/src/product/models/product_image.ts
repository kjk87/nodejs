import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductImage } from "../entities/product_image";
import { ProductImageListFilter } from "../services/product_image";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductImageModel extends CoreModel<ProductImage> {
    constructor() {
        super(BUFLEXZ_DATASOURCE, ProductImage);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductImage> | UpdateQueryBuilder<ProductImage> | DeleteQueryBuilder<ProductImage>, filter: ProductImageListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('product_seq_no = :productSeqNo', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductImage>, filter: ProductImageListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}