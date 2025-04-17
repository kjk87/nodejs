import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, getManager, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventReply } from "../entities/event_reply";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

export class EventReplyModel extends CoreModel<EventReply> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventReply)
    }

    public async setFilter(builder: SelectQueryBuilder<EventReply> | UpdateQueryBuilder<EventReply> | DeleteQueryBuilder<EventReply>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.event_review_seq_no) {
                this.equalsIn(builder, filter, 'event_review_seq_no', 'entity')
            }

            if(filter.event_seq_no) {
                this.equalsIn(builder, filter, 'event_seq_no', 'entity')
            }

            if(filter.event_win_seq_no) {
                this.equalsIn(builder, filter, 'event_win_seq_no', 'entity')
            }
            if(filter.status) {
                this.equalsIn(builder, filter, 'status', 'entity')
            }
        }
    }

    public async getCount(eventWinSeqNo, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT COUNT(1) as _count 
            FROM event_reply ER 
            WHERE ER.event_win_seq_no = ${eventWinSeqNo} AND ER.status = 1
        `)
    }

    public async getCountByEventWinSeqNo(eventWinSeqNo, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT COUNT(event_win_seq_no) as _count, event_win_seq_no as eventWinSeqNo 
            FROM event_reply ER 
            WHERE ER.event_win_seq_no in (?) AND ER.status = 1
            group by event_win_seq_no
        `, [eventWinSeqNo])
    }
}