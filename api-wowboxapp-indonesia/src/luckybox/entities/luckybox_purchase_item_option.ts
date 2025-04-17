import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'luckybox_purchase_item_option'
})
export class LuckyboxPurchaseItemOption extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'bigint',  name: 'product_option_detail_seq_no'})
    public productOptionDetailSeqNo: number;

    @Column({type: 'int',  name: 'quantity'})
    public quantity: number;

    @Column({type: 'float',  name: 'price'})
    public price: number;

    @Column({type: 'varchar',  name: 'depth1'})
    public depth1: string;

    @Column({type: 'varchar',  name: 'depth2'})
    public depth2: string;

}