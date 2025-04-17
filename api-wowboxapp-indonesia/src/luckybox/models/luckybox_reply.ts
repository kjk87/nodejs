import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxReply } from "../entities/luckybox_reply";
import { LuckyboxReplyListFilter } from "../services/luckybox_reply";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxReplyModel extends CoreModel<LuckyboxReply> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxReply);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxReply> | UpdateQueryBuilder<LuckyboxReply> | DeleteQueryBuilder<LuckyboxReply>, filter: LuckyboxReplyListFilter, entity?: any): Promise<void> {
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
            if(filter.luckyboxReviewSeqNo) {
                builder.andWhere('luckybox_review_seq_no = :luckyboxReviewSeqNo', filter);
            }
            if(filter.reply) {
                builder.andWhere('reply = :reply', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.modDatetime) {
                builder.andWhere('mod_datetime = :modDatetime', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxReply>, filter: LuckyboxReplyListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}