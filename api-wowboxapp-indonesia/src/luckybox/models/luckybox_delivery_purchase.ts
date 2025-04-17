import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxDeliveryPurchase } from "../entities/luckybox_delivery_purchase";
import { LuckyboxDeliveryPurchaseListFilter } from "../services/luckybox_delivery_purchase";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxDeliveryPurchaseModel extends CoreModel<LuckyboxDeliveryPurchase> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxDeliveryPurchase);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxDeliveryPurchase> | UpdateQueryBuilder<LuckyboxDeliveryPurchase> | DeleteQueryBuilder<LuckyboxDeliveryPurchase>, filter: LuckyboxDeliveryPurchaseListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxPurchaseItemSeqNo) {
                builder.andWhere('luckybox_purchase_item_seq_no = :luckyboxPurchaseItemSeqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.orderNo) {
                builder.andWhere('order_no = :orderNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.paymentMethod) {
                builder.andWhere('payment_method = :paymentMethod', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.paymentDatetime) {
                builder.andWhere('payment_datetime = :paymentDatetime', filter);
            }
            if(filter.cancelDatetime) {
                builder.andWhere('cancel_datetime = :cancelDatetime', filter);
            }
            if(filter.xenditId) {
                builder.andWhere('xendit_id = :xenditId', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxDeliveryPurchase>, filter: LuckyboxDeliveryPurchaseListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}