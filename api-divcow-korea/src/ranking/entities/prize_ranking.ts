import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { TelegramUsersJoin } from "../../telegram/entities/telegram_users";
import { MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'prize_ranking'
})
export class PrizeRanking extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'int', name: 'prize'})
    public prize: number;

}

@Entity({ 
    name: 'prize_ranking'
})
export class PrizeRankingJoin extends PrizeRanking {

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.prizeRanking)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotalJoin;

}