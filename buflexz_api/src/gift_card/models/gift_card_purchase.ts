import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { GiftCardPurchase } from "../entities/gift_card_purchase";
import { GiftCardPurchaseFilter } from "../services/gift_card_purchase";


@Service()
export class GiftCardPurchaseModel extends CoreModel<GiftCardPurchase> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, GiftCardPurchase);
    }

    public async setFilter(builder: SelectQueryBuilder<GiftCardPurchase> | UpdateQueryBuilder<GiftCardPurchase> | DeleteQueryBuilder<GiftCardPurchase>, filter: GiftCardPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.code) {
                builder.andWhere('code = :code', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.giftCardSeqNo) {
                builder.andWhere('gift_card_seq_no = :giftCardSeqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.deliveryStatus) {
                builder.andWhere('delivery_status = :deliveryStatus', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<GiftCardPurchase>, filter: GiftCardPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}