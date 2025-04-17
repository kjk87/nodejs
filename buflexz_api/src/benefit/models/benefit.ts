import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Benefit } from "../entities/benefit";
import { BenefitFilter } from "../services/benefit";


@Service()
export class BenefitModel extends CoreModel<Benefit> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, Benefit)
    }

    public async setFilter(builder: SelectQueryBuilder<Benefit> | UpdateQueryBuilder<Benefit> | DeleteQueryBuilder<Benefit>, filter: BenefitFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Benefit>, filter: BenefitFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}