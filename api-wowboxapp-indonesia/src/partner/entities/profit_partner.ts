
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";


@Entity({
    name: 'profit_partner'
})
export class ProfitPartner extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'date',  name: 'calculate_month', transformer: {
        to: d => d,
        from: d => translationDatetime(d, 'd')
    }})
    public calculateMonth: string;
    
    @Column({type: 'varchar',  name: 'partner_type'})
    public partnerType: string;//partner1, partner2

    @Column({type: 'varchar',  name: 'status'})
    public status: string;//pending, transfer, complete

    @Column({type: 'decimal',  name: 'transfered_bonus_profit'})
    public transferedBonusProfit: number;

    @Column({type: 'decimal',  name: 'transfered_ad_profit'})
    public transferedAdProfit: number;
    
    @Column({type: 'decimal',  name: 'transfered_ball_profit'})
    public transferedBallProfit: number;
    
    @Column({type: 'decimal',  name: 'bonus_profit'})
    public bonusProfit: number;
    
    @Column({type: 'decimal',  name: 'ad_profit'})
    public adProfit: number;
    
    @Column({type: 'decimal',  name: 'ball_profit'})
    public ballProfit: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
   
    @Column({type: 'datetime',  name: 'change_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public changeDatetime: string;

    @Column({type: 'varchar',  name: 'comment'})
    public comment: number;

    @Column({type: 'char',  name: 'parents_partner'})
    public parentsPartner: string;
    
    @Column({type: 'float',  name: 'parents_partner_per'})
    public parentsPartnerPer: number;
}

@Entity({
    name: 'profit_partner'
})
export class ProfitPartnerJoin extends ProfitPartner {
    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.profitPartnerList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
}