import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { ProfitPartner } from "../entities/profit_partner";
import { ProfitPartnerFilter } from "../services/profit_partner";

@Service()
export class ProfitPartnerModel extends CoreModel<ProfitPartner> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, ProfitPartner);
    }

    public async setFilter(builder: SelectQueryBuilder<ProfitPartner> | UpdateQueryBuilder<ProfitPartner> | DeleteQueryBuilder<ProfitPartner>, filter: ProfitPartnerFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.parentsPartner) {
                builder.andWhere('parents_partner = :parentsPartner', filter);
            }
            if(filter.calculateMonth) {
                builder.andWhere('calculate_month = :calculateMonth', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<ProfitPartner>, filter: ProfitPartnerFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getTotalProfit(filter?: ProfitPartnerFilter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT ifnull(SUM(bonus_profit), 0) + ifnull(SUM(ad_profit), 0) + ifnull(SUM(ball_profit), 0) AS sum_total FROM profit_partner
            WHERE user_key = ?
        `, [filter.userKey]))[0].sum_total
    }

    public async getTotalBonusProfit(filter?: ProfitPartnerFilter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT ifnull(SUM(bonus_profit), 0) AS sum_total FROM profit_partner
            WHERE user_key = ?
        `, [filter.userKey]))[0].sum_total
    }
}