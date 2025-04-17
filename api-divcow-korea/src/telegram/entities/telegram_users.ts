import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LevelsJoin } from "../../levels/entities/levels";
import { GameRankingJoin } from "../../ranking/entities/game_ranking";
import { PrizeRankingJoin } from "../../ranking/entities/prize_ranking";

@Entity({
    name: 'telegram_users'
})
export class TelegramUsers extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'telegram_id'})
    public telegram_id: number;

    @Column({type: 'varchar', name: 'first_name'})
    public first_name: string;

    @Column({type: 'varchar', name: 'last_name'})
    public last_name: string;

    @Column({type: 'varchar', name: 'username'})
    public username: string;

    @Column({type: 'varchar', name: 'ton_wallet'})
    public ton_wallet: string;

    @Column({type: 'int', name: 'balance'})
    public balance: number;

    @Column({type: 'int', name: 'earn_per_tap'})
    public earn_per_tap: number;

    @Column({type: 'int', name: 'available_energy'})
    public available_energy: number;

    @Column({type: 'int', name: 'max_energy'})
    public max_energy: number;

    @Column({type: 'int', name: 'multi_tap_level'})
    public multi_tap_level: number;

    @Column({type: 'int', name: 'energy_limit_level'})
    public energy_limit_level: number;

    @Column({type: 'boolean', name: 'booster_pack_2x'})
    public booster_pack_2x: boolean;

    @Column({type: 'boolean', name: 'booster_pack_3x'})
    public booster_pack_3x: boolean;

    @Column({type: 'boolean', name: 'booster_pack_7x'})
    public booster_pack_7x: boolean;

    @Column({type: 'datetime', name: 'booster_pack_active_until', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public booster_pack_active_until: string;

    @Column({type: 'int', name: 'login_streak'})
    public login_streak: number;

    @Column({type: 'int', name: 'daily_booster_uses'})
    public daily_booster_uses: number;

    @Column({type: 'timestamp', name: 'last_daily_booster_use'})
    public last_daily_booster_use: string;

    @Column({type: 'int', name: 'production_per_hour'})
    public production_per_hour: number;

    @Column({type: 'bigint', name: 'referred_by'})
    public referred_by: number;

    @Column({type: 'bigint', name: 'level_id'})
    public level_id: number;

    @Column({type: 'varchar', name: 'remember_token'})
    public remember_token: string;

    @Column({type: 'datetime', name: 'last_tap_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public last_tap_date: string;

    @Column({type: 'datetime', name: 'last_login_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public last_login_date: string;

    @Column({type: 'timestamp', name: 'created_at', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public updated_at: string;

    @Column({type: 'int', name: 'tether'})
    public tether: number;
    
    @Column({type: 'int', name: 'recommend_count'})
    public recommend_count: number;

    @Column({type: 'float', name: 'ton'})
    public ton: number;

    @Column({type: 'int', name: 'referrel_reward'})
    public referrel_reward: number;
}

@Entity({ 
    name: 'telegram_users'
})
export class TelegramUsersJoin extends TelegramUsers {

    @OneToOne(() => LevelsJoin, level => level.telegram_users)
    @JoinColumn({name: 'level_id', referencedColumnName: 'id'})
    public level: LevelsJoin;

    @OneToMany(() => GameRankingJoin, ranking => ranking.telegram_users)
    @JoinColumn({name: 'id', referencedColumnName: 'telegram_user_id'})
    public ranking: GameRankingJoin[];

}