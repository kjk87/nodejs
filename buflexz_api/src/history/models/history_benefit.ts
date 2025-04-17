import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { HistoryBenefit } from "../entities/histroy_benefit";
import { HistoryBenefitFilter } from "../services/history";

@Service()
export class HistoryBenefitModel extends CoreModel<HistoryBenefit> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, HistoryBenefit);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryBenefit> | UpdateQueryBuilder<HistoryBenefit> | DeleteQueryBuilder<HistoryBenefit>, filter: HistoryBenefitFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.startDate && filter.endDate) {
                builder.andWhere('reg_datetime >= :startDate and reg_datetime <= :endDate', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<HistoryBenefit>, filter: HistoryBenefitFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getSumBenfit(filter?: HistoryBenefitFilter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT ifnull(SUM(benefit), 0) as sum_total FROM history_benefit
            WHERE user_key = ? and reg_datetime >= ? and reg_datetime <= ?
        `, [filter.userKey, filter.startDate, filter.endDate]))[0].sum_total
    }
}