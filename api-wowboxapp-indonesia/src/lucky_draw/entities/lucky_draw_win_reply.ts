
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'lucky_draw_win_reply'
})
export class LuckyDrawWinReply extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

    @Column({type: 'int', name: 'lucky_draw_win_seq_no'})
    public luckyDrawWinSeqNo: number;
    
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

}

@Entity({
    name: 'lucky_draw_win_reply'
})
export class LuckyDrawWinReplyJoin extends LuckyDrawWinReply {
    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.luckyDrawWinReplyList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
}