import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'swap_history'
})
export class SwapHistory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;//pending, complete, refuesd

    @Column({type: 'varchar', name: 'type'})
    public type: string;//usdt, div
    
    @Column({type: 'varchar', name: 'address'})
    public address: string;

    @Column({type: 'float', name: 'amount'})
    public amount: number;

    @Column({type: 'datetime', name: 'created_at', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public created_at: string;

    @Column({type: 'datetime', name: 'updated_at', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public updated_at: string;

}