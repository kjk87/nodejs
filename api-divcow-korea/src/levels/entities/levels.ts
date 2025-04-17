import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { TelegramUsersJoin } from "../../telegram/entities/telegram_users";

@Entity({
    name: 'levels'
})
export class Levels extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'int', name: 'level'})
    public level: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'bigint', name: 'from_balance'})
    public from_balance: number;

    @Column({type: 'bigint', name: 'to_balance'})
    public to_balance: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}

@Entity({ 
    name: 'levels'
})
export class LevelsJoin extends Levels {

    @OneToOne(() => TelegramUsersJoin, telegram_users => telegram_users.level)
    @JoinColumn({name: 'id', referencedColumnName: 'level_id'})
    public telegram_users: TelegramUsersJoin;

}