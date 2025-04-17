
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberDelivery } from "../../member/entities/member_delivery";

@Entity({
    name: 'product_purchase'
})
export class ProductPurchase extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'code'})
    public code: string;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'buyer_nickname'})
    public buyerNickname: string;

    @Column({type: 'int',  name: 'member_delivery_seq_no'})
    public memberDeliverySeqNo: number;
    
    @Column({type: 'int',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'varchar',  name: 'product_name'})
    public productName: string;
    
    @Column({type: 'varchar',  name: 'product_image'})
    public productImage: string;
    
    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'int',  name: 'delivery_status'})
    public deliveryStatus: number;

    @Column({type: 'varchar',  name: 'shipping_company'})
    public shippingCompany: string;
    
    @Column({type: 'varchar',  name: 'transport_number'})
    public transportNumber: string;
    
    @Column({type: 'decimal',  name: 'use_point'})
    public usePoint: number;
    
    @Column({type: 'decimal',  name: 'exchange_rate'})
    public exchangeRate: number;
    
    @Column({type: 'decimal',  name: 'price'})
    public price: number;
    
    @Column({type: 'int',  name: 'amount'})
    public amount: number;

    @Column({type: 'decimal',  name: 'unit_price'})
    public unitPrice: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
    
    @Column({type: 'datetime', name: 'send_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public sendDatetime: string;
    
    @Column({type: 'datetime', name: 'status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public statusDatetime: string;

    public delivery : MemberDelivery;

}