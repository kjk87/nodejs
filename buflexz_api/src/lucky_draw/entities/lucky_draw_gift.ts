import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawJoin } from "./lucky_draw";
import { LuckyDrawWinJoin } from "./lucky_draw_win";

@Entity({
    name: 'lucky_draw_gift'
})
export class LuckyDrawGift extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lucky_draw_seq_no'})
    public luckyDrawSeqNo: number;
    
    @Column({type: 'varchar', name: 'type'})
    public type: string;//goods, ball, point, candy, coin
    
    @Column({type: 'int', name: 'grade'})
    public grade: number;

    @Column({type: 'char', name: 'title'})
    public title: string;
    
    @Column({type: 'char', name: 'notice'})
    public notice: string;

    @Column({type: 'int', name: 'amount'})
    public amount: number;
    
    @Column({type: 'decimal', name: 'price'})
    public price: number;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'varchar', name: 'gift_link'})
    public giftLink: string;
    
    @Column({type: 'boolean', name: 'review_present'})
    public reviewPresent: boolean;
  
    @Column({type: 'boolean', name: 'temp'})
    public temp: boolean;
  
}

@Entity({
    name: 'lucky_draw_gift'
})
export class LuckyDrawGiftJoin extends LuckyDrawGift {
    @ManyToOne(() => LuckyDrawJoin, luckyDraw => luckyDraw.giftList)
    @JoinColumn({name: 'lucky_draw_seq_no', referencedColumnName: 'seqNo'})
    public luckyDraw: LuckyDrawJoin;
    
    @OneToMany(() => LuckyDrawWinJoin, luckyDrawWin => luckyDrawWin.luckyDrawGift)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'luckyDrawGiftSeqNo'})
    public luckyDrawWinList: LuckyDrawWinJoin[];
}