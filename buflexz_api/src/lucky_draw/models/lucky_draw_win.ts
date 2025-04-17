import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawWin } from "../entities/lucky_draw_win";
import { LuckyDrawWinFilter } from "../services/lucky_draw_win";


@Service()
export class LuckyDrawWinModel extends CoreModel<LuckyDrawWin> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LuckyDrawWin);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawWin> | UpdateQueryBuilder<LuckyDrawWin> | DeleteQueryBuilder<LuckyDrawWin>, filter: LuckyDrawWinFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.luckyDrawSeqNo) {
                builder.andWhere('entity.lucky_draw_seq_no = :luckyDrawSeqNo', filter);
            }
            if(filter.luckyDrawPurchaseSeqNo) {
                builder.andWhere('lucky_draw_purchase_seq_no = :luckyDrawPurchaseSeqNo', filter);
            }
            if(filter.luckyDrawGiftSeqNo) {
                builder.andWhere('lucky_draw_gift_seq_no = :luckyDrawGiftSeqNo', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawWin>, filter: LuckyDrawWinFilter, entity?: any): Promise<void> {
        builder.addSelect(`(select count(*) from lucky_draw_win_reply ldwr where ldwr.lucky_draw_win_seq_no = entity.seq_no)`, 'entity_replyCount');
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}