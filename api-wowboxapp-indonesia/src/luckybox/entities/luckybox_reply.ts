import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'luckybox_reply'
})
export class LuckyboxReply extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_review_seq_no'})
    public luckyboxReviewSeqNo: number;

    @Column({type: 'varchar',  name: 'reply'})
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

    @Column({type: 'int',  name: 'status'})
    public status: number;

}

@Entity({
    name: 'luckybox_reply'
})
export class LuckyboxReplyJoin extends LuckyboxReply {

    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.luckyboxReplyList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
    
}