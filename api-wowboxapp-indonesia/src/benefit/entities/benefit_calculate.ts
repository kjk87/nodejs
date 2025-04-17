
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'benefit_calculate'
})
export class BenefitCalculate extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'date',  name: 'calculate_month'})
    public calculateMonth: string;
    
    @Column({type: 'varchar',  name: 'status'})//pending: 정산대기\ntransfer: 이월 complete: 정산완료
    public status: string;

    @Column({type: 'decimal',  name: 'transfered_benefit'})
    public transferedBenefit: number;
    
    @Column({type: 'decimal',  name: 'benefit'})
    public benefit: number;
   
    @Column({type: 'decimal',  name: 'total_proceeds'})
    public totalProceeds: number;
   
    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime', name: 'change_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public changeDatetime: string;

    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

}