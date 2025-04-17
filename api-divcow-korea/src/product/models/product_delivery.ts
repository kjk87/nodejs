import { EntityManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { ProductDelivery } from "../entities/product_delivery";
import { ProductDeliveryListFilter } from "../services/product_delivery";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";

@Service()
export class ProductDeliveryModel extends CoreModel<ProductDelivery> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, ProductDelivery);
    }

    public async setFilter(builder: SelectQueryBuilder<ProductDelivery> | UpdateQueryBuilder<ProductDelivery> | DeleteQueryBuilder<ProductDelivery>, filter: ProductDeliveryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                if(Array.isArray(filter.seqNo)) {
                    builder.andWhere('entity.seq_no in(:seqNo)', filter);
                } else {
                    builder.andWhere('entity.seq_no = :seqNo', filter);
                }
                
            }
            if(filter.productSeqNo) {
                if(Array.isArray(filter.productSeqNo)) {
                    builder.andWhere('entity.product_seq_no in(:productSeqNo)', filter);
                } else {
                    builder.andWhere('entity.product_seq_no = :productSeqNo', filter);
                }
                
            }
            if(filter.method) {
                builder.andWhere('entity.method = :method', filter);
            }
            if(filter.type) {
                builder.andWhere('entity.type = :type', filter);
            }
            if(filter.shippingCompany) {
                builder.andWhere('entity.shipping_company = :shippingCompany', filter);
            }
            if(filter.forwardingAddr) {
                builder.andWhere('entity.forwarding_addr = :forwardingAddr', filter);
            }
            if(filter.returnAddr) {
                builder.andWhere('entity.return_addr = :returnAddr', filter);
            }
            if(filter.paymentMethod) {
                builder.andWhere('entity.payment_method = :paymentMethod', filter);
            }
            if(filter.deliveryFee) {
                builder.andWhere('entity.delivery_fee = :deliveryFee', filter);
            }
            if(filter.isAddFee) {
                builder.andWhere('entity.is_add_fee = :isAddFee', filter);
            }
            if(filter.deliveryAddFee1) {
                builder.andWhere('entity.delivery_add_fee1 = :deliveryAddFee1', filter);
            }
            if(filter.deliveryAddFee2) {
                builder.andWhere('entity.delivery_add_fee2 = :deliveryAddFee2', filter);
            }
            if(filter.deliveryMinPrice) {
                builder.andWhere('entity.delivery_min_price = :deliveryMinPrice', filter);
            }
            if(filter.deliveryReturnFee) {
                builder.andWhere('entity.delivery_return_fee = :deliveryReturnFee', filter);
            }
            if(filter.deliveryExchangeFee) {
                builder.andWhere('entity.delivery_exchange_fee = :deliveryExchangeFee', filter);
            }
            if(filter.asTel) {
                builder.andWhere('entity.as_tel = :asTel', filter);
            }
            if(filter.asMent) {
                builder.andWhere('entity.as_ment = :asMent', filter);
            }
            if(filter.specialNote) {
                builder.andWhere('entity.special_note = :specialNote', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProductDelivery>, filter: ProductDeliveryListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}