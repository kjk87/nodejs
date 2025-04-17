import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawWinReply } from "../entities/lucky_draw_win_reply";
import { LuckyDrawWinReplyFilter } from "../services/lucky_draw_win_reply";


@Service()
export class LuckyDrawWinReplyModel extends CoreModel<LuckyDrawWinReply> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyDrawWinReply);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawWinReply> | UpdateQueryBuilder<LuckyDrawWinReply> | DeleteQueryBuilder<LuckyDrawWinReply>, filter: LuckyDrawWinReplyFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.luckyDrawWinSeqNo) {
                builder.andWhere('lucky_draw_win_seq_no = :luckyDrawWinSeqNo', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawWinReply>, filter: LuckyDrawWinReplyFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}