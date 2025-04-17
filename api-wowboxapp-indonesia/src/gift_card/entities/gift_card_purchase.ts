
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'gift_card_purchase'
})
export class GiftCardPurchase extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'buyer_nickname'})
    public buyerNickname: string;

    @Column({type: 'int',  name: 'gift_card_seq_no'})
    public giftCardSeqNo: number;

    @Column({type: 'varchar',  name: 'gift_card_image'})
    public giftCardImage: string;
    
    @Column({type: 'varchar',  name: 'gift_card_name'})
    public giftCardName: string;
    
    @Column({type: 'int',  name: 'status'})
    public status: number;//0: 결제요청, 1:결제승인, 2:취소요청, 3:취소완료
    
    @Column({type: 'int',  name: 'delivery_status'})
    public deliveryStatus: number;//0:주문확인전, 1:발송대기, 2:발송반려, 3:발송완료
    
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

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime',  name: 'status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public statusDatetime: string;

    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

    @Column({type: 'varchar',  name: 'buyer_email'})
    public buyerEmail: string;
}