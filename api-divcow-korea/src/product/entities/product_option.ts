import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'product_option'
})
export class ProductOption extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'varchar',  name: 'item'})
    public item: string;

}