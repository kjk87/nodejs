
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawGift, LuckyDrawGiftJoin } from "./lucky_draw_gift";
import { LuckyDrawWinJoin } from "./lucky_draw_win";

@Entity({
    name: 'lucky_draw'
})
export class LuckyDraw extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'boolean', name: 'aos'})
    public aos: boolean;
    
    @Column({type: 'boolean', name: 'ios'})
    public ios: boolean;
    
    @Column({type: 'char', name: 'announce_type'})
    public announceType: string;//live,auto
    
    @Column({type: 'char', name: 'engage_type'})
    public engageType: string;//ball,free

    @Column({type: 'varchar', name: 'title'})
    public title: string;

    @Column({type: 'datetime', name: 'start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public startDatetime: string;

    @Column({type: 'datetime', name: 'end_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public endDatetime: string;

    @Column({type: 'int', name: 'engage_ball'})
    public engageBall: number;
    
    @Column({type: 'int', name: 'total_engage'})
    public totalEngage: number;
    
    @Column({type: 'int', name: 'engage_number'})
    public engageNumber: number;
    
    @Column({type: 'int', name: 'total_price'})
    public totalPrice: number;
    
    @Column({type: 'varchar', name: 'banner_image'})
    public bannerImage: string;
    
    @Column({type: 'varchar', name: 'detail_image'})
    public detailImage: string;
    
    @Column({type: 'varchar', name: 'announce_image'})
    public announceImage: string;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;


    @Column({type: 'datetime', name: 'win_announce_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public winAnnounceDatetime: string;

    @Column({type: 'varchar', name: 'live_url'})
    public liveUrl: string;

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

    @Column({type: 'int', name: 'win_type'})
    public winType: number;//1:ABC, 2:AC, 3:C

    @Column({type: 'varchar', name: 'first'})
    public first: string;
    
    @Column({type: 'varchar', name: 'second'})
    public second: string;
    
    @Column({type: 'varchar', name: 'third'})
    public third: string;

    @Column({type: 'varchar', name: 'win_rate1'})
    public winRate1: string;
    
    @Column({type: 'varchar', name: 'win_rate2'})
    public winRate2: string;
    
    @Column({type: 'varchar', name: 'win_rate3'})
    public winRate3: string;

    @Column({type: 'boolean', name: 'is_private'})
    public isPrivate: boolean;
    
    @Column({type: 'bigint', name: 'lucky_draw_group_seq_no'})
    public luckyDrawGroupSeqNo: number;

    public joinCount: number;
}

@Entity({
    name: 'lucky_draw'
})
export class LuckyDrawJoin extends LuckyDraw {
    @OneToMany(() => LuckyDrawGiftJoin, luckyDrawGift => luckyDrawGift.luckyDraw)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'luckyDrawSeqNo'})
    public giftList: LuckyDrawGiftJoin[];

    @OneToMany(() => LuckyDrawWinJoin, luckyDrawWin => luckyDrawWin.luckyDrawGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'luckyDrawSeqNo'})
    public luckyDrawWinList: LuckyDrawWinJoin[];
}