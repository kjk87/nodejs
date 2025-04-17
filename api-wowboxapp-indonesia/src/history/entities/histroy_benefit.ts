
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'history_benefit'
})
export class HistoryBenefit extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;

    @Column({type: 'decimal',  name: 'proceeds'})
    public proceeds: number;
    
    @Column({type: 'decimal',  name: 'total_benefit'})
    public totalBenefit: number;
    
    @Column({type: 'decimal',  name: 'benefit'})
    public benefit: number;
    
    @Column({type: 'decimal',  name: 'm_buff'})
    public mBuff: number;
    
    @Column({type: 'decimal',  name: 'c_buff'})
    public cBuff: number;
    
    @Column({type: 'float',  name: 'percent'})
    public percent: number;
    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}