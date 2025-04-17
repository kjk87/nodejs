
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { ProfitPartnerJoin } from "../../partner/entities/profit_partner";
import { Partner, PartnerJoin } from "../../partner/entities/partner";
import { LuckyDrawWinJoin } from "../../lucky_draw/entities/lucky_draw_win";
import { LuckyDrawWinReplyJoin } from "../../lucky_draw/entities/lucky_draw_win_reply";

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
    
    @Column({type: 'boolean',  name: 'is_auth_email'})
    public isAuthEmail: boolean;
    
    @Column({type: 'varchar',  name: 'platform_key'})
    public platformKey: string;
    
    @Column({type: 'varchar',  name: 'recommendee_key'})
    public recommendeeKey: string;

}

@Entity({
    name: 'member_total'
})
export class MemberTotalJoin extends MemberTotal {
    @OneToMany(() => ProfitPartnerJoin, profitPartnerJoin => profitPartnerJoin.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public profitPartnerList: ProfitPartnerJoin[];

    @OneToMany(() => PartnerJoin, partnerJoin => partnerJoin.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public partnerList: PartnerJoin[];
    
    @OneToMany(() => LuckyDrawWinJoin, luckyDrawWinList => luckyDrawWinList.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyDrawWinList: LuckyDrawWinJoin[];

    @OneToMany(() => LuckyDrawWinReplyJoin, luckyDrawWinReplyJoin => luckyDrawWinReplyJoin.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyDrawWinReplyList: LuckyDrawWinReplyJoin[];
}
