import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";
import { EventWinJoin, EventWinJoinByUser, EventWinJoinPresent, EventWinJoinSeqNo, EventWinJoinWinnerList, EventWinJoinWinnerUser, EventWinJoinWrite } from "./event_win";
import { EventJoin } from "./event";

@Entity({
    name: 'event_gift'
})
export class EventGift extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint', name: 'event_seq_no'})
    public eventSeqNo: number;

    @Column({type: 'varchar', name: 'gift_type'})
    public giftType: string;

    @Column({type: 'varchar', name: 'title'})
    public title: string; 

    @Column({type: 'int', name: 'total_count'})
    public totalCount: number;

    @Column({type: 'varchar', name: 'alert'})
    public alert: string;

    @Column({type: 'double', name: 'lot_percent'})
    public lotPercent: number;

    @Column({type: 'bigint', name: 'price'})
    public price: number;

    @Column({type: 'bigint', name: 'attach_seq_no'})
    public attachSeqNo: number;

    @Column({type: 'int', name: 'remain_count'})
    public remainCount: number;

    @Column({type: 'varchar', name: 'win_order'})
    public winOrder: string; 

    @Column({type: 'varchar', name: 'beta_code'})
    public betaCode: string;

    @Column({type: 'date', name: 'expire_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d, 'd')

    }})
    public expireDate: string;

    @Column({type: 'varchar', name: 'time_type'})
    public timeType: string;

    @Column({type: 'varchar', name: 'day_type'})
    public dayType: string; 

    @Column({type: 'varchar', name: 'start_time'})
    public startTime: string;

    @Column({type: 'varchar', name: 'end_time'})
    public endTime: string; 

    @Column({type: 'varchar', name: 'days'})
    public days: string;

    @Column({type: 'int', name: 'review_point'})
    public reviewPoint: number;

    @Column({type: 'boolean', name: 'review_present'})
    public reviewPresent: boolean;

    @Column({type: 'varchar', name: 'gift_link'})
    public giftLink: string;

    @Column({type: 'boolean', name: 'manual_choice'})
    public manualChoice: boolean;

    @Column({type: 'boolean', name: 'auto_send'})
    public autoSend: boolean;

    @Column({type: 'bigint', name: 'giftishow_seq_no'})
    public giftishowSeqNo: number;

    @Column({type: 'varchar', name: 'gift_image_url'})
    public giftImageUrl: string;

    @Column({type: 'boolean', name: 'appoint_win'})
    public appointWin: boolean;

    @Column({type: 'varchar', name: 'win_member'})
    public winMember: string;

    @Column({type: 'boolean', name: 'best'})
    public best: boolean; 

    @Column({type: 'boolean', name: 'temp'})
    public temp: boolean; 

    @Column({type: 'boolean', name: 'delivery'})
    public delivery: boolean;

}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoin extends EventGift {

    @OneToOne(() => EventWinJoin, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoin;

    @OneToOne(() => EventJoin, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoin;
}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoinWrite extends EventGift {

    @OneToOne(() => EventWinJoinWrite, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinWrite;
}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoinPresent extends EventGift {

    @ManyToOne(() => EventWinJoinPresent, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinPresent;
}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoinSeqNo extends EventGift {

    @OneToOne(() => EventWinJoinSeqNo, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinSeqNo;
}


@Entity({
    name: 'event_gift'
})
export class EventGiftJoinByUser extends EventGift {

    @OneToOne(() => EventWinJoinByUser, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinByUser;
}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoinWinnerUser extends EventGift {

    @OneToOne(() => EventWinJoinWinnerUser, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinWinnerUser;
}

@Entity({
    name: 'event_gift'
})
export class EventGiftJoinWinnerList extends EventGift {

    @OneToOne(() => EventWinJoinWinnerList, eventWin => eventWin.eventGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'giftSeqNo'})
    public eventWin: EventWinJoinWinnerList;

}
