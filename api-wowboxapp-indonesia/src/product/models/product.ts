import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Product, ProductJoin } from "../entities/product";
import { ProductListFilter } from "../services/product";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductModel extends CoreModel<Product> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Product);
    }

    public async setFilter(builder: SelectQueryBuilder<Product> | UpdateQueryBuilder<Product> | DeleteQueryBuilder<Product>, filter: ProductListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                if(Array.isArray(filter.seqNo)) {
                    builder.andWhere('entity.seq_no in(:seqNo)', filter);
                } else {
                    builder.andWhere('entity.seq_no = :seqNo', filter);
                }
                
            }
            if(filter.marketType) {
                builder.andWhere('entity.market_type = :marketType', filter);
            }
            if(filter.salesType) {
                builder.andWhere('entity.sales_type = :salesType', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
            if(filter.blind) {
                builder.andWhere('entity.blind = :blind', filter);
            }
            if(filter.blindNot) {
                builder.andWhere('entity.blind != :blindNot', filter);
            }
            if(filter.reason) {
                builder.andWhere('entity.reason = :reason', filter);
            }
            if(filter.first) {
                builder.andWhere('entity.first = :first', filter);
            }
            if(filter.second) {
                builder.andWhere('entity.second = :second', filter);
            }
            if(filter.third) {
                builder.andWhere('entity.third = :third', filter);
            }
            if(filter.name) {
                builder.andWhere('entity.name = :name', filter);
            }
            if(filter.priceMethod) {
                builder.andWhere('entity.price_method = :priceMethod', filter);
            }
            if(filter.surtax) {
                builder.andWhere('entity.surtax = :surtax', filter);
            }
            if(filter.salesTerm) {
                builder.andWhere('entity.sales_term = :salesTerm', filter);
            }
            if(filter.startDate) {
                builder.andWhere('entity.start_date = :startDate', filter);
            }
            if(filter.endDate) {
                builder.andWhere('entity.end_date = :endDate', filter);
            }
            if(filter.contents) {
                builder.andWhere('entity.contents = :contents', filter);
            }
            if(filter.count) {
                builder.andWhere('entity.count = :count', filter);
            }
            if(filter.soldCount) {
                builder.andWhere('entity.sold_count = :soldCount', filter);
            }
            if(filter.useOption) {
                builder.andWhere('entity.use_option = :useOption', filter);
            }
            if(filter.optionType) {
                builder.andWhere('entity.option_type = :optionType', filter);
            }
            if(filter.optionArray) {
                builder.andWhere('entity.option_array = :optionArray', filter);
            }
            if(filter.register) {
                builder.andWhere('entity.register = :register', filter);
            }
            if(filter.registerType) {
                builder.andWhere('entity.register_type = :registerType', filter);
            }
            if(filter.isKc) {
                builder.andWhere('entity.is_kc = :isKc', filter);
            }
            if(filter.nonKcMemo) {
                builder.andWhere('entity.non_kc_memo = :nonKcMemo', filter);
            }
            if(filter.noticeGroup) {
                builder.andWhere('entity.notice_group = :noticeGroup', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('entity.reg_datetime = :regDatetime', filter);
            }
            if(filter.modDatetime) {
                builder.andWhere('entity.mod_datetime = :modDatetime', filter);
            }
            if(filter.statusDatetime) {
                builder.andWhere('entity.status_datetime = :statusDatetime', filter);
            }
            if(filter.wholesaleCompany) {
                builder.andWhere('entity.wholesale_company = :wholesaleCompany', filter);
            }
            if(filter.originalSeqNo) {
                builder.andWhere('entity.original_seq_no = :originalSeqNo', filter);
            }
            if(filter.supplierSeqNo) {
                builder.andWhere('entity.supplier_seq_no = :supplierSeqNo', filter);
            }
            if(filter.origin) {
                builder.andWhere('entity.origin = :origin', filter);
            }
            if(filter.notice) {
                builder.andWhere('entity.notice = :notice', filter);
            }
            if(filter.subName) {
                builder.andWhere('entity.sub_name = :subName', filter);
            }
            if(filter.domeSellerId) {
                builder.andWhere('entity.dome_seller_id = :domeSellerId', filter);
            }
            if(filter.changeEnable) {
                builder.andWhere('entity.change_enable = :changeEnable', filter);
            }
            if(filter.search) {
                builder.andWhere(`replace(name, ' ', '') like :search`, {search: `%` + filter.search + `%`});
            }
            
            if(filter.shoppingGroupSeqNo) {
                builder.andWhere(`shoppingGroup.seq_no = :shoppingGroupSeqNo`, filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Product>, filter: ProductListFilter = {}, entity?: any): Promise<void> {
        
        if(filter.random) {
            builder.addOrderBy('rand()');
        }
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}