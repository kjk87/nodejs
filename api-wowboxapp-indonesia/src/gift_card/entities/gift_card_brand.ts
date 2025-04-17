
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'gift_card_brand'
})
export class GiftCardBrand extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;
    
    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;
    
    @Column({type: 'varchar',  name: 'background_image'})
    public backgroundImage: string;
    
    @Column({type: 'varchar',  name: 'delegate_image'})
    public delegateImage: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;
    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}