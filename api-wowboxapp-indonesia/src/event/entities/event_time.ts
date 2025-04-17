import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { Event, EventJoin } from "./event";

@Entity({
    name: 'event_time'
})
export class EventTime extends CoreEntity {
    
    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint', name: 'event_seq_no'})
    public eventSeqNo: number;
 
    @Column({type: 'char', name: 'start_time'})
    public startTime: string;

    @Column({type: 'char', name: 'end_time'}) 
    public endTime: string;
}

@Entity({
    name: 'event_time'
})
export class EventTimeJoin extends EventTime {
    
    @ManyToOne(() => EventJoin, event => event.eventTime)
    @JoinColumn({name: 'event_seq_no', referencedColumnName: 'seqNo'})
    public event: EventJoin;
}