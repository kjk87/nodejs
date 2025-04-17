import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyboxPurchaseItemJoin } from "./luckybox_purchase_item";

@Entity({
    name: 'luckybox_delivery'
})
export class LuckyboxDelivery extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_purchase_item_seq_no'})
    public luckyboxPurchaseItemSeqNo: number;

    @Column({type: 'int',  name: 'type'})
    public type: number;

    @Column({type: 'int',  name: 'method'})
    public method: number;

    @Column({type: 'varchar',  name: 'payment_method'})
    public paymentMethod: string;

    @Column({type: 'varchar',  name: 'receiver_name'})
    public receiverName: string;

    @Column({type: 'varchar',  name: 'receiver_family_name'})
    public receiverFamilyName: string;

    @Column({type: 'varchar',  name: 'receiver_post_code'})
    public receiverPostCode: string;
    
    @Column({type: 'varchar',  name: 'receiver_tel'})
    public receiverTel: string;

    @Column({type: 'varchar',  name: 'receiver_address'})
    public receiverAddress: string;

    @Column({type: 'varchar',  name: 'receiver_address2'})
    public receiverAddress2: string;
    
    @Column({type: 'varchar',  name: 'receiver_provinsi'})
    public receiverProvinsi: string;
    
    @Column({type: 'varchar',  name: 'receiver_kabkota'})
    public receiverKabkota: string;
    
    @Column({type: 'varchar',  name: 'receiver_kecamatan'})
    public receiverKecamatan: string;

    @Column({type: 'varchar',  name: 'delivery_memo'})
    public deliveryMemo: string;

    @Column({type: 'float',  name: 'delivery_fee'})
    public deliveryFee: number;

    @Column({type: 'datetime', name: 'delivery_start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public deliveryStartDatetime: string;

    @Column({type: 'datetime', name: 'delivery_complete_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public deliveryCompleteDatetime: string;

    @Column({type: 'float',  name: 'delivery_add_fee1'})
    public deliveryAddFee1: number;

    @Column({type: 'float',  name: 'delivery_add_fee2'})
    public deliveryAddFee2: number;

    @Column({type: 'varchar',  name: 'shipping_company'})
    public shippingCompany: string;

    @Column({type: 'varchar',  name: 'transport_number'})
    public transportNumber: string;

    @Column({type: 'varchar',  name: 'shipping_company_code'})
    public shippingCompanyCode: string;

}

@Entity({
    name: 'luckybox_delivery'
})
export class LuckyboxDeliveryJoin extends LuckyboxDelivery {

    @OneToOne(()=> LuckyboxPurchaseItemJoin, luckyboxPurchaseItem => luckyboxPurchaseItem.luckyboxDelivery)
    @JoinColumn({name: 'seq_no',  referencedColumnName: 'luckyboxDeliverySeqNo'})
    public luckyboxPurchaseItem: LuckyboxPurchaseItemJoin;
}