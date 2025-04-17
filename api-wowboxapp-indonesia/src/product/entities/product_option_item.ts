import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { ProductOptionDetailJoin } from "./product_option_detail";

@Entity({
    name: 'product_option_item'
})
export class ProductOptionItem extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'bigint',  name: 'option_seq_no'})
    public optionSeqNo: number;

    @Column({type: 'varchar',  name: 'item'})
    public item: string;

}

@Entity({
    name: 'product_option_item'
})
export class ProductOptionItemJoin extends ProductOptionItem {
    @OneToOne(() => ProductOptionDetailJoin, productOptionDetail1 => productOptionDetail1.productOptionItem1)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'depth1ItemSeqNo'})
    public productOptionDetail1: ProductOptionDetailJoin;

    @OneToOne(() => ProductOptionDetailJoin, productOptionDetail2 => productOptionDetail2.productOptionItem2)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'depth2ItemSeqNo'})
    public productOptionDetail2: ProductOptionDetailJoin;
}