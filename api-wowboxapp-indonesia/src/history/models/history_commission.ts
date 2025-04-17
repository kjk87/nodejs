import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { HistoryCommission } from "../entities/histroy_commission";
import { HistoryCommissionFilter } from "../services/history";

@Service()
export class HistoryCommissionlModel extends CoreModel<HistoryCommission> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, HistoryCommission);
    }

    public async setFilter(builder: SelectQueryBuilder<HistoryCommission> | UpdateQueryBuilder<HistoryCommission> | DeleteQueryBuilder<HistoryCommission>, filter: HistoryCommissionFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.partner) {
                builder.andWhere('partner = :partner', filter);
            }
            if(filter.startDate && filter.endDate) {
                builder.andWhere('reg_datetime >= :startDate and reg_datetime <= :endDate', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<HistoryCommission>, filter: HistoryCommissionFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getCommission(filter?: HistoryCommissionFilter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT ifnull(SUM(commission), 0) as sum_total FROM history_commission
            WHERE partner = ? and reg_datetime >= ? and reg_datetime <= ?
        `, [filter.partner, filter.startDate, filter.endDate]))[0].sum_total
    }
}