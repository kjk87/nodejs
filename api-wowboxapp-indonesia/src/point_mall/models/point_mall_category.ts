import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { PointMallCategory } from "../entities/point_mall_category";
import { PointMallCategoryFilter } from "../services/point_mall_category";

@Service()
export class PointMallCategoryModel extends CoreModel<PointMallCategory> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, PointMallCategory);
    }

    public async setFilter(builder: SelectQueryBuilder<PointMallCategory> | UpdateQueryBuilder<PointMallCategory> | DeleteQueryBuilder<PointMallCategory>, filter: PointMallCategoryFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<PointMallCategory>, filter: PointMallCategoryFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}