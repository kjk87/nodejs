import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Inquire } from "../entities/inquire";
import { InquireFilter } from "../service/inquire";


@Service()
export class InquireModel extends CoreModel<Inquire> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Inquire);
    }

    public async setFilter(builder: SelectQueryBuilder<Inquire> | UpdateQueryBuilder<Inquire> | DeleteQueryBuilder<Inquire>, filter: InquireFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Inquire>, filter: InquireFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}