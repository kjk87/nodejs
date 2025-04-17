import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { YN } from "../../common/services/type";
import { getValidatePhoneNumber } from "../../common/services/validation";
import { EventJoinToEventWin, EventJoinToEventWinByUser, EventJoinToEventWinPresent, EventJoinToEventWinSeqNo, EventJoinToEventWinWinnerUser } from "./event";
import { EventGiftJoin, EventGiftJoinByUser, EventGiftJoinPresent, EventGiftJoinSeqNo, EventGiftJoinWinnerList, EventGiftJoinWinnerUser, EventGiftJoinWrite } from "./event_gift";
import { EventJoinJoinToWinnerList } from "./event_join";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'event_win'
})
export class EventWin extends CoreEntity {
    
    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'}) 
    public seqNo: number;
    
    @Column({type: 'bigint', name: 'event_seq_no'}) 
    public eventSeqNo: number; 
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'bigint', name: 'gift_seq_no'}) 
    public giftSeqNo: number;
    
    @Column({type: 'datetime', name: 'win_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public winDatetime: string;
    
    @Column({type: 'varchar', name: 'impression'}) 
    public impression: string;
    
    @Column({type: 'enum', enum: YN, name: 'blind'}) 
    public blind: YN
    
    @Column({type: 'varchar', name: 'status'}) 
    public status: string;
    
    @Column({type: 'bigint', name: 'amount'}) 
    public amount: number;
    
    @Column({type: 'int', name: 'gift_status'}) 
    public giftStatus: number;
    
    @Column({type: 'datetime', name: 'use_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public useDatetime: string;
    
    @Column({type: 'varchar', name: 'gift_tr_id'}) 
    public giftTrId: string;
    
    @Column({type: 'varchar', name: 'gift_order_no'}) 
    public giftOrderNo: string;
    
    @Column({type: 'varchar', name: 'gift_mobile_number'})
    public giftMobileNumber: string;
    
    @Column({type: 'boolean', name: 'open_status'}) 
    public openStatus: boolean;
    
    @Column({type: 'varchar', name: 'delivery_address'}) 
    public deliveryAddress: string;
    
    @Column({type: 'varchar', name: 'recipient'}) 
    public recipient: string;
    
    @Column({type: 'varchar', name: 'delivery_phone'}) 
    public deliveryPhone: string;
    
    @Column({type: 'varchar', name: 'delivery_post_code'}) 
    public deliveryPostCode: string;

    @Column({type: 'boolean', name: 'is_lotto'})
    public isLotto: boolean;
    
    @Column({type: 'varchar', name: 'gift_type'})
    public giftType: string;
    
    @Column({type: 'varchar', name: 'gift_title'})
    public giftTitle: string;
    
    @Column({type: 'int', name: 'gift_price'})
    public giftPrice: number;

    @Column({type: 'bigint', name: 'event_join_seq_no'})
    public eventJoinSeqNo: number;

    @Column({select: false, update: false, insert: false})
    public replyCount: number;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoin extends EventWin {

    @OneToOne(() => EventJoinToEventWin, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWin;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWin)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(() => EventGiftJoin, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoin;
}


@Entity({
    name: 'event_win'
})
export class EventWinJoinWrite extends EventWin {

    @OneToOne(() => EventJoinToEventWin, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWin;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinWrite)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(() => EventGiftJoinWrite, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinWrite;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoinPresent extends EventWin {
    @OneToOne(() => EventJoinToEventWinPresent, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWinPresent;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinPresent)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(() => EventGiftJoinPresent, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinPresent;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoinSeqNo extends EventWin {
    @OneToOne(() => EventJoinToEventWinSeqNo, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWinSeqNo;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinSeqNo)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(() => EventGiftJoinSeqNo, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinSeqNo;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoinByUser extends EventWin {
    @OneToOne(() => EventJoinToEventWinByUser, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWinByUser;

    @OneToOne(() => EventGiftJoinByUser, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinByUser;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoinWinnerUser extends EventWin {
    @OneToOne(() => EventJoinToEventWinWinnerUser, event => event.eventWin)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoinToEventWinWinnerUser;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinWinnerUser)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(() => EventGiftJoinWinnerUser, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinWinnerUser;
}

@Entity({
    name: 'event_win'
})
export class EventWinJoinWinnerList extends EventWin {
    @ManyToOne(() => EventJoinJoinToWinnerList, eventJoin => eventJoin.eventWin)
    @JoinColumn({name: 'event_join_seq_no', referencedColumnName: 'seqNo'})
    public eventJoin: EventJoinJoinToWinnerList;

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinWinnerList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @ManyToOne(() => EventGiftJoinWinnerList, eventGift => eventGift.eventWin)
    @JoinColumn({name: 'gift_seq_no', referencedColumnName: 'seqNo'})
    public eventGift: EventGiftJoinWinnerList;
}