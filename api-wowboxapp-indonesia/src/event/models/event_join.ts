import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, getManager, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventJoin } from "../entities/event_join";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

export class EventJoinModel extends CoreModel<EventJoin> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventJoin)
    }

    public async setFilter(builder: SelectQueryBuilder<EventJoin> | UpdateQueryBuilder<EventJoin> | DeleteQueryBuilder<EventJoin>, filter: any, entity?: any): Promise<void> {
        if(filter){
            if(filter.user_key) {
                this.equalsIn(builder, filter, 'user_key', 'entity');
            }
            if(filter.event_seq_no) {
                this.equalsIn(builder, filter, 'event_seq_no', 'entity');
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<EventJoin>, filter: any = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getExists(eventSeqNo: number, userKey: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT EXISTS (
                SELECT seq_no
                FROM event_join
                WHERE
                    event_seq_no=${eventSeqNo}
                    AND user_key='${userKey}'
            ) as _exists
        `)
    }

    public async getMyBuyJoinCountAndBuyType(filter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        let joinDatetimeClause = '';
        if(filter.join_start_date && filter.join_end_date) {
            joinDatetimeClause = `
                AND join_datetime >= '${filter.join_start_date}'
                AND join_datetime <= '${filter.join_end_date}'
            `;
        }
        
        return await manager.query(`
            SELECT
                COUNT(*) as _count
            FROM event_join
            WHERE
                event_seq_no=${filter.event_seq_no}
                AND user_key='${filter.user_key}'
                AND is_buy = 1
                ${joinDatetimeClause}
        `)
    }

    public async findMaxSeqNo(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT MAX(seq_no) as maxSeqNo
            FROM event_join
            WHERE event_seq_no = ${eventSeqNo}
        `)
    }

    public async getEventLastJoin(userKey: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT DATE_FORMAT(EJ.join_datetime,'%Y-%m-%d %H:%i:%S') AS joinDatetime
            FROM event_join EJ
            INNER JOIN event E ON E.seq_no=EJ.event_seq_no
            WHERE EJ.user_key = '${userKey}'
            AND E.primary_type = 'goodluck'
            AND E.reward >= 0
            ORDER BY EJ.seq_no DESC LIMIT 1
        `)
    }


}