import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxPurchase } from "../entities/luckybox_purchase";
import { LuckyboxPurchaseListFilter } from "../services/luckybox_purchase";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxPurchaseModel extends CoreModel<LuckyboxPurchase> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxPurchase);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxPurchase> | UpdateQueryBuilder<LuckyboxPurchase> | DeleteQueryBuilder<LuckyboxPurchase>, filter: LuckyboxPurchaseListFilter, entity?: any): Promise<void> {
        
        if(filter) {
            if(filter.addWhere) {
                builder.andWhere(`(select count(1) from luckybox_purchase_item t1 where t1.luckybox_purchase_seq_no = entity.seq_no and t1.is_open = false) > 0`);
            }
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxSeqNo) {
                builder.andWhere('luckybox_seq_no = :luckyboxSeqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.orderNo) {
                builder.andWhere('order_no = :orderNo', filter);
            }
            if(filter.salesType) {
                builder.andWhere('sales_type = :salesType', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.paymentMethod) {
                builder.andWhere('payment_method = :paymentMethod', filter);
            }
            if(filter.quantity) {
                builder.andWhere('quantity = :quantity', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.unitPrice) {
                builder.andWhere('unit_price = :unitPrice', filter);
            }
            if(filter.cancelQuantity) {
                builder.andWhere('cancel_quantity = :cancelQuantity', filter);
            }
            if(filter.cancelPrice) {
                builder.andWhere('cancel_price = :cancelPrice', filter);
            }
            if(filter.remainPrice) {
                builder.andWhere('remain_price = :remainPrice', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.paymentDatetime) {
                builder.andWhere('payment_datetime = :paymentDatetime', filter);
            }
            if(filter.changeStatusDatetime) {
                builder.andWhere('change_status_datetime = :changeStatusDatetime', filter);
            }
            if(filter.xenditId) {
                builder.andWhere('xendit_id = :xenditId', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxPurchase>, filter: LuckyboxPurchaseListFilter, entity?: any): Promise<void> {
        builder.addSelect(`(select count(1) from luckybox_purchase_item t1 where t1.luckybox_purchase_seq_no = entity.seq_no and t1.is_open = true) = 0` ,'entity_isCancelable');
        
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}