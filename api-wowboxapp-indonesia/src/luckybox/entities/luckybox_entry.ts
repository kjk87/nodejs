import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({
    name: 'luckybox_entry'
})
export class LuckyboxEntry extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_product_group_seq_no'})
    public luckyboxProductGroupSeqNo: number;

    @Column({type: 'bigint',  name: 'luckybox_seq_no'})
    public luckyboxSeqNo: number;

    @Column({type: 'boolean',  name: 'temp'})
    public temp: boolean;

}