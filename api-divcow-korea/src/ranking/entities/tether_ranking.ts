import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { TelegramUsersJoin } from "../../telegram/entities/telegram_users";
import { MemberTotalJoin } from "../../member/entities/member_total";

@Entity({
    name: 'tether_ranking'
})
export class TetherRanking extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'int', name: 'tether'})
    public tether: number;

}

@Entity({ 
    name: 'tether_ranking'
})
export class TetherRankingJoin extends TetherRanking {

    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.prizeRanking)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotalJoin;

}