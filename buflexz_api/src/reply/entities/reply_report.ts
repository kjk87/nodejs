
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'reply_report'
})
export class ReplyReport extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar', name: 'type'})
    public type: string;//luckyDrawWin

    @Column({type: 'int', name: 'lucky_draw_win_reply_seq_no'})
    public luckyDrawWinReplySeqNo: number;
    
    @Column({type: 'varchar', name: 'reason'})
    public reason: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}