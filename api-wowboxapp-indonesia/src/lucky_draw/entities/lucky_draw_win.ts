
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";
import { LuckyDrawGiftJoin } from "./lucky_draw_gift";
import { LuckyDrawJoin } from "./lucky_draw";

@Entity({
    name: 'lucky_draw_win'
})
export class LuckyDrawWin extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

    @Column({type: 'int', name: 'lucky_draw_seq_no'})
    public luckyDrawSeqNo: number;
    
    @Column({type: 'int', name: 'lucky_draw_purchase_seq_no'})
    public luckyDrawPurchaseSeqNo: number;
    
    @Column({type: 'int', name: 'lucky_draw_gift_seq_no'})
    public luckyDrawGiftSeqNo: number;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;
    
    @Column({type: 'varchar', name: 'impression'})
    public impression: string;

    @Column({type: 'int',  name: 'gift_grade'})
    public giftGrade: number;

    @Column({type: 'varchar', name: 'gift_name'})
    public giftName: string;

    @Column({type: 'int',  name: 'gift_price'})
    public giftPrice: number;

    @Column({type: 'varchar', name: 'gift_image'})
    public giftImage: string;

    @Column({type: 'int',  name: 'win_type'})
    public winType: number;
    
    @Column({type: 'varchar',  name: 'win_number'})
    public winNumber: string;
    
    @Column({type: 'varchar',  name: 'unique_number'})
    public uniqueNumber: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'boolean',  name: 'temp'})
    public temp: boolean;

    @Column({type: 'int', select: false, update: false, insert: false})
    public replyCount: number;
}

@Entity({
    name: 'lucky_draw_win'
})
export class LuckyDrawWinJoin extends LuckyDrawWin {
    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.luckyDrawWinList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @ManyToOne(() => LuckyDrawGiftJoin, luckyDrawGift => luckyDrawGift.luckyDrawWinList)
    @JoinColumn({name: 'lucky_draw_gift_seq_no', referencedColumnName: 'seqNo'})
    public luckyDrawGift: LuckyDrawGiftJoin;

    @ManyToOne(() => LuckyDrawJoin, luckyDraw => luckyDraw.luckyDrawWinList)
    @JoinColumn({name: 'lucky_draw_seq_no', referencedColumnName: 'seqNo'})
    public luckyDraw: LuckyDrawJoin;
}