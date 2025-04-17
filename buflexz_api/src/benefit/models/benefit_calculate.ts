import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Benefit } from "../entities/benefit";
import { BenefitCalculate } from "../entities/benefit_calculate";
import { BenefitCalculateFilter } from "../services/benefit_calculate";


@Service()
export class BenefitCalculateModel extends CoreModel<BenefitCalculate> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BenefitCalculate)
    }

    public async setFilter(builder: SelectQueryBuilder<BenefitCalculate> | UpdateQueryBuilder<BenefitCalculate> | DeleteQueryBuilder<BenefitCalculate>, filter: BenefitCalculateFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.startDate && filter.endDate) {
                builder.andWhere('calculate_month >= :startDate and calculate_month <= :endDate', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<BenefitCalculate>, filter: BenefitCalculateFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}