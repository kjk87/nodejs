import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel, IOrder, IPaging } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LotteryWin } from "../entities/lottery_win";
import { WinListFilter } from "../services/lottery_win";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { CoreListResponse } from "../../common/core/CoreListResponse";

@Service()
export class LotteryWinModel extends CoreModel<LotteryWin> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LotteryWin);
    }

    public async setFilter(builder: SelectQueryBuilder<LotteryWin> | UpdateQueryBuilder<LotteryWin> | DeleteQueryBuilder<LotteryWin>, filter: WinListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.lotteryRound) {
                builder.andWhere('entity.lottery_seq_no = :lotteryRound', filter);
            }

            if(filter.userKey) {
                builder.andWhere('entity.user_key = :userKey', filter);
            }
            if(filter.grade) {
                builder.andWhere('entity.grade < 4');
            }
            if(filter.status) {
                builder.andWhere('entity.status = :status', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LotteryWin>, filter: WinListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getOne(seqNo: number, lotteryRound: number, userKey: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT 
            
            seq_no as seqNo,
            lottery_round as lotteryRound,
            user_key as userKey,
            grade,
            gift_type as giftType,
            money,
            status,
            DATE_FORMAT(status_datetime, '%Y-%m-%d %T') AS statusDatetime,
            no1,
            no2,
            no3,
            no4,
            no5,
            no6,
            win_no1 as winNo1,
            win_no2 as winNo2,
            win_no3 as winNo3,
            win_no4 as winNo4,
            win_no5 as winNo5,
            win_no6 as winNo6,
            win_add as winAdd,
            DATE_FORMAT(join_datetime, '%Y-%m-%d %T') AS joinDatetime
            FROM lottery_win_${lotteryRound}
            WHERE seq_no = ?
            AND user_key = ?
            ORDER BY grade ASC
            limit 1
        `, [seqNo, userKey]))[0]
    }

    public async updateStatus(lotteryWin:LotteryWin, lotteryRound:number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`update lottery_win_${lotteryRound} set status = '${lotteryWin.status}', status_datetime = '${lotteryWin.statusDatetime}'
        where seq_no = ${lotteryWin.seqNo}` ));
    }

    public async myList(filter?: any, offset?: number, paging?: IPaging, entity?: any, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT 
            seq_no as seqNo,
            lottery_round as lotteryRound,
            user_key as userKey,
            grade,
            gift_type as giftType,
            money,
            status,
            DATE_FORMAT(status_datetime, '%Y-%m-%d %T') AS statusDatetime,
            no1,
            no2,
            no3,
            no4,
            no5,
            no6,
            win_no1 as winNo1,
            win_no2 as winNo2,
            win_no3 as winNo3,
            win_no4 as winNo4,
            win_no5 as winNo5,
            win_no6 as winNo6,
            win_add as winAdd,
            DATE_FORMAT(join_datetime, '%Y-%m-%d %T') AS joinDatetime
            FROM lottery_win_${filter.lotteryRound}
            WHERE user_key = ?
            ORDER BY grade ASC
            LIMIT ${paging.limit}
            OFFSET ${offset};
        `, [filter.userKey])
    }

    public async myListCount(filter?: any, order?: IOrder[], paging?: IPaging, entity?: any, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT count(*) as count FROM lottery_win_${filter.lotteryRound}
            WHERE user_key = ?
        `, [filter.userKey]))[0].count
    }

    public async receiveAll(filter?: any, order?: IOrder[], paging?: IPaging, entity?: any, manager?: EntityManager): Promise<LotteryWin[]> {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT 
            seq_no as seqNo,
            lottery_round as lotteryRound,
            user_key as userKey,
            grade,
            gift_type as giftType,
            money,
            status,
            DATE_FORMAT(status_datetime, '%Y-%m-%d %T') AS statusDatetime,
            no1,
            no2,
            no3,
            no4,
            no5,
            no6,
            win_no1 as winNo1,
            win_no2 as winNo2,
            win_no3 as winNo3,
            win_no4 as winNo4,
            win_no5 as winNo5,
            win_no6 as winNo6,
            win_add as winAdd,
            DATE_FORMAT(join_datetime, '%Y-%m-%d %T') AS joinDatetime
            FROM lottery_win_${filter.lotteryRound}
            WHERE user_key = ?
            AND status = 'active'
            limit 50
        `, [filter.userKey])
    }

    public async remainCount(filter?: any, order?: IOrder[], paging?: IPaging, entity?: any, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT count(*) as count FROM lottery_win_${filter.lotteryRound}
            WHERE user_key = ?
            AND status = 'active'
        `, [filter.userKey]))[0].count
    }

    public async all(filter?: any, order?: IOrder[], entity?: any, manager?: EntityManager)  {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT 
            seq_no as seqNo,
            lottery_round as lotteryRound,
            user_key as userKey,
            grade,
            gift_type as giftType,
            money,
            status,
            DATE_FORMAT(status_datetime, '%Y-%m-%d %T') AS statusDatetime,
            no1,
            no2,
            no3,
            no4,
            no5,
            no6,
            win_no1 as winNo1,
            win_no2 as winNo2,
            win_no3 as winNo3,
            win_no4 as winNo4,
            win_no5 as winNo5,
            win_no6 as winNo6,
            win_add as winAdd,
            DATE_FORMAT(join_datetime, '%Y-%m-%d %T') AS joinDatetime
            FROM lottery_win_${filter.lotteryRound}
            ORDER BY grade ASC
            limit 100
        `)
    }

    public async winnerCount(filter?: any, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT count(*) as count FROM lottery_win_${filter.lotteryRound}
        `))[0].count;
    }
}