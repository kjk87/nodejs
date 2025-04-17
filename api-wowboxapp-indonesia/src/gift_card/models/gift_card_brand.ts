import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { GiftCardBrand } from "../entities/gift_card_brand";
import { GiftCardBrandFilter } from "../services/gift_card_brand";

@Service()
export class GiftCardBrandModel extends CoreModel<GiftCardBrand> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, GiftCardBrand);
    }

    public async setFilter(builder: SelectQueryBuilder<GiftCardBrand> | UpdateQueryBuilder<GiftCardBrand> | DeleteQueryBuilder<GiftCardBrand>, filter: GiftCardBrandFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<GiftCardBrand>, filter: GiftCardBrandFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}