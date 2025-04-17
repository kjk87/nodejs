import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { CommunityApply } from "../entities/coummunity_apply";
import { CommunityApplyFilter } from "../services/community_apply";


@Service()
export class CommunityApplyModel extends CoreModel<CommunityApply> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, CommunityApply)
    }

    public async setFilter(builder: SelectQueryBuilder<CommunityApply> | UpdateQueryBuilder<CommunityApply> | DeleteQueryBuilder<CommunityApply>, filter: CommunityApplyFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<CommunityApply>, filter: CommunityApplyFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}