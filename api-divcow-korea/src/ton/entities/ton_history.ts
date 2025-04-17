import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'ton_history'
})
export class TonHistory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'varchar', name: 'type'})
    public type: string;

    @Column({type: 'varchar', name: 'subject'})
    public subject: string;

    @Column({type: 'varchar', name: 'comment'})
    public comment: string;

    @Column({type: 'float', name: 'amount'})
    public amount: number;

    @Column({type: 'datetime', name: 'created_at'})
    public created_at: string;

}