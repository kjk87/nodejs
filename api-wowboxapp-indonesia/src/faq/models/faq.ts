import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Faq } from '../entities/faq';
import { FaqFilter } from "../service/faq";

@Service()
export class FaqModel extends CoreModel<Faq> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Faq);
    }

    public async setFilter(builder: SelectQueryBuilder<Faq> | UpdateQueryBuilder<Faq> | DeleteQueryBuilder<Faq>, filter: FaqFilter, entity?: any): Promise<void> {
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
            if(filter.category) {
                builder.andWhere('category = :category', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Faq>, filter: FaqFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}