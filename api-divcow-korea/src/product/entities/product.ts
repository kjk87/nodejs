import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { ProductDeliveryJoin } from "./product_delivery";

@Entity({
    name: 'product'
})
export class Product extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'market_type'})
    public marketType: string;

    @Column({type: 'bigint',  name: 'sales_type'})
    public salesType: number;

    @Column({type: 'int',  name: 'status'})
    public status: number;

    @Column({type: 'boolean',  name: 'blind'})
    public blind: boolean;

    @Column({type: 'varchar',  name: 'reason'})
    public reason: string;

    @Column({type: 'bigint',  name: 'first'})
    public first: number;

    @Column({type: 'bigint',  name: 'second'})
    public second: number;

    @Column({type: 'bigint',  name: 'third'})
    public third: number;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'varchar',  name: 'price_method'})
    public priceMethod: string;

    @Column({type: 'boolean',  name: 'surtax'})
    public surtax: boolean;

    @Column({type: 'boolean',  name: 'sales_term'})
    public salesTerm: boolean;

    @Column({type: 'date', name: 'start_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d, d)
    }})
    public startDate: string;

    @Column({type: 'date', name: 'end_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d, d)
    }})
    public endDate: string;

    @Column({type: 'mediumtext',  name: 'contents'})
    public contents: string;

    @Column({type: 'int',  name: 'count'})
    public count: number;

    @Column({type: 'int',  name: 'sold_count'})
    public soldCount: number;

    @Column({type: 'boolean',  name: 'use_option'})
    public useOption: boolean;

    @Column({type: 'varchar',  name: 'option_type'})
    public optionType: string;

    @Column({type: 'varchar',  name: 'option_array'})
    public optionArray: string;

    @Column({type: 'varchar',  name: 'register'})
    public register: string;

    @Column({type: 'varchar',  name: 'register_type'})
    public registerType: string;

    @Column({type: 'boolean',  name: 'is_kc'})
    public isKc: boolean;

    @Column({type: 'varchar',  name: 'non_kc_memo'})
    public nonKcMemo: string;

    @Column({type: 'varchar',  name: 'notice_group'})
    public noticeGroup: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime', name: 'mod_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public modDatetime: string;

    @Column({type: 'datetime', name: 'status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public statusDatetime: string;

    @Column({type: 'varchar',  name: 'wholesale_company'})
    public wholesaleCompany: string;

    @Column({type: 'varchar',  name: 'original_seq_no'})
    public originalSeqNo: string;

    @Column({type: 'bigint',  name: 'supplier_seq_no'})
    public supplierSeqNo: number;

    @Column({type: 'varchar',  name: 'origin'})
    public origin: string;

    @Column({type: 'varchar',  name: 'notice'})
    public notice: string;

    @Column({type: 'varchar',  name: 'sub_name'})
    public subName: string;

    @Column({type: 'varchar',  name: 'dome_seller_id'})
    public domeSellerId: string;

    @Column({type: 'boolean',  name: 'change_enable'})
    public changeEnable: boolean;

    @Column({type: 'float',  name: 'supply_price'})
    public supplyPrice: number;

    @Column({type: 'float',  name: 'consumer_price'})
    public consumerPrice: number;
    
    @Column({type: 'int',  name: 'price'})
    public price: number;

    @Column({type: 'int',  name: 'delivery_type'})
    public deliveryType: number;
    
    @Column({type: 'float',  name: 'delivery_fee'})
    public deliveryFee: number;

    @Column({type: 'date', name: 'effective_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d, d)
    }})
    public effectiveDate: string;

}


@Entity({
    name: 'product'
})
export class ProductJoin extends Product {

    @OneToOne(() => ProductDeliveryJoin, productDelivery => productDelivery.product)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'productSeqNo'})
    public productDelivery: ProductDeliveryJoin;

}