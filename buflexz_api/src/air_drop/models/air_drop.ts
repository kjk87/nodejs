import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { AirDrop } from "../entities/air_drop";
import { AirDropFilter } from "../services/air_drop";

@Service()
export class AirDropModel extends CoreModel<AirDrop> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, AirDrop);
    }

    public async setFilter(builder: SelectQueryBuilder<AirDrop> | UpdateQueryBuilder<AirDrop> | DeleteQueryBuilder<AirDrop>, filter: AirDropFilter, entity?: any): Promise<void> {
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
            if(filter.wallet) {
                builder.andWhere('wallet = :wallet', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<AirDrop>, filter: AirDropFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}