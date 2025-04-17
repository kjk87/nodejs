import { FaqCategory } from './../entities/faq_category';
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { FaqCategoryFilter } from '../service/faq';

@Service()
export class FaqCategoryModel extends CoreModel<FaqCategory> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, FaqCategory);
    }

    public async setFilter(builder: SelectQueryBuilder<FaqCategory> | UpdateQueryBuilder<FaqCategory> | DeleteQueryBuilder<FaqCategory>, filter: FaqCategoryFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<FaqCategory>, filter: FaqCategoryFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}