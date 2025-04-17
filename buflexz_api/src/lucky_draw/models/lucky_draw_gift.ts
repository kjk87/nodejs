import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawGiftFilter } from "../services/lucky_draw_gift";
import { LuckyDrawGift } from "../entities/lucky_draw_gift";


@Service()
export class LuckyDrawGiftModel extends CoreModel<LuckyDrawGift> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LuckyDrawGift);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawGift> | UpdateQueryBuilder<LuckyDrawGift> | DeleteQueryBuilder<LuckyDrawGift>, filter: LuckyDrawGiftFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyDrawSeqNo) {
                builder.andWhere('lucky_draw_seq_no = :luckyDrawSeqNo', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.grade) {
                builder.andWhere('grade = :grade', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawGift>, filter: LuckyDrawGiftFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}