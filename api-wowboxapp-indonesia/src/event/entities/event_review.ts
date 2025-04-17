import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";
import { EventReviewImageJoin } from "./event_review_image";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'event_review'
})
export class EventReview extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'bigint', name: 'event_seq_no'})
    public eventSeqNo: number;
    
    @Column({type: 'int', name: 'event_win_seq_no'})
    public eventWinSeqNo: number;
        
    @Column({type: 'bigint', name: 'event_gift_seq_no'})
    public eventGiftSeqNo: number;
    
    @Column({type: 'varchar', name: 'review'})
    public review: string;
    
    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public regDatetime: string; 
    
    @Column({type: 'datetime', name: 'mod_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public modDatetime: string;
    
    @Column({type: 'int', name: 'status'})
    public status: number;

    @Column({select: false, update: false, insert: false})
    public reply_count: number;

    @Column({select: false, update: false, insert: false})
    public friend: number;
}

@Entity({
    name: 'event_review'
})
export class EventReviewJoin extends EventReview {
    @OneToMany(() => EventReviewImageJoin, eventReviewImage => eventReviewImage.eventReview)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventReviewSeqNo'})
    public eventReviewImage: EventReviewImageJoin[];

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWinJoinWrite)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
}