import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Partner } from "../entities/partner";
import { PartnerFilter } from "../services/partner";

@Service()
export class PartnerModel extends CoreModel<Partner> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Partner);
    }

    public async setFilter(builder: SelectQueryBuilder<Partner> | UpdateQueryBuilder<Partner> | DeleteQueryBuilder<Partner>, filter: PartnerFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.parents) {
                builder.andWhere('parents = :parents', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Partner>, filter: PartnerFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}