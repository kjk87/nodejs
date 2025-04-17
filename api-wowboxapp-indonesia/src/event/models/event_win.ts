import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, getManager, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventWin, EventWinJoin, EventWinJoinByUser, EventWinJoinPresent, EventWinJoinSeqNo, EventWinJoinWinnerList, EventWinJoinWinnerUser } from "../entities/event_win";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

export class EventWinModel extends CoreModel<EventWin> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventWin)
    }

    public async setFilter(builder: SelectQueryBuilder<EventWin> | UpdateQueryBuilder<EventWin> | DeleteQueryBuilder<EventWin>, filter: any, entity?: any): Promise<void> {
        if(filter) {

            if(filter.seqNo) {
                builder.andWhere(`entity.seq_no = :seqNo`, filter);
            }
            if(filter.eventSeqNo) {
                builder.andWhere(`entity.event_seq_no = :eventSeqNo`, filter);
            }
            if(filter.openStatus) {
                builder.andWhere(`entity.open_status = :openStatus`, filter);
            }
            if(filter.event_seq_no) this.equalsIn(builder, filter, 'event_seq_no', 'entity');
            if(filter.seq_no) this.equalsIn(builder, filter, 'seq_no', 'entity');
            if(filter.open_status) this.equalsIn(builder, filter, 'open_status', 'entity');

            if(filter.win_status) {
                builder.andWhere(`
                    ( event.win_announce_type = 'immediately' OR event.status = 'announce' )
                `, filter)
            }
            if(filter.review_present) this.equalsIn(builder, filter, 'review_present', 'eventGift');
            if(filter.app_type) {
                builder.andWhere(`event.app_type = :app_type`, filter);
            }
            if(filter.impression_not) {
                builder.andWhere(`(entity.impression != '' or entity.impression is not null)`);
            }
            if(filter.user_key) {
                builder.andWhere(`entity.user_key = :user_key`, filter);
            }
            if(filter.myWinListOnlyPresent) {
                builder.andWhere(`(select count(1) from event_review erv where erv.user_key = :user_key and erv.event_win_seq_no = entity.seq_no) = 0)`, filter)
            }
            if(filter.primary_type) {
                this.equalsIn(builder, filter, 'primary_type', 'event');
            }
            if(filter.lotto_times) {
                this.equalsIn(builder, filter, 'lotto_times', 'event');
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<EventWin>, filter: any = {}, entity?: any): Promise<void> {

        builder.addSelect(`(SELECT COUNT(1) FROM event_reply ER WHERE ER.event_win_seq_no = entity.seq_no AND ER.status = 1)`, 'entity_replyCount')
        if(entity == EventWinJoin) {
            if(filter && filter.joinColumn) {
                this.joinColumn(builder, filter.joinColumn); 
            } else {
                builder.innerJoinAndSelect('entity.memberTotal', 'memberTotal');
                builder.innerJoinAndSelect('entity.eventGift', 'eventGift', '(eventGift.seq_no = entity.gift_seq_no)');
            }
        } else if(entity == EventWinJoinPresent) {
            builder.innerJoinAndSelect('entity.event', 'event');
            builder.innerJoinAndSelect('entity.eventGift', 'eventGift', 'eventGift.seq_no = entity.gift_seq_no');
            builder.leftJoinAndSelect('entity.memberTotal', 'memberTotal');
        } else if(entity == EventWinJoinSeqNo) {
            builder.innerJoinAndSelect('entity.event', 'event');
            builder.innerJoinAndSelect('entity.memberTotal', 'memberTotal');
            builder.innerJoinAndSelect('entity.eventGift', 'eventGift', 'entity.event_seq_no = eventGift.event_seq_no')
        } else if(entity == EventWinJoinByUser) {
            builder.innerJoinAndSelect('entity.event', 'event');
            builder.leftJoinAndSelect('entity.eventGift', 'eventGift');
        } else if(entity == EventWinJoinWinnerUser) {
            builder.innerJoinAndSelect('entity.event', 'event', `entity.user_key = '${filter.user_key}'`);
            builder.innerJoinAndSelect('entity.memberTotal', 'memberTotal');
            builder.leftJoinAndSelect('entity.eventGift', 'eventGift', `entity.event_seq_no = eventGift.event_seq_no`);
        } else if(entity == EventWinJoinWinnerList) {
            builder.leftJoinAndSelect('entity.memberTotal', 'memberTotal');
            builder.leftJoinAndSelect('entity.eventGift', 'eventGift');
            builder.leftJoinAndSelect('entity.eventJoin', 'eventJoin');
            //builder.leftJoinAndSelect('eventJoin.lottoSelectedNumber', 'lottoSelectedNumber')
        }
    }

    public async getNewWinCountByUser(userKey: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
                COUNT(*) as _count
            FROM event_win EW
            WHERE
                EW.user_key='${userKey}'
                AND EW.open_status = 1
                AND EW.impression IS NULL
        `)
    }

    public async getExists(eventSeqNo: number, userKey: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT EXISTS (
                SELECT seq_no
                FROM event_win
                WHERE
                    event_seq_no=${eventSeqNo}
                    AND user_key='${userKey}'
            ) as _exists
        `)
    }

    public async findMaxSeqNo(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT max(seq_no) as maxSeqNo
            FROM event_win
            WHERE event_seq_no = ${eventSeqNo}
        `)
    }

    public async updateImpression(seqNo: number, impression: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event_win
            SET
                impression = '${impression}'
            WHERE
                seq_no = ${seqNo}
        `)
    }

}