import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { EventReviewJoin } from "./event_review";

@Entity({
    name: 'event_review_image'
})
export class EventReviewImage extends CoreEntity {

    
    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'bigint', name: 'event_review_seq_no'})
    public eventReviewSeqNo: number;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'int', name: 'array'})
    public array: number;
    
    @Column({type: 'varchar', name: 'type'})
    public type: string;
}

@Entity({
    name: 'event_review_image'
})
export class EventReviewImageJoin extends EventReviewImage {

    @ManyToOne(() => EventReviewJoin, eventReview => eventReview.eventReviewImage)
    @JoinColumn({name: 'event_review_seq_no', referencedColumnName: 'seqNo'})
    public eventReview: EventReviewJoin;
}