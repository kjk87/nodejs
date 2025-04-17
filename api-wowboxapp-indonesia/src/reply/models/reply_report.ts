import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { ReplyReport } from "../entities/reply_report";
import { ReplyReportFilter } from "../service/reply_report";


@Service()
export class ReplyReportModel extends CoreModel<ReplyReport> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, ReplyReport);
    }

    public async setFilter(builder: SelectQueryBuilder<ReplyReport> | UpdateQueryBuilder<ReplyReport> | DeleteQueryBuilder<ReplyReport>, filter: ReplyReportFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.luckyDrawWinReplySeqNo) {
                builder.andWhere('lucky_draw_win_reply_seq_no = :luckyDrawWinReplySeqNo', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<ReplyReport>, filter: ReplyReportFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}