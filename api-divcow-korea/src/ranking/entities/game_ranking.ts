import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { TelegramUsersJoin } from "../../telegram/entities/telegram_users";
import { GamesJoin } from "../../games/entities/games";
import { MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'game_ranking'
})
export class GameRanking extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar',  name: 'type'})
    public type: string;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'bigint', name: 'games_id'})
    public games_id: number;
    
    @Column({type: 'int', name: 'best_score'})
    public best_score: number;

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

    public ranking: number;

}

@Entity({ 
    name: 'game_ranking'
})
export class GameRankingJoin extends GameRanking {

    @OneToOne(() => TelegramUsersJoin, telegram_users => telegram_users.ranking)
    @JoinColumn({name: 'telegram_user_id', referencedColumnName: 'id'})
    public telegram_users: TelegramUsersJoin;
    
    @OneToOne(() => GamesJoin, games => games.ranking)
    @JoinColumn({name: 'games_id', referencedColumnName: 'id'})
    public games: GamesJoin;

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.prizeRanking)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotalJoin;
}