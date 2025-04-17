import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { MemberDelivery } from "../entities/member_delivery";
import { MemberDeliveryFilter } from "../services/member_delivery";

@Service()
export class MemberDeliveryModel extends CoreModel<MemberDelivery> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, MemberDelivery);
    }

    public async setFilter(builder: SelectQueryBuilder<MemberDelivery> | UpdateQueryBuilder<MemberDelivery> | DeleteQueryBuilder<MemberDelivery>, filter: MemberDeliveryFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MemberDelivery>, filter: MemberDeliveryFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}