
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'reward'
})
export class Reward extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int',  name: 'depth'})
    public depth: number;

    @Column({type: 'varchar',  name: 'type'})//point, lottery, buff
    public type: string;

    @Column({type: 'int',  name: 'min'})
    public min: number;

    @Column({type: 'int',  name: 'max'})
    public max: number;

}