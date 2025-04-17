import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'luckybox_product_group_item'
})
export class LuckyboxProductGroupItem extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_product_group_seq_no'})
    public luckyboxProductGroupSeqNo: number;

    @Column({type: 'bigint',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'boolean',  name: 'temp'})
    public temp: boolean;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'varchar',  name: 'product_name'})
    public productName: string;

    @Column({type: 'float',  name: 'price'})
    public price: number;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;

}