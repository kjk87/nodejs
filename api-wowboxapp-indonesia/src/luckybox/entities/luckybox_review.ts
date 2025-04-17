import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyboxReviewImage } from "./luckybox_review_image";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'luckybox_review'
})
export class LuckyboxReview extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'varchar',  name: 'review'})
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

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'int', select: false, insert: false, update: false})
    public replyCount: number;

    @Column({type: 'varchar', select: false, insert: false, update: false})
    public productName: string;

    public images: LuckyboxReviewImage[];
}

@Entity({
    name: 'luckybox_review'
})
export class LuckyboxReviewJoin extends LuckyboxReview {
    @ManyToOne(()=> MemberTotalJoin, memberTotal => memberTotal.luckyboxReviewList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotalJoin;
}
