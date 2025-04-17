
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'terms'
})
export class Terms extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'code'})
    public code: string;

    @Column({type: 'varchar',  name: 'nation'})
    public nation: string;

    @Column({type: 'boolean',  name: 'compulsory'})
    public compulsory: boolean;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;
    
    @Column({type: 'varchar',  name: 'contents'})
    public contents: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;


    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'varchar',  name: 'url'})
    public url: string;

}