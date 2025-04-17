import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxReviewImage } from "../entities/luckybox_review_image";
import { LuckyboxReviewImageListFilter } from "../services/luckybox_review_image";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxReviewImageModel extends CoreModel<LuckyboxReviewImage> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxReviewImage);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxReviewImage> | UpdateQueryBuilder<LuckyboxReviewImage> | DeleteQueryBuilder<LuckyboxReviewImage>, filter: LuckyboxReviewImageListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxReviewSeqNo) {
                if(Array.isArray(filter.luckyboxReviewSeqNo)) {
                    builder.andWhere('luckybox_review_seq_no in(:luckyboxReviewSeqNo)', filter);
                } else {
                    builder.andWhere('luckybox_review_seq_no = :luckyboxReviewSeqNo', filter);
                } 
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxReviewImage>, filter: LuckyboxReviewImageListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}