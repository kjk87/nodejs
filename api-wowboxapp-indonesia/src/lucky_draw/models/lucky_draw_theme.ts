import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawTheme } from "../entities/lucky_draw_theme";
import { LuckyDrawThemeFilter } from "../services/lucky_draw_theme";


@Service()
export class LuckyDrawThemeModel extends CoreModel<LuckyDrawTheme> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyDrawTheme);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawTheme> | UpdateQueryBuilder<LuckyDrawTheme> | DeleteQueryBuilder<LuckyDrawTheme>, filter: LuckyDrawThemeFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
            if(filter.aos) {
                builder.andWhere('aos = :aos', filter);
            }
            if(filter.ios) {
                builder.andWhere('ios = :ios', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawTheme>, filter: LuckyDrawThemeFilter, entity?: any): Promise<void> {
        
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}