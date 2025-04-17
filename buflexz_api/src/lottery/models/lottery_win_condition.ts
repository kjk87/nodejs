import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LotteryWinCondition } from "../entities/lottery_win_condition";
import { LotteryWinConditionListFilter } from "../services/lottery_win_condition";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LotteryWinConditionModel extends CoreModel<LotteryWinCondition> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LotteryWinCondition);
    }

    public async setFilter(builder: SelectQueryBuilder<LotteryWinCondition> | UpdateQueryBuilder<LotteryWinCondition> | DeleteQueryBuilder<LotteryWinCondition>, filter: LotteryWinConditionListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.lotteryRound) {
                builder.andWhere('lottery_round = :lotteryRound', filter);
            }
            if(filter.firstGrade) {
                builder.andWhere('first_grade = :firstGrade', filter);
            }
            if(filter.secondGrade) {
                builder.andWhere('second_grade = :secondGrade', filter);
            }
            if(filter.thirdGrade) {
                builder.andWhere('third_grade = :thirdGrade', filter);
            }
            if(filter.forthGrade) {
                builder.andWhere('forth_grade = :forthGrade', filter);
            }
            if(filter.fifthGrade) {
                builder.andWhere('fifth_grade = :fifthGrade', filter);
            }
            if(filter.firstMoney) {
                builder.andWhere('first_money = :firstMoney', filter);
            }
            if(filter.secondMoney) {
                builder.andWhere('second_money = :secondMoney', filter);
            }
            if(filter.thirdMoney) {
                builder.andWhere('third_money = :thirdMoney', filter);
            }
            if(filter.forthMoney) {
                builder.andWhere('forth_money = :forthMoney', filter);
            }
            if(filter.fifthMoney) {
                builder.andWhere('fifth_money = :fifthMoney', filter);
            }
            if(filter.winnerCount) {
                builder.andWhere('winner_count = :winnerCount', filter);
            }
            if(filter.winnerUsdtAmount) {
                builder.andWhere('winner_usdt_amount = :winnerUsdtAmount', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LotteryWinCondition>, filter: LotteryWinConditionListFilter, entity?: any): Promise<void> {
        		if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}