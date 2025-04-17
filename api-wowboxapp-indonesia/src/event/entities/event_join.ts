import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";
import { EventWinJoinWinnerList } from "./event_win";

@Entity({
    name: 'event_join'
})
export class EventJoin extends CoreEntity {
 
    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'bigint', name: 'event_seq_no'})
    public eventSeqNo: number;
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'datetime', name: 'join_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public joinDatetime: string;
    
    @Column({type: 'varchar', name : 'join_prop', transformer: {
        to: d => d ? JSON.stringify(d) : d,
        from: d => d ? JSON.parse(d) : d
    }})
    public joinProp: Object;
    
    @Column({type: 'bigint', name: 'win_code'})
    public winCode: string;

    @Column({type: 'boolean', name: 'is_buy'})
    public isBuy: boolean;
    
    @Column({type: 'bigint', name: 'event_buy_seq_no'})
    public eventBuySeqNo: number;
}


@Entity({
    name: 'event_join'
})
export class EventJoinJoinToWinnerList extends EventJoin {
    
    @OneToMany(() => EventWinJoinWinnerList, eventWin => eventWin.eventJoin)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventJoinSeqNo'})
    public eventWin: EventWinJoinWinnerList[];
}