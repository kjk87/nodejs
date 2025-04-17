
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity()
export class LuckyDrawNumber extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char', name: 'first'})
    public first: string;

    @Column({type: 'char', name: 'second'})
    public second: string;
    
    @Column({type: 'char', name: 'third'})
    public third: string;

    @Column({type: 'varchar',  name: 'win_number'})
    public winNumber: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'boolean',  name: 'used'})
    public used: boolean;

}