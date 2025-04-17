
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'buff_coin_history'
})
export class BuffCoinHistory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'type'})
    public type: string;

    @Column({type: 'decimal',  name: 'coin'})
    public coin: number;

    @Column({type: 'varchar',  name: 'subject'})
    public subject: string;

    @Column({type: 'varchar',  name: 'history_prop'})
    public historyProp: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}