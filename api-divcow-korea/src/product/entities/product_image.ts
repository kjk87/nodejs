import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'product_image'
})
export class ProductImage extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'boolean',  name: 'deligate'})
    public deligate: boolean;

}