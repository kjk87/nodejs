import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { ProductOptionItem, ProductOptionItemJoin } from "./product_option_item";

@Entity({
    name: 'product_option_detail'
})
export class ProductOptionDetail extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'bigint',  name: 'option_seq_no'})
    public optionSeqNo: number;

    @Column({type: 'bigint',  name: 'depth1_item_seq_no'})
    public depth1ItemSeqNo: number;

    @Column({type: 'bigint',  name: 'depth2_item_seq_no'})
    public depth2ItemSeqNo: number;

    @Column({type: 'int',  name: 'amount'})
    public amount: number;

    @Column({type: 'int',  name: 'sold_count'})
    public soldCount: number;

    @Column({type: 'int',  name: 'price'})
    public price: number;

    @Column({type: 'boolean',  name: 'flag'})
    public flag: string;

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'boolean',  name: 'usable'})
    public usable: boolean;

}

@Entity({
    name: 'product_option_detail'
})
export class ProductOptionDetailJoin extends ProductOptionDetail {

    @OneToOne(() => ProductOptionItemJoin, productOptionItem1 => productOptionItem1.productOptionDetail1)
    @JoinColumn({name: 'depth1_item_seq_no', referencedColumnName: 'seqNo'})
    public productOptionItem1: ProductOptionItemJoin;

    @OneToOne(() => ProductOptionItemJoin, productOptionItem2 => productOptionItem2.productOptionDetail2)
    @JoinColumn({name: 'depth2_item_seq_no', referencedColumnName: 'seqNo'})
    public productOptionItem2: ProductOptionItemJoin;
}