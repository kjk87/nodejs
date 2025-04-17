
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'benefit'
})
export class Benefit extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'status'})//active: 정산대상 유저\ninactive: 정산정지 유저
    public status: string;

    @Column({type: 'decimal',  name: 'buff'})
    public buff: number;

    @Column({type: 'varchar',  name: 'wallet'})
    public wallet: string;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'decimal',  name: 'total_benefit'})
    public totalBenefit: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime', name: 'calc_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public calcDatetime: string;

    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

}