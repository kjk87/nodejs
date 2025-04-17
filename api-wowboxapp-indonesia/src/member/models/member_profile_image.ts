import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { MemberProfileImage } from "../entities/member_profile_image";
import { MemberProfileImageFilter } from "../services/member_profile_image";

@Service()
export class MemberProfileImageModel extends CoreModel<MemberProfileImage> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, MemberProfileImage);
    }

    public async setFilter(builder: SelectQueryBuilder<MemberProfileImage> | UpdateQueryBuilder<MemberProfileImage> | DeleteQueryBuilder<MemberProfileImage>, filter: MemberProfileImageFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MemberProfileImage>, filter: MemberProfileImageFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}