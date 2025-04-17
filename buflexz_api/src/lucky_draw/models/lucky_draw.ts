import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { LuckyDraw } from "../entities/lucky_draw";
import { LuckyDrawFilter } from "../services/lucky_draw";


@Service()
export class LuckyDrawModel extends CoreModel<LuckyDraw> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LuckyDraw);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDraw> | UpdateQueryBuilder<LuckyDraw> | DeleteQueryBuilder<LuckyDraw>, filter: LuckyDrawFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.aos) {
                builder.andWhere('aos = :aos', filter);
            }
            if(filter.ios) {
                builder.andWhere('ios = :ios', filter);
            }
            if(filter.announceType) {
                builder.andWhere('announce_type = :announceType', filter);
            }
            if(filter.engageType) {
                builder.andWhere('engage_type = :engageType', filter);
            }
            if(filter.privateKey) {
                builder.andWhere('private_key = :privateKey', filter);
            }
            if(filter.luckyDrawGroupSeqNo) {
                builder.andWhere('lucky_draw_group_seq_no = :luckyDrawGroupSeqNo', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDraw>, filter: LuckyDrawFilter, entity?: any): Promise<void> {
        
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}