import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { ReferralTasksJoin } from "../../referral/entities/referral_tasks";

@Entity({
    name: 'telegram_user_referral_task'
})
export class TelegramUserReferralTask extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'referral_task_id'})
    public referral_task_id: number;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'boolean', name: 'is_completed'})
    public is_completed: boolean;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}

@Entity({
    name: 'telegram_user_referral_task'
})
export class TelegramUserReferralTaskJoin extends TelegramUserReferralTask {
    
    @ManyToOne(() => ReferralTasksJoin, referralTasksJoin => referralTasksJoin.telegram_user_referral_task)
    @JoinColumn({name: 'referral_task_id', referencedColumnName: 'id'})
    public referral_task: ReferralTasksJoin;
}