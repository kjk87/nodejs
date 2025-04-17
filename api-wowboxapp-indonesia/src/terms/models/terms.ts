import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Terms } from "../entities/terms";
import { TermsFilter } from "../services/terms";


@Service()
export class TermsModel extends CoreModel<Terms> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Terms);
    }

    public async setFilter(builder: SelectQueryBuilder<Terms> | UpdateQueryBuilder<Terms> | DeleteQueryBuilder<Terms>, filter: TermsFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.code) {
                builder.andWhere('code = :code', filter);
            }
            if(filter.nation) {
                builder.andWhere('nation = :nation', filter);
            }
            if(filter.compulsory) {
                builder.andWhere('compulsory = :compulsory', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Terms>, filter: TermsFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}