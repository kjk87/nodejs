import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'bot_user'
})
export class BotUser extends CoreEntity {

    @PrimaryColumn({type: 'bigint', name: 'telegram_id'})
    public telegram_id: number;

    @Column({type: 'timestamp', name: 'created_at', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public created_at: string;
}