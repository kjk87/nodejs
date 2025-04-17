import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { FailedJobs } from "../entities/failed_jobs";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { FailedJobsListFilter } from "../services/failed_jobs";

@Service()
export class FailedJobsModel extends CoreModel<FailedJobs> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, FailedJobs);
    }

    public async setFilter(builder: SelectQueryBuilder<FailedJobs> | UpdateQueryBuilder<FailedJobs> | DeleteQueryBuilder<FailedJobs>, filter: FailedJobsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.uuid) {
                builder.andWhere('uuid = :uuid', filter);
            }
            if(filter.connection) {
                builder.andWhere('connection = :connection', filter);
            }
            if(filter.queue) {
                builder.andWhere('queue = :queue', filter);
            }
            if(filter.payload) {
                builder.andWhere('payload = :payload', filter);
            }
            if(filter.exception) {
                builder.andWhere('exception = :exception', filter);
            }
            if(filter.failed_at) {
                builder.andWhere('failed_at = :failed_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<FailedJobs>, filter: FailedJobsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}