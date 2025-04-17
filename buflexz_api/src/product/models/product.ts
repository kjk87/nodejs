import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Product } from "../entities/product";
import { ProductListFilter } from "../services/product";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductModel extends CoreModel<Product> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Product);
    }

    public async setFilter(builder: SelectQueryBuilder<Product> | UpdateQueryBuilder<Product> | DeleteQueryBuilder<Product>, filter: ProductListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.categorySeqNo) {
                builder.andWhere('category_seq_no = :categorySeqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('entity.title = :title', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('entity.reg_datetime = :regDatetime', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Product>, filter: ProductListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async nativeQuery(seqNo: number) {
        let manager = BUFLEXZ_DATASOURCE.createEntityManager();
        return (await manager.query(`
            SELECT * FROM product WHERE category_seq_no = ?
        `, [seqNo]))[0]
        // return await manager.query(`
        //     SELECT * FROM product p LEFT JOIN product_category pc ON p.category_seq_no = pc.seq_no WHERE p.category_seq_no = ${seqNo}
        // `)
    }
}