import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxDelivery } from "../entities/luckybox_delivery";
import { LuckyboxDeliveryListFilter } from "../services/luckybox_delivery";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxDeliveryModel extends CoreModel<LuckyboxDelivery> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxDelivery);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxDelivery> | UpdateQueryBuilder<LuckyboxDelivery> | DeleteQueryBuilder<LuckyboxDelivery>, filter: LuckyboxDeliveryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxPurchaseItemSeqNo) {
                builder.andWhere('luckybox_purchase_item_seq_no = :luckyboxPurchaseItemSeqNo', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.method) {
                builder.andWhere('method = :method', filter);
            }
            if(filter.paymentMethod) {
                builder.andWhere('payment_method = :paymentMethod', filter);
            }
            if(filter.receiverName) {
                builder.andWhere('receiver_name = :receiverName', filter);
            }
            if(filter.receiverPostCode) {
                builder.andWhere('receiver_post_code = :receiverPostCode', filter);
            }
            if(filter.receiverAddress) {
                builder.andWhere('receiver_address = :receiverAddress', filter);
            }
            if(filter.deliveryMemo) {
                builder.andWhere('delivery_memo = :deliveryMemo', filter);
            }
            if(filter.deliveryFee) {
                builder.andWhere('delivery_fee = :deliveryFee', filter);
            }
            if(filter.deliveryStartDatetime) {
                builder.andWhere('delivery_start_datetime = :deliveryStartDatetime', filter);
            }
            if(filter.deliveryCompleteDatetime) {
                builder.andWhere('delivery_complete_datetime = :deliveryCompleteDatetime', filter);
            }
            if(filter.deliveryAddFee1) {
                builder.andWhere('delivery_add_fee1 = :deliveryAddFee1', filter);
            }
            if(filter.deliveryAddFee2) {
                builder.andWhere('delivery_add_fee2 = :deliveryAddFee2', filter);
            }
            if(filter.shippingCompany) {
                builder.andWhere('shipping_company = :shippingCompany', filter);
            }
            if(filter.transportNumber) {
                builder.andWhere('transport_number = :transportNumber', filter);
            }
            if(filter.shippingCompanyCode) {
                builder.andWhere('shipping_company_code = :shippingCompanyCode', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxDelivery>, filter: LuckyboxDeliveryListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}