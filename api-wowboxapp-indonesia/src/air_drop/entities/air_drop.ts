
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'air_drop'
})
export class AirDrop extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'status'})//pending: 신청 return: 반려 normal: 승인 redemand: 재신청
    public status: string;
    
    @Column({type: 'varchar',  name: 'wallet'})
    public wallet: string;

    @Column({type: 'float',  name: 'amount'})
    public amount: number;
    
    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

    @Column({type: 'datetime',  name: 'request_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public requestDatetime: string;

    @Column({type: 'datetime',  name: 'change_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public changeDatetime: string;
    
    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}