
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberTotal, MemberTotalJoin } from "../../member/entities/member_total";


@Entity({
    name: 'partner'
})
export class Partner extends CoreEntity {

    @PrimaryColumn({type: 'varchar',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'char',  name: 'nation'})
    public nation: string;

    @Column({type: 'char',  name: 'type'})
    public type: string;//partner1, partner2
    
    @Column({type: 'char',  name: 'status'})
    public status: string;//active, pending, reapply, return

    @Column({type: 'varchar',  name: 'parents'})
    public parents: string;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;
    
    @Column({type: 'varchar',  name: 'identity_card'})
    public identityCard: string;
    
    @Column({type: 'varchar',  name: 'bank_name'})
    public bankName: string;
    
    @Column({type: 'varchar',  name: 'account_type'})
    public accountType: string;
    
    @Column({type: 'varchar',  name: 'routing_no'})
    public routingNo: string;
    
    @Column({type: 'varchar',  name: 'account_no'})
    public accountNo: string;
    
    @Column({type: 'varchar',  name: 'account_first_name'})
    public accountFirstName: string;
    
    @Column({type: 'varchar',  name: 'account_last_name'})
    public accountLastName: string;
    
    @Column({type: 'varchar',  name: 'phone_nation_no'})
    public phoneNationNo: string;

    @Column({type: 'varchar',  name: 'phone_number'})
    public phoneNumber: string;
    
    @Column({type: 'varchar',  name: 'instargram'})
    public instargram: string;
    
    @Column({type: 'varchar',  name: 'youtube'})
    public youtube: string;
    
    @Column({type: 'varchar',  name: 'twitter'})
    public twitter: string;

    @Column({type: 'datetime',  name: 'request_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public requestDatetime: string;
   
    @Column({type: 'datetime',  name: 'change_status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public changeStatusDatetime: string;

    @Column({type: 'float',  name: 'bonus_commission'})
    public bonusCommission: number;
    
    @Column({type: 'float',  name: 'ad_commission'})
    public adCommission: number;
    
    @Column({type: 'float',  name: 'ball_commission'})
    public ballCommission: number;

    @Column({type: 'varchar',  name: 'reason'})
    public reason: string;

    @Column({type: 'int',  name: 'ad_count'})
    public adCount: number;
    
    @Column({type: 'int',  name: 'last_check_count'})
    public lastCheckCount: number;

    @Column({type: 'datetime',  name: 'last_check_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public lastCheckDatetime: string;

    @Column({type: 'varchar',  name: 'email'})
    public email: string;
}

@Entity({
    name: 'partner'
})
export class PartnerJoin extends Partner {
    @ManyToOne(() => MemberTotalJoin, memberTotal => memberTotal.partnerList)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public memberTotal: MemberTotal;
}