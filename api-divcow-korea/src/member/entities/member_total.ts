import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { decrypt, translationDatetime } from "../../common/services/util";
import { PrizeRankingJoin } from "../../ranking/entities/prize_ranking";
import { GameRankingJoin } from "../../ranking/entities/game_ranking";


@Entity({
    name: 'member_total'
})
export class MemberTotal extends CoreEntity {

    @PrimaryColumn({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'nation'})
    public nation: string;
    
    @Column({type: 'varchar',  name: 'member_type'})
    public memberType: string;
    
    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;

    @Column({type: 'varchar',  name: 'email'})
    public email: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'varchar',  name: 'join_type'})
    public joinType: string;
    
    @Column({type: 'varchar',  name: 'join_platform'})
    public joinPlatform: string;

    @Column({type: 'datetime',  name: 'join_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public joinDatetime: string;
    
    @Column({type: 'varchar',  name: 'platform_key'})
    public platformKey: string;
    
    @Column({type: 'varchar',  name: 'recommendee_key'})
    public recommendeeKey: string;
}

@Entity({
    name: 'member_total'
})
export class MemberTotalJoin extends MemberTotal {
    @OneToOne(() => PrizeRankingJoin, prizeRanking => prizeRanking.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public prizeRanking: PrizeRankingJoin;
    
    @OneToOne(() => GameRankingJoin, gameRanking => gameRanking.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public gameRanking: GameRankingJoin;
}

