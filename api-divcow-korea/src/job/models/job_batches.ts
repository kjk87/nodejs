import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { JobBatches } from "../entities/job_batches";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { JobBatchesListFilter } from "../services/job_batches";

@Service()
export class JobBatchesModel extends CoreModel<JobBatches> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, JobBatches);
    }

    public async setFilter(builder: SelectQueryBuilder<JobBatches> | UpdateQueryBuilder<JobBatches> | DeleteQueryBuilder<JobBatches>, filter: JobBatchesListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.total_jobs) {
                builder.andWhere('total_jobs = :total_jobs', filter);
            }
            if(filter.pending_jobs) {
                builder.andWhere('pending_jobs = :pending_jobs', filter);
            }
            if(filter.failed_jobs) {
                builder.andWhere('failed_jobs = :failed_jobs', filter);
            }
            if(filter.failed_job_ids) {
                builder.andWhere('failed_job_ids = :failed_job_ids', filter);
            }
            if(filter.options) {
                builder.andWhere('options = :options', filter);
            }
            if(filter.cancelled_at) {
                builder.andWhere('cancelled_at = :cancelled_at', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.finished_at) {
                builder.andWhere('finished_at = :finished_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<JobBatches>, filter: JobBatchesListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}