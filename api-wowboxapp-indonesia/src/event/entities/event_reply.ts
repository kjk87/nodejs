import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'event_reply'
})
export class EventReply extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'bigint', name: 'event_seq_no'}) 
    public eventSeqNo: number;
    
    @Column({type: 'int', name: 'event_win_seq_no'}) 
    public eventWinSeqNo: number;
    
    @Column({type: 'bigint', name: 'event_review_seq_no'}) 
    public eventReviewSeqNo: number;
    
    @Column({type: 'varchar', name: 'reply'}) 
    public reply: string;
    
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
}

@Entity({
    name: 'event_reply'
})
export class EventReplyJoinToMember extends EventReply {

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.eventWin)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
    
}