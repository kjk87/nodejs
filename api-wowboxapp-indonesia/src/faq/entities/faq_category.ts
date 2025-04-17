
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'faq_category'
})
export class FaqCategory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'code'})
    public code: string;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;//active, inactive
    
    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}