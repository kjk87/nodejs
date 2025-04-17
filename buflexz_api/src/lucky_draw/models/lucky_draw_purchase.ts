import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel, IPaging } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawPurchaseFilter } from "../services/lucky_draw_purchase";
import { LuckyDrawPurchase } from "../entities/lucky_draw_purchase";
import { MemberA } from "../../member/entities/member_a";
import { now } from "../../common/services/util";
import { LuckyDraw } from "../entities/lucky_draw";


@Service()
export class LuckyDrawPurchaseModel extends CoreModel<LuckyDrawPurchase> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, LuckyDrawPurchase);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawPurchase> | UpdateQueryBuilder<LuckyDrawPurchase> | DeleteQueryBuilder<LuckyDrawPurchase>, filter: LuckyDrawPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyDrawSeqNo) {
                builder.andWhere('lucky_draw_seq_no = :luckyDrawSeqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawPurchase>, filter: LuckyDrawPurchaseFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getJoinCount(luckyDrawSeqNo:number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`select ifnull(sum(engaged_count),0) as count from lucky_draw_purchase_${luckyDrawSeqNo} where status = 'active'`))[0].count
    }

    public async getMyJoinCount(filter: LuckyDrawPurchaseFilter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`select count(*) as count from lucky_draw_purchase_${filter.luckyDrawSeqNo} where status = 'active' and user_key = '${filter.userKey}'`))[0].count
    }

    public async getTotalMyJoinCount(member:MemberA, luckyDrawList:LuckyDraw[], manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();
        let query: string = '';
        for(let i = 0; i < luckyDrawList.length; i ++){
            query += `select count(*) as count from lucky_draw_purchase_${luckyDrawList[i].seqNo} where user_key = '${member.userKey}' `
            if(i < luckyDrawList.length - 1){
                query += `union `
            }
        }

        let res = await manager.query(query);
        let count = 0;
        for(let data of res){
            count += data.count;
        }

        return count;
    }

    public async getTotalMyJoinList(member:MemberA, luckyDrawList:LuckyDraw[], paging: IPaging, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();
        let query: string = '';
        for(let i = 0; i < luckyDrawList.length; i ++){
            query += `select seq_no as seqNo,
             lucky_draw_seq_no as luckyDrawSeqNo,
             user_key as userKey,
             title,
             win_number as winNumber,
             DATE_FORMAT(reg_datetime, '%Y-%m-%d %T') AS regDatetime,
             DATE_FORMAT(mod_datetime, '%Y-%m-%d %T') AS modDatetime,
             DATE_FORMAT(expire_datetime, '%Y-%m-%d %T') AS expireDatetime,
             engaged_price as engagedPrice,
             engaged_count as engagedCount,
             status,
             engage_type as engageType,
             buyer_nation as buyerNation,
             buyer_name as buyerName,
             buyer_tel as buyerTel
             from lucky_draw_purchase_${luckyDrawList[i].seqNo} where user_key = '${member.userKey}' `
            if(i < luckyDrawList.length - 1){
                query += `union `
            }
        }

        query += ` order by luckyDrawSeqNo desc, seqNo desc limit ${paging.limit} offset ${(paging.page - 1)*paging.limit}`

        return await manager.query(query);
    }

    public async purchase(luckyDrawPurchase: LuckyDrawPurchase, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager()
        
        let query: string = '';
        let date: string = now();

        query += `insert into lucky_draw_purchase_${luckyDrawPurchase.luckyDrawSeqNo}(lucky_draw_seq_no, user_key, title, win_number, reg_datetime, mod_datetime, engaged_price, engaged_count, engage_type, status, buyer_nation, buyer_name) values`;

        query += "(";
        query += luckyDrawPurchase.luckyDrawSeqNo;
        query += ',';
        query += "'" + luckyDrawPurchase.userKey + "'";
        query += ',';
        query += "'" + luckyDrawPurchase.title + "'";
        query += ',';
        query += "'" + luckyDrawPurchase.winNumber + "'";
        query += `, '${date}'`;
        query += `, '${date}'`;
        query += ',';
        query += luckyDrawPurchase.engagedPrice;
        query += ',';
        query += luckyDrawPurchase.engagedCount;
        query += ',';
        query += "'" + luckyDrawPurchase.engageType + "'";
        query += ',';
        query += "'" + luckyDrawPurchase.status + "'";
        query += ',';
        query += "'" + luckyDrawPurchase.buyerNation + "'";
        query += ',';
        query += "'" + luckyDrawPurchase.buyerName + "')";


        await Promise.all([
            manager.query(query)
        ])

    }
}