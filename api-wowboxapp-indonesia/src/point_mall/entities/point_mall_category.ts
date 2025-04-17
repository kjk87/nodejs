
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";


@Entity({
    name: 'point_mall_category'
})
export class PointMallCategory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;//active, inactive

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;
    
    @Column({type: 'varchar',  name: 'url'})
    public url: string;
    
    @Column({type: 'int',  name: 'array'})
    public array: number;
    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
   
}