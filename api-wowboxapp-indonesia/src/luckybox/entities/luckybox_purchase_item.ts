import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyboxDeliveryJoin } from "./luckybox_delivery";
import { LuckyboxDeliveryPurchaseJoin } from "./luckybox_delivery_purchase";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'luckybox_purchase_item'
})
export class LuckyboxPurchaseItem extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_seq_no'})
    public luckyboxSeqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_seq_no'})
    public luckyboxPurchaseSeqNo: number;

    @Column({type: 'varchar',  name: 'xendit_id'})
    public xenditId: string;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'boolean',  name: 'temp_member'})
    public tempMember: boolean;

    @Column({type: 'varchar',  name: 'luckybox_title'})
    public luckyboxTitle: string;

    @Column({type: 'varchar',  name: 'payment_method'})
    public paymentMethod: string;

    @Column({type: 'float',  name: 'price'})
    public price: number;

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'boolean',  name: 'is_open'})
    public isOpen: boolean;

    @Column({type: 'int',  name: 'delivery_status'})
    public deliveryStatus: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime', name: 'payment_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public paymentDatetime: string;

    @Column({type: 'datetime', name: 'open_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public openDatetime: string;

    @Column({type: 'datetime', name: 'cancel_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public cancelDatetime: string;

    @Column({type: 'datetime', name: 'complete_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public completeDatetime: string;

    @Column({type: 'datetime', name: 'exchange_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public exchangeDatetime: string;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'bigint',  name: 'product_delivery_seq_no'})
    public productDeliverySeqNo: number;

    @Column({type: 'varchar',  name: 'product_type'})
    public productType: string;

    @Column({type: 'varchar',  name: 'product_name'})
    public productName: string;

    @Column({type: 'varchar',  name: 'product_image'})
    public productImage: string;

    @Column({type: 'float',  name: 'product_price'})
    public productPrice: number;

    @Column({type: 'varchar',  name: 'option_name'})
    public optionName: string;

    @Column({type: 'float',  name: 'option_price'})
    public optionPrice: number;

    @Column({type: 'float',  name: 'supply_price'})
    public supplyPrice: number;

    @Column({type: 'float',  name: 'supply_price_payment_fee'})
    public supplyPricePaymentFee: number;

    @Column({type: 'float',  name: 'delivery_fee'})
    public deliveryFee: number;

    @Column({type: 'int',  name: 'delivery_pay_status'})
    public deliveryPayStatus: number;

    @Column({type: 'bigint',  name: 'luckybox_delivery_purchase_seq_no'})
    public luckyboxDeliveryPurchaseSeqNo: number;

    @Column({type: 'float',  name: 'delivery_payment_price'})
    public deliveryPaymentPrice: number;

    @Column({type: 'bigint',  name: 'turn_no'})
    public turnNo: number;

    @Column({type: 'bigint',  name: 'luckybox_delivery_seq_no'})
    public luckyboxDeliverySeqNo: number;

    @Column({type: 'int',  name: 'refund_bol'})
    public refundBol: number;

    @Column({type: 'varchar',  name: 'impression'})
    public impression: string;

    @Column({type: 'datetime', name: 'confirm_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public confirmDatetime: string;

    @Column({type: 'boolean', select: false, update: false, insert: false})
    public isReviewExist: boolean;

    @Column({type: 'int', select: false, update: false, insert: false})
    public replyCount: number;

    @Column({type: 'int', select: false, update: false, insert: false})
    public provideBol: number;

    @Column({type: 'boolean',  name: 'blind'})
    public blind: boolean;

}

@Entity({
    name: 'luckybox_purchase_item'
})
export class LuckyboxPurchaseItemJoin extends LuckyboxPurchaseItem {

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.luckyboxPurchaseItem)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;

    @OneToOne(()=> LuckyboxDeliveryJoin, luckyboxDelivery => luckyboxDelivery.luckyboxPurchaseItem)
    @JoinColumn({name: 'luckybox_delivery_seq_no',  referencedColumnName: 'seqNo'})
    public luckyboxDelivery: LuckyboxDeliveryJoin;

    @OneToOne(()=> LuckyboxDeliveryPurchaseJoin, luckyboxDeliveryPurchase => luckyboxDeliveryPurchase.luckyboxPurchaseItem)
    @JoinColumn({name: 'seq_no',  referencedColumnName: 'luckyboxPurchaseItemSeqNo'})
    public luckyboxDeliveryPurchase: LuckyboxDeliveryPurchaseJoin;
    
}