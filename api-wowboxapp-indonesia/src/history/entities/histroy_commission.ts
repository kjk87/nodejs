
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { HistoryCommissionType } from "../../common/services/type";




@Entity({
    name: 'history_commission'
})
export class HistoryCommission extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'enum', enum: HistoryCommissionType, name: 'type'})
    public type: HistoryCommissionType;//ad, ball, bonus
    
    @Column({type: 'varchar',  name: 'category'})
    public category: string;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;
    
    @Column({type: 'varchar',  name: 'partner'})
    public partner: string;
    
    @Column({type: 'varchar', name: 'partner_type'})
    public partnerType: string;//partner1, partner2
    
    @Column({type: 'char',  name: 'parents'})
    public parents: string;

    @Column({type: 'decimal',  name: 'commission'})
    public commission: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}