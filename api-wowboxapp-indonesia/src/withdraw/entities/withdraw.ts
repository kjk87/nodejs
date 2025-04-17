
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'withdraw'
})
export class Withdraw extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;

    @Column({type: 'varchar',  name: 'status'})//pending, return, complete
    public status: string;

    @Column({type: 'varchar',  name: 'bank'})
    public bank: string;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'varchar',  name: 'account'})
    public account: string;
    
    @Column({type: 'int',  name: 'request'})
    public request: number;

    @Column({type: 'decimal',  name: 'withdraw'})
    public withdraw: number;

    @Column({type: 'float',  name: 'fee'})
    public fee: number;

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