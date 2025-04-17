import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'luckybox_purchase_cancel'
})
export class LuckyboxPurchaseCancel extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_seq_no'})
    public luckyboxPurchaseSeqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'varchar',  name: 'pay_response_amt'})
    public payResponseAmt: string;

    @Column({type: 'varchar',  name: 'pay_response_approval_no'})
    public payResponseApprovalNo: string;

    @Column({type: 'varchar',  name: 'pay_response_approval_ymdhms'})
    public payResponseApprovalYmdhms: string;

    @Column({type: 'varchar',  name: 'pay_response_card_id'})
    public payResponseCardId: string;

    @Column({type: 'varchar',  name: 'pay_response_card_nm'})
    public payResponseCardNm: string;

    @Column({type: 'varchar',  name: 'pay_response_cert_yn'})
    public payResponseCertYn: string;

    @Column({type: 'varchar',  name: 'pay_response_code'})
    public payResponseCode: string;

    @Column({type: 'varchar',  name: 'pay_response_installment'})
    public payResponseInstallment: string;

    @Column({type: 'varchar',  name: 'pay_response_msg'})
    public payResponseMsg: string;

    @Column({type: 'varchar',  name: 'pay_response_order_no'})
    public payResponseOrderNo: string;

    @Column({type: 'varchar',  name: 'pay_response_pay_date'})
    public payResponsePayDate: string;

    @Column({type: 'varchar',  name: 'pay_response_pay_time'})
    public payResponsePayTime: string;

    @Column({type: 'varchar',  name: 'pay_response_pay_type'})
    public payResponsePayType: string;

    @Column({type: 'varchar',  name: 'pay_response_sell_mm'})
    public payResponseSellMm: string;

    @Column({type: 'varchar',  name: 'pay_response_test_yn'})
    public payResponseTestYn: string;

    @Column({type: 'varchar',  name: 'pay_response_tran_seq'})
    public payResponseTranSeq: string;

    @Column({type: 'varchar',  name: 'pay_response_zerofee_yn'})
    public payResponseZerofeeYn: string;

    @Column({type: 'varchar',  name: 'pay_response_part_cancel_flag'})
    public payResponsePartCancelFlag: string;

    @Column({type: 'float',  name: 'pay_response_remain_amt'})
    public payResponseRemainAmt: number;

}