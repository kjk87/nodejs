import { EntityManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LotteryJoin } from "../entities/lottery_join";
import { LotteryJoinCreateParams, LotteryJoinListFilter } from "../services/lottery_join";
import { getRandomNum, now, safeNumber, shuffle } from "../../common/services/util";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Lottery } from "../entities/lottery";
import { Request } from 'express'; 
import moment = require("moment-timezone");
import { MemberA } from "../../member/entities/member_a";

@Service()
export class LotteryJoinModel extends CoreModel<LotteryJoin> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LotteryJoin);
    }

    public async setFilter(builder: SelectQueryBuilder<LotteryJoin> | UpdateQueryBuilder<LotteryJoin> | DeleteQueryBuilder<LotteryJoin>, filter: LotteryJoinListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.lotteryRound) {
                builder.andWhere('lottery_seq_no = :lotteryRound', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.joinType) {
                builder.andWhere('join_type = :joinType', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LotteryJoin>, filter: LotteryJoinListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async procJoinLottery(member: MemberA, lottery: Lottery, params: LotteryJoinCreateParams, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager()
        let range: number[] = [...new Array(45).keys()];
        let no = getRandomNum(1, 1, 28);
        let query1: string = '';
        let query2: string = '';
        let date: string = now();

        query1 += `insert into lottery_join${no}(seq_no, user_key, lottery_round, no1, no2, no3, no4, no5, no6, join_datetime) values`;
        if(member.recommendeeKey){
            query2 += `insert into lottery_join_user_${lottery.lotteryRound}(seq_no, user_key, lottery_round, no1, no2, no3, no4, no5, no6, join_type, recommendee_key, reg_datetime) values`;
        }else{
            query2 += `insert into lottery_join_user_${lottery.lotteryRound}(seq_no, user_key, lottery_round, no1, no2, no3, no4, no5, no6, join_type, reg_datetime) values`;
        }
        

        for(let i = 0; i < params.count; i++) {
            let qy: string = "(";
            qy += "'" + (moment().format('YYYYMMDDHHmmssSSS') + getRandomNum(4, 0, 9) + i) + "'";
            qy += ',';
            qy += "'" + member.userKey + "'";
            qy += ',';
            qy += lottery.lotteryRound;

            shuffle(range);

            let number = [range[0]+1, range[1]+1, range[2]+1, range[3]+1, range[4]+1, range[5]+1].sort((a, b)=> {return a - b});
            qy += ',';
            qy += number.join(',');
            query1 += qy;
            query2 += qy;

            query1 += `, '${date}')`;
            query2 += `, '${params.joinType}'`
            if(member.recommendeeKey){
                query2 += `, '${member.recommendeeKey}'`;
            }

            query2 += `, '${date}')`;
            

            if(i < params.count -1) {
                query1 += `,`;
                query2 += `,`;
            }
        }


        await Promise.all([
            manager.query(query1),
            manager.query(query2)
        ])

    }

}