import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel, IPaging } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LotteryJoin } from "../entities/lottery_join";
import { LotteryJoinUserListFilter } from "../services/lottery_join_user";
import { getRandomNum, now, safeNumber, shuffle } from "../../common/services/util";
import { LotteryJoinUser } from "../entities/lottery_join_user";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LotteryJoinUserModel extends CoreModel<LotteryJoinUser> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LotteryJoinUser);
    }

    public async setFilter(builder: SelectQueryBuilder<LotteryJoinUser> | UpdateQueryBuilder<LotteryJoinUser> | DeleteQueryBuilder<LotteryJoinUser>, filter: LotteryJoinUserListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.lotteryRound) {
                builder.andWhere('lotteryRound = :lotteryRound', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
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
            if(filter.joinType) {
                builder.andWhere('join_type = :joinType', filter);
            }
            if(filter.regDatetime) {
                if(filter.regDatetime.min) {
                    builder.andWhere('reg_datetime >= :min', {min: filter.regDatetime.min});
                }
                if(filter.regDatetime.max) {
                    builder.andWhere('reg_datetime <= :max', {max: filter.regDatetime.max});
                }
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LotteryJoinUser>, filter: LotteryJoinUserListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getJoinList(userKey: string, lotteryRound: number, offset: number, limit: number) {
        return await BUFLEXZ_DATASOURCE.manager.query(`
            SELECT 
                seq_no AS seqNo,
                lottery_round AS lotteryRound,
                user_key AS userKey,
                no1, no2, no3, no4, no5, no6,
                join_type AS joinType,
                DATE_FORMAT(reg_datetime, '%Y-%m-%d %T') AS regDatetime
            FROM lottery_join_user_${lotteryRound}
            WHERE
            user_key = '${userKey}'
            ORDER BY seq_no DESC
            LIMIT ${limit}
            OFFSET ${offset};
        `)
    }

    public async getJoinCount(userKey: string, lotteryRound: number) {
        return (await BUFLEXZ_DATASOURCE.manager.query(`
            SELECT 
                count(*) as count
            FROM lottery_join_user_${lotteryRound}
            WHERE
                user_key = '${userKey}'`))[0].count;
    }
}

