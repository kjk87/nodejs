import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Jobs } from "../entities/jobs";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { JobsListFilter } from "../services/jobs";

@Service()
export class JobsModel extends CoreModel<Jobs> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Jobs);
    }

    public async setFilter(builder: SelectQueryBuilder<Jobs> | UpdateQueryBuilder<Jobs> | DeleteQueryBuilder<Jobs>, filter: JobsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.queue) {
                builder.andWhere('queue = :queue', filter);
            }
            if(filter.payload) {
                builder.andWhere('payload = :payload', filter);
            }
            if(filter.attempts) {
                builder.andWhere('attempts = :attempts', filter);
            }
            if(filter.reserved_at) {
                builder.andWhere('reserved_at = :reserved_at', filter);
            }
            if(filter.available_at) {
                builder.andWhere('available_at = :available_at', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Jobs>, filter: JobsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}