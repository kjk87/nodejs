import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, getManager, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventGift } from "../entities/event_gift";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class EventGiftModel extends CoreModel<EventGift> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventGift)
    }

    public async setFilter(builder: SelectQueryBuilder<EventGift> | UpdateQueryBuilder<EventGift> | DeleteQueryBuilder<EventGift>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere(`seq_no = :seqNo`, filter);
            }
            if(filter.eventSeqNo) {
                builder.andWhere(`event_seq_no = :eventSeqNo`, filter);
            }
            if(filter.event_seq_no) {
                this.equalsIn(builder, filter, 'event_seq_no', 'entity');
            }
            if(filter.remain_count) {
                if(filter.remain_count.min) {
                    builder.andWhere(`remain_count > :remain_count_min`, {remain_count_min: filter.remain_count.min})
                }
                if(filter.remain_count.max) {
                    builder.andWhere(`remain_count > :remain_count_max`, {remain_count_max: filter.remain_count.max})
                }
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<EventGift>, filter: any = {}, entity?: any): Promise<void> {
       
    }

    public async getLottoPlaybolGift(filter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
                EG.seq_no AS giftNo
                , EG.gift_type  AS giftType
                , EG.title  AS title
                , EG.total_count  AS totalCount
                , EG.remain_count  AS remainCount
                , EG.alert  AS alert
                , EG.lot_percent  AS lotPercent
                , EG.price  AS price
                , EG.win_order  AS winOrder
                , EG.beta_code  AS betaCode
                , EG.expire_date  AS expireDate
                , EG.time_type  AS timeType
                , EG.day_type  AS dayType
                , EG.start_time  AS startTime
                , EG.end_time  AS endTime
                , EG.days  AS days
                , EG.review_point  AS reviewPoint
                , EG.review_present  AS reviewPresent
                , EG.gift_link  AS giftLink
                , EG.manual_choice  AS manualChoice
                , EG.auto_send  AS autoSend
                , EG.giftishow_seq_no  AS giftishowSeqNo
                , EG.gift_image_url  AS giftImageUrl
                , EG.best  AS best
                , EG.temp  AS temp
                , EG.delivery  AS delivery
                , EGA.url AS url
                , count(EW.event_seq_no) AS winnerCount
            FROM event_gift EG
            INNER JOIN event_win EW ON EG.event_seq_no=EW.event_seq_no AND EG.seq_no=EW.gift_seq_no
            WHERE EG.event_seq_no in ( 
                SELECT seq_no 
                FROM event
                WHERE lotto_times = ?
                AND primary_type = 'lottoPlaybol'
            )
            GROUP BY
                EG.seq_no, EG.gift_type, EG.title
                , EG.total_count, EG.remain_count, EG.alert
                , EG.lot_percent, EG.price, EG.win_order, EG.beta_code
                , EG.expire_date, EG.time_type, EG.day_type, EG.start_time, EG.end_time, EG.days, EG.review_point, EG.review_present, EG.gift_link
                , EG.manual_choice, EG.auto_send, EG.giftishow_seq_no, EG.gift_image_url, EG.best, EG.temp, EG.delivery, EGA.url
            ORDER BY EG.seq_no ASC
        `, filter)
    }


    public async sumTotalCount(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT COUNT(total_count) as _count
            FROM event_gift
            WHERE event_seq_no = ${eventSeqNo}
        `)
    }

    public async sumRemainCount(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT COUNT(remain_count) as _count
            FROM event_gift
            WHERE event_seq_no = ${eventSeqNo}
        `)
    }

    public async updateDecreaseRemainCount(eventSeqNo: number, seqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            UPDATE event_gift 
            SET remain_count = remain_count - 1 
            WHERE event_seq_no = ${eventSeqNo} 
            AND seq_no = ${seqNo} 
            and remain_count > 0
        `)
    }

    public async getEventGiftAll(eventSeqNo: number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT
            EG.*
            , EGA.seq_no AS attach_no
            , EGA.url
            FROM event_gift EG
            WHERE
            EG.event_seq_no=${eventSeqNo}
            ORDER BY
            EG.price DESC, EG.seq_no ASC
        `)
    }
}