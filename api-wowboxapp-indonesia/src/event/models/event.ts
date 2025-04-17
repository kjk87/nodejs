import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, getManager, EntityManager } from "typeorm";
import { CoreModel, IOrder, IPaging } from "../../common/core/CoreModel";
import { isNonEmptyArray } from "../../common/services/util";
import { Event, EventJoin, EventJoinToEventWin } from "../entities/event";
import { EventJoin as EventJoinEntity } from "../entities/event_join";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { HistoryBall } from "../../history/entities/histroy_ball";


@Service()
export class EventModel extends CoreModel<Event> {
    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Event)
    }

    public async setFilter(builder: SelectQueryBuilder<Event> | UpdateQueryBuilder<Event> | DeleteQueryBuilder<Event>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            
            let addrClause = '';

            if(filter.virtual_number) this.equalsIn(builder, filter, 'virtual_number', 'entity');
            if(filter.seq_no) this.equalsIn(builder, filter, 'seq_no', 'entity');
            if(filter.status_not) {
                builder.andWhere(`entity.status NOT IN (:status_not)`, filter.status);
            }
            if(filter.status) this.equalsIn(builder, filter, 'status', 'entity');
            if(filter.group_seq_no) this.equalsIn(builder, filter, 'group_seq_no', 'entity');
            if(filter.primary_type) this.equalsIn(builder, filter, 'primary_type', 'entity');
            if(filter.win_announce_type) this.equalsIn(builder, filter, 'win_announce_type', 'entity');
            if(filter.display_start_datetime) builder.andWhere('display_start_datetime <= :display_start_datetime', filter);
            if(filter.display_end_datetime) builder.andWhere('display_end_datetime >= :display_end_datetime', filter);
            if(filter.main_banner_display) this.equalsIn(builder, filter, 'main_banner_display', 'entity');
            if(filter.ios) builder.andWhere(`entity.ios = :ios`, filter.ios);
            if(filter.android) builder.andWhere(`entity.android = :android`, filter.android);
            if(filter.getByNumber) {
                builder.andWhere(`
                    AND (
                        entity.display_time_type IS NULL OR entity.display_time_type='all'
                        OR (
                            entity.display_time_type='time'
                            AND EXISTS (
                                SELECT event_seq_no
                                FROM event_time
                                WHERE
                                    event_seq_no=entity.seq_no
                                    AND start_time <= DATE_FORMAT(CURRENT_TIMESTAMP, '%H%i')
                                    AND end_time >= DATE_FORMAT(CURRENT_TIMESTAMP, '%H%i')
                            )
                        )
                    )
                `)

            }
            if(filter.joinEvent) {
                builder.andWhere(`
                    (
                        entity.display_time_type IS NULL OR entity.display_time_type='all'
                        OR (
                            entity.display_time_type='time'
                            AND EXISTS (
                                SELECT event_seq_no
                                FROM event_time
                                WHERE
                                    event_seq_no=entity.seq_no
                                    AND start_time <= DATE_FORMAT(CURRENT_TIMESTAMP, '%H%i')
                                    AND end_time >= DATE_FORMAT(CURRENT_TIMESTAMP, '%H%i')
                            )
                        )
                    )
                `)
            }
            

            if(filter.app_type) this.equalsIn(builder, filter, 'app_type', 'entity');
            if(filter.is_today === true) {
                builder.andWhere(`DATE_FORMAT(entity.end_datetime, '%Y-%m-%d') = DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d')`)
            } else if(filter.is_today === false){
                builder.andWhere(`DATE_FORMAT(entity.end_datetime, '%Y-%m-%d') != DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d')`)
            }

            if(filter.open_status && entity == EventJoinToEventWin) {
                builder.andWhere(`eventWin.open_status = 1`, filter);
            }
            if(entity == EventJoinToEventWin && filter._win_announce_type && filter._status) {
                builder.andWhere(`(entity.win_announce_type = :_win_announce_type OR entity.status = :_status)`, filter)
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Event>, filter: any = {}, entity?: any): Promise<void> {

        if(entity == EventJoin) {

            if(filter) {
                if(filter.addSelect) {
                    builder.addSelect(`(SELECT EJ.join_datetime FROM event_join EJ WHERE EJ.event_seq_no = entity.seq_no AND EJ.user_key='${filter.user_key}' ORDER BY EJ.join_datetime DESC LIMIT 1)`, 'entity_lastJoinDatetime')
                }        
                if(filter.joinColumn) {
                    this.joinColumn(builder, filter.joinColumn);
                } else {
                    builder.leftJoinAndSelect('entity.eventTime', 'eventTime');
                }
            }

        } else if(entity == EventJoinToEventWin) {
            builder.innerJoinAndSelect('entity.eventWin', 'eventWin');
            builder.innerJoinAndSelect('eventWin.memberTotal', 'memberTotal');
            builder.innerJoinAndSelect('eventWin.eventGift', 'eventGift', '(eventGift.seq_no = eventWin.gift_seq_no)');
        }
        
        if(filter.primary_type == 'goodluck') {
            builder.addOrderBy(`entity.priority`, 'DESC')
            builder.addOrderBy(`case when entity.priority != -1 then entity.join_count else entity.seq_no end`, 'DESC');
        } else if(filter.getWinAnnounceList){

        } else {
            builder.addOrderBy(`entity.priority`, 'DESC')
            builder.addOrderBy(`entity.seq_no`, 'DESC')
        }
        
    }

    public async getWinCountOnlyPresentByMemberSeqNo(userKey:string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
            COUNT(*) AS _count
            FROM event E
            INNER JOIN event_win EW ON EW.event_seq_no=E.seq_no
            INNER JOIN event_gift EG ON EG.event_seq_no=EW.event_seq_no AND EG.seq_no=EW.gift_seq_no
            WHERE ( E.win_announce_type='immediately' OR E.status='announce' )
            AND EW.open_status = 1
            AND EW.impression <> ''
            AND EG.review_present = 1
            AND EW.user_key = '${userKey}'
        `)
    }

    public async getWinCountOnlyPresentToday(manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
            COUNT(*) AS _count
            FROM event E
            INNER JOIN event_win EW ON EW.event_seq_no=E.seq_no
            INNER JOIN event_gift EG ON EG.event_seq_no=EW.event_seq_no AND EG.seq_no=EW.gift_seq_no
            WHERE ( E.win_announce_type='immediately' OR E.status='announce' )
            AND EW.open_status = 1
            AND EW.impression <> ''
            AND EG.review_present = 1
            AND EW.win_datetime >= CURDATE()
        `)
    }

    public async increaseJoinCount(join: EventJoinEntity, event: Event, historyBall?: HistoryBall, userKey?:string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        var query = `insert into event_join(event_seq_no, user_key, join_datetime, win_code) values (${join.eventSeqNo}, '${join.userKey}'`;
        if(join.joinDatetime){
            query += `, '${join.joinDatetime}'`;
        }else{
            query += `, null`;
        }

        if(join.winCode){
            query += `, '${join.winCode}'`;
        }else{
            query += `, null`;
        }
        query += `UPDATE event SET join_count=join_count + 1 WHERE seq_no=${event.seqNo}`;
        if(historyBall){
            query += `insert into history_ball(user_key, type, category, ball, subject, comment, reg_datetime) values
             ('${historyBall.userKey}', '${historyBall.type}', '${historyBall.category}', ${historyBall.ball}, '${historyBall.subject}', '${historyBall.comment}', '${historyBall.regDatetime}');`

             let st = userKey.substring(0, 1);
             switch(historyBall.type){
                case 'charge':
                case 'provide':
                    query += `update member_${st} set ball = ball + ${historyBall.ball} where user_key = '${userKey}';`
                     break;
                case 'used':
                case 'retrieve':
                     query += `update member_${st} set ball = ball - ${historyBall.ball} where user_key = '${userKey}';`
                     break;
           }
 
        }


        return await manager.query(`
            insert into event_join(user_key, join_datetime, win_code) values (${join.eventSeqNo}, '${join.userKey}', '${join.joinDatetime}', '${join.winCode}');
            UPDATE event SET join_count=join_count + 1 WHERE seq_no=${event.seqNo};
        `);
    }


    public async getMaxCode(manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
                MAX(code) AS _code
            FROM
                event
        `);
    }

    public async getTotalGiftCount(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
                SELECT
                0 AS giftNo
                , SUM(EG.total_count) AS totalCount
                , SUM(EG.remain_count) AS remainCount
            FROM event_gift EG
            WHERE
                EG.event_seq_no=${eventSeqNo}
        `);
    }

    public async increaseWinnerCount(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event
            SET
                winner_count=winner_count + 1
            WHERE
                seq_no=${eventSeqNo}
        `);
    }

    public async increaseWinnerCount2(eventSeqNo: number, count: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event
            SET
                winner_count=winner_count + ${count}
            WHERE
                seq_no= ${eventSeqNo}
        `);
    }

    public async increaseWinnerCountAndUpdateWinCode2(count: number, winCode: string, eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event
            SET
                winner_count=winner_count + ${count},
                win_code='${winCode}'
            WHERE
                seq_no=${eventSeqNo}
        `)
    }

    public async decreaseRemainCount2(count: number, giftSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event_gift
            SET
                remain_count=remain_count - ${count}
            WHERE
                seq_no= ${giftSeqNo}
        `)
    }

    public async updateWinnerCount(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event
            SET
                winner_count = (select count(1) from event_win ew where ew.event_seq_no = ${eventSeqNo})
            WHERE
                seq_no=${eventSeqNo}
        `)
    }

    public async setEndDateNowAndWinAnnounceDateNow(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
		UPDATE event
		SET
			end_datetime=CURRENT_TIMESTAMP
			,win_announce_datetime=DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 3 MINUTE)
		WHERE
			seq_no=${eventSeqNo}
        `)
    }
}