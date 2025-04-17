import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { ProductJoin } from "./product";

@Entity({
    name: 'product_delivery'
})
export class ProductDelivery extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'int',  name: 'method'})
    public method: number;

    @Column({type: 'int',  name: 'type'})
    public type: number;

    @Column({type: 'varchar',  name: 'shipping_company'})
    public shippingCompany: string;

    @Column({type: 'bigint',  name: 'forwarding_addr'})
    public forwardingAddr: number;

    @Column({type: 'bigint',  name: 'return_addr'})
    public returnAddr: number;

    @Column({type: 'varchar',  name: 'payment_method'})
    public paymentMethod: string;

    @Column({type: 'float',  name: 'delivery_fee'})
    public deliveryFee: number;

    @Column({type: 'boolean',  name: 'is_add_fee'})
    public isAddFee: boolean;

    @Column({type: 'float',  name: 'delivery_add_fee1'})
    public deliveryAddFee1: number;

    @Column({type: 'float',  name: 'delivery_add_fee2'})
    public deliveryAddFee2: number;

    @Column({type: 'float',  name: 'delivery_min_price'})
    public deliveryMinPrice: number;

    @Column({type: 'float',  name: 'delivery_return_fee'})
    public deliveryReturnFee: number;

    @Column({type: 'float',  name: 'delivery_exchange_fee'})
    public deliveryExchangeFee: number;

    @Column({type: 'varchar',  name: 'as_tel'})
    public asTel: string;

    @Column({type: 'mediumtext',  name: 'as_ment'})
    public asMent: string;

    @Column({type: 'varchar',  name: 'special_note'})
    public specialNote: string;

}

@Entity({
    name: 'product_delivery'
})
export class ProductDeliveryJoin extends ProductDelivery {

    @OneToOne(() => ProductJoin, product => product.productDelivery)
    @JoinColumn({name: 'product_seq_no', referencedColumnName: 'seqNo'})
    public product: ProductJoin;
    
}