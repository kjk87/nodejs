
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { Inquire, InquireJoin } from "./inquire";


@Entity({
    name: 'inquire_image'
})
export class InquireImage extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'inquire_seq_no'})
    public inquireSeqNo: number;
    
    @Column({type: 'varchar',  name: 'image'})
    public image: string;
    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
}

@Entity({
    name: 'inquire_image'
})
export class InquireImageJoin extends InquireImage {
    @ManyToOne(() => InquireJoin, inquire => inquire.imageList)
    @JoinColumn({name: 'inquire_seq_no', referencedColumnName: 'seqNo'})
    public inquire: InquireJoin;
}