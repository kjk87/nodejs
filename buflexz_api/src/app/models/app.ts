import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { App } from "../entities/app";
import { AppFilter } from "../services/app";

@Service()
export class AppModel extends CoreModel<App> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, App);
    }

    public async setFilter(builder: SelectQueryBuilder<App> | UpdateQueryBuilder<App> | DeleteQueryBuilder<App>, filter: AppFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.platform) {
                builder.andWhere('platform = :platform', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.version) {
                builder.andWhere('version = :version', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<App>, filter: AppFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}