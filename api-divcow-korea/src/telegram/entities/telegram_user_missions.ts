import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'telegram_user_missions'
})
export class TelegramUserMissions extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'bigint', name: 'mission_level_id'})
    public mission_level_id: number;

    @Column({type: 'tinyint', name: 'level'})
    public level: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}