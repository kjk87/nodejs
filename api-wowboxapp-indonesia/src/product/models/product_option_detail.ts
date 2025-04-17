import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductOptionDetail } from "../entities/product_option_detail";
import { ProductOptionDetailListFilter } from "../services/product_option_detail";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductOptionDetailModel extends CoreModel<ProductOptionDetail> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, ProductOptionDetail);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductOptionDetail> | UpdateQueryBuilder<ProductOptionDetail> | DeleteQueryBuilder<ProductOptionDetail>, filter: ProductOptionDetailListFilter, entity?: any): Promise<void> {
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
            if(filter.depth1ItemSeqNo) {
                builder.andWhere('entity.depth1_item_seq_no = :depth1ItemSeqNo', filter);
            }
            if(filter.depth2ItemSeqNo) {
                builder.andWhere('entity.depth2_item_seq_no = :depth2ItemSeqNo', filter);
            }
            if(filter.amount) {
                builder.andWhere('entity.amount = :amount', filter);
            }
            if(filter.soldCount) {
                builder.andWhere('entity.sold_count = :soldCount', filter);
            }
            if(filter.price) {
                builder.andWhere('entity.price = :price', filter);
            }
            if(filter.flag) {
                builder.andWhere('entity.flag = :flag', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
            if(filter.usable) {
                builder.andWhere('entity.usable = :usable', filter);
            }
            if(filter.domemeCode) {
                builder.andWhere('entity.domeme_code = :domemeCode', filter);
            }
            if(filter.domaemae) {
                builder.andWhere('entity.domaemae = :domaemae', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductOptionDetail>, filter: ProductOptionDetailListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async updateMinusSoldCountBySeqNo(seqNo: number, amount: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            update product_option_detail set sold_count = sold_count - ${amount} where seq_no = ${seqNo}
        `)
    }
}