import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel, IPaging } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Lottery } from "../entities/lottery";
import { LotteryListFilter } from "../services/lottery";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LotteryModel extends CoreModel<Lottery> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Lottery);
    }

    public async setFilter(builder: SelectQueryBuilder<Lottery> | UpdateQueryBuilder<Lottery> | DeleteQueryBuilder<Lottery>, filter: LotteryListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('entity.seq_no = :seqNo', filter);
            }
            if(filter.lotteryRound) {
                builder.andWhere('lottery_round = :lotteryRound', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.eventStartDatetime) {
                builder.andWhere('event_start_datetime <= :eventStartDatetime', filter);
            }
            if(filter.eventEndDatetime) {
                builder.andWhere('event_end_datetime >= :eventEndDatetime', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.announceDatetime) {
                builder.andWhere('announce_datetime <= :announceDatetime', filter);
            }
            if(filter.no1) {
                builder.andWhere('no1 = :no1', filter);
            }
            if(filter.no2) {
                builder.andWhere('no2 = :no2', filter);
            }
            if(filter.no3) {
                builder.andWhere('no3 = :no3', filter);
            }
            if(filter.no4) {
                builder.andWhere('no4 = :no4', filter);
            }
            if(filter.no5) {
                builder.andWhere('no5 = :no5', filter);
            }
            if(filter.no6) {
                builder.andWhere('no6 = :no6', filter);
            }
            if(filter.bonusNo) {
                builder.andWhere('bonus_no = :bonusNo', filter);
            }
            if(filter.firstType) {
                builder.andWhere('first_type = :firstType', filter);
            }
            if(filter.firstMoney) {
                builder.andWhere('first_money = :firstMoney', filter);
            }
            if(filter.secondType) {
                builder.andWhere('second_type = :secondType', filter);
            }
            if(filter.secondMoney) {
                builder.andWhere('second_money = :secondMoney', filter);
            }
            if(filter.thirdType) {
                builder.andWhere('third_type = :thirdType', filter);
            }
            if(filter.thirdMoney) {
                builder.andWhere('third_money = :thirdMoney', filter);
            }
            if(filter.forthType) {
                builder.andWhere('forth_type = :forthType', filter);
            }
            if(filter.forthMoney) {
                builder.andWhere('forth_money = :forthMoney', filter);
            }
            if(filter.fifthType) {
                builder.andWhere('fifth_type = :fifthType', filter);
            }
            if(filter.fifthMoney) {
                builder.andWhere('fifth_money = :fifthMoney', filter);
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.firstAdd) {
                builder.andWhere('first_add = :firstAdd', filter);
            }
            if(filter.secondAdd) {
                builder.andWhere('second_add = :secondAdd', filter);
            }
            if(filter.thirdAdd) {
                builder.andWhere('third_add = :thirdAdd', filter);
            }
            if(filter.forthAdd) {
                builder.andWhere('forth_add = :forthAdd', filter);
            }
            if(filter.fifthAdd) {
                builder.andWhere('fifth_add = :fifthAdd', filter);
            }
            if(filter.modDatetime) {
                builder.andWhere('mod_datetime = :modDatetime', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Lottery>, filter: LotteryListFilter, entity?: any): Promise<void> {

        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async round(date: string) {

        let manager: EntityManager = BUFLEXZ_DATASOURCE.createEntityManager();
        
        return await manager.query(`
            SELECT 
                lottery_round AS lotteryRound
            FROM lottery
            WHERE status = 'complete'
            AND announce_datetime <= '${date}'
            ORDER BY lottery_round DESC
            LIMIT 10
        `)
    }
}