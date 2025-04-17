import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxReview } from "../entities/luckybox_review";
import { LuckyboxReviewListFilter } from "../services/luckybox_review";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxReviewModel extends CoreModel<LuckyboxReview> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxReview);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxReview> | UpdateQueryBuilder<LuckyboxReview> | DeleteQueryBuilder<LuckyboxReview>, filter: LuckyboxReviewListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.luckyboxPurchaseItemSeqNo) {
                builder.andWhere('luckybox_purchase_item_seq_no = :luckyboxPurchaseItemSeqNo', filter);
            }
            if(filter.review) {
                builder.andWhere('review = :review', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.modDatetime) {
                builder.andWhere('mod_datetime = :modDatetime', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxReview>, filter: LuckyboxReviewListFilter, entity?: any): Promise<void> {
        builder.addSelect(`(select count(1) from luckybox_reply where luckybox_review_seq_no = entity.seq_no and status = 1)`, 'entity_replyCount');
        builder.addSelect(`(select product_name from luckybox_purchase_item t1 where t1.seq_no = entity.luckybox_purchase_item_seq_no) `, 'entity_productName');
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}