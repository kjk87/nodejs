import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'luckybox_purchase'
})
export class LuckyboxPurchase extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_seq_no'})
    public luckyboxSeqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'order_no'})
    public orderNo: string;

    @Column({type: 'varchar',  name: 'sales_type'})
    public salesType: string;

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'payment_method'})
    public paymentMethod: string;

    @Column({type: 'int',  name: 'quantity'})
    public quantity: number;

    @Column({type: 'float',  name: 'price'})
    public price: number;

    @Column({type: 'int',  name: 'pg_price'})
    public pgPrice: number;

    @Column({type: 'int',  name: 'use_cash'})
    public useCash: number;

    @Column({type: 'int',  name: 'bonus'})
    public bonus: number;

    @Column({type: 'float',  name: 'unit_price'})
    public unitPrice: number;

    @Column({type: 'int',  name: 'cancel_quantity'})
    public cancelQuantity: number;

    @Column({type: 'float',  name: 'cancel_price'})
    public cancelPrice: number;

    @Column({type: 'float',  name: 'remain_price'})
    public remainPrice: number;

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

    @Column({type: 'datetime', name: 'change_status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public changeStatusDatetime: string;

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

    @Column({type: 'boolean', select: false, update: false, insert: false})
    public isCancelable: boolean;

    public invoiceUrl: string;

}

@Entity({
    name: 'luckybox_purchase'
})
export class LuckyboxPurchaseJoin extends LuckyboxPurchase {

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.luckyboxPurchaseList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
    
}