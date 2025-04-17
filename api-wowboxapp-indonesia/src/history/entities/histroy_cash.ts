
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'history_cash'
})
export class HistoryCash extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'category'})
    public category: string;

    @Column({type: 'varchar',  name: 'type'})
    public type: string;
    
    @Column({type: 'decimal',  name: 'cash'})
    public cash: number;
    
    @Column({type: 'varchar',  name: 'subject'})
    public subject: string;
    
    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}