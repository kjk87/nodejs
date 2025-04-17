import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'luckybox_review_image'
})
export class LuckyboxReviewImage extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_review_seq_no'})
    public luckyboxReviewSeqNo: number;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'varchar',  name: 'type'})
    public type: string;

}