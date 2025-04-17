import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { GiftCard } from "../entities/gift_card";
import { GiftCardFilter } from "../services/gift_card";

@Service()
export class GiftCardModel extends CoreModel<GiftCard> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, GiftCard);
    }

    public async setFilter(builder: SelectQueryBuilder<GiftCard> | UpdateQueryBuilder<GiftCard> | DeleteQueryBuilder<GiftCard>, filter: GiftCardFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.brandSeqNo) {
                builder.andWhere('brand_seq_no = :brandSeqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<GiftCard>, filter: GiftCardFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}