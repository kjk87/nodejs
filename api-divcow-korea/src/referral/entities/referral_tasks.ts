import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { TelegramUserReferralTaskJoin } from "../../telegram/entities/telegram_user_referral_task";

@Entity({
    name: 'referral_tasks'
})
export class ReferralTasks extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'title'})
    public title: string;

    @Column({type: 'tinyint', name: 'number_of_referrals'})
    public number_of_referrals: string;

    @Column({type: 'bigint', name: 'reward'})
    public reward: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}

@Entity({
    name: 'referral_tasks'
})
export class ReferralTasksJoin extends ReferralTasks {

    @OneToOne(() => TelegramUserReferralTaskJoin, telegramUserReferralTaskJoin => telegramUserReferralTaskJoin.referral_task)
    @JoinColumn({name: 'id', referencedColumnName: 'referral_task_id'})
    public telegram_user_referral_task: TelegramUserReferralTaskJoin;

}