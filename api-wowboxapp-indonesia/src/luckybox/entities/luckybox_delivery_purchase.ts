import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyboxPurchaseItem, LuckyboxPurchaseItemJoin } from "./luckybox_purchase_item";
import { MemberA } from "../../member/entities/member_a";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'luckybox_delivery_purchase'
})
export class LuckyboxDeliveryPurchase extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'order_no'})
    public orderNo: string;

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'varchar',  name: 'payment_method'})
    public paymentMethod: string;

    @Column({type: 'float',  name: 'price'})
    public price: number;

    @Column({type: 'int',  name: 'pg_price'})
    public pgPrice: number;

    @Column({type: 'int',  name: 'use_point'})
    public usePoint: number;

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

    @Column({type: 'datetime', name: 'cancel_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public cancelDatetime: string;

    @Column({type: 'varchar',  name: 'xendit_id'})
    public xenditId: string;

    @Column({type: 'varchar',  name: 'xendit_user_id'})
    public xenditUserId: string;

    @Column({type: 'boolean',  name: 'xendit_is_high'})
    public xenditIsHigh: boolean;

    @Column({type: 'int',  name: 'xendit_amount'})
    public xenditAmount: number;
    
    @Column({type: 'int',  name: 'xendit_paid_amount'})
    public xenditPaidAmount: number;

    @Column({type: 'varchar',  name: 'xendit_bank_code'})
    public xenditBankCode: string;

    @Column({type: 'varchar',  name: 'xendit_payer_email'})
    public xenditPayerEmail: string;

    @Column({type: 'varchar',  name: 'xendit_description'})
    public xenditDescription: string;

    @Column({type: 'int',  name: 'xendit_adjusted_received_amount'})
    public xenditAdjustedReceivedAmount: number;

    @Column({type: 'int',  name: 'xendit_fees_paid_amount'})
    public xendit_fees_paid_amount: number;

    @Column({type: 'varchar',  name: 'xendit_updated'})
    public xenditUpdated: string;

    @Column({type: 'varchar',  name: 'xendit_created'})
    public xenditCreated: string;

    @Column({type: 'varchar',  name: 'xendit_currency'})
    public xenditCurrency: string;

    @Column({type: 'varchar',  name: 'xendit_payment_channel'})
    public xenditPaymentChannel: string;

    @Column({type: 'varchar',  name: 'xendit_payment_destination'})
    public xenditPaymentDestination: string;

    public invoiceUrl: string;

    public luckyboxPurchaseItem: LuckyboxPurchaseItem;
    public member: MemberA;
}

@Entity({
    name: 'luckybox_delivery_purchase'
})
export class LuckyboxDeliveryPurchaseJoin extends LuckyboxDeliveryPurchase {

    @OneToOne(()=> LuckyboxPurchaseItemJoin, luckyboxPurchaseItem => luckyboxPurchaseItem.luckyboxDeliveryPurchase)
    @JoinColumn({name: 'luckybox_purchase_item_seq_no',  referencedColumnName: 'seqNo'})
    public luckyboxPurchaseItem: LuckyboxPurchaseItemJoin;

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.luckyboxDeliveryPurchase)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
}
