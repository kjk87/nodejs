
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'gift_card'
})
export class GiftCard extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int',  name: 'brand_seq_no'})
    public brandSeqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;
    
    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;
    
    @Column({type: 'varchar',  name: 'image'})
    public image: string;
    
    @Column({type: 'decimal',  name: 'price'})
    public price: number;

    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}