import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'luckybox_product_group'
})
export class LuckyboxProductGroup extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'int',  name: 'turn_no'})
    public turnNo: number;

    @Column({type: 'int',  name: 'priority'})
    public priority: number;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

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

}