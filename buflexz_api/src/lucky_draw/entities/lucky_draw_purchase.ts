
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawNumber } from "./lucky_draw_number";

export class LuckyDrawPurchase extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lucky_draw_seq_no'})
    public luckyDrawSeqNo: number;
    
    @Column({type: 'varchar', name: 'user_key'})
    public userKey: string;

    @Column({type: 'char', name: 'title'})
    public title: string;
    
    @Column({type: 'char', name: 'win_number'})
    public winNumber: string;

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
   
    @Column({type: 'datetime', name: 'expire_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public expireDatetime: string;

    @Column({type: 'int', name: 'engaged_price'})
    public engagedPrice: number;
    
    @Column({type: 'int', name: 'engaged_count'})
    public engagedCount: number;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;
    
    @Column({type: 'varchar', name: 'engage_type'})
    public engageType: string;
    
    @Column({type: 'varchar', name: 'buyer_nation'})
    public buyerNation: string;
    
    @Column({type: 'varchar', name: 'buyer_name'})
    public buyerName: string;
    
    @Column({type: 'varchar', name: 'buyer_tel'})
    public buyerTel: string;

    public selectNumberList: LuckyDrawNumber[]
  
}