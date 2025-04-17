import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { decrypt, translationDatetime } from "../../common/services/util";
import { ProfitPartnerJoin } from "../../partner/entities/profit_partner";
import { Partner, PartnerJoin } from "../../partner/entities/partner";
import { LuckyDrawWinJoin } from "../../lucky_draw/entities/lucky_draw_win";
import { LuckyDrawWinReplyJoin } from "../../lucky_draw/entities/lucky_draw_win_reply";
import { LuckyboxReplyJoin } from "../../luckybox/entities/luckybox_reply";
import { LuckyboxReviewJoin } from "../../luckybox/entities/luckybox_review";
import { LuckyboxPurchaseJoin } from "../../luckybox/entities/luckybox_purchase";
import { LuckyboxPurchaseItemJoin } from "../../luckybox/entities/luckybox_purchase_item";
import { LuckyboxDeliveryPurchaseJoin } from '../../luckybox/entities/luckybox_delivery_purchase';
import { EventWinJoin, EventWinJoinPresent, EventWinJoinSeqNo, EventWinJoinWinnerList, EventWinJoinWinnerUser, EventWinJoinWrite } from "../../event/entities/event_win";
import { EventReplyJoinToMember } from "../../event/entities/event_reply";
import { EventReviewJoin } from "../../event/entities/event_review";

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

    @Column({type: 'boolean',  name: 'is_reward_coin'})
    public isRewardCoin: boolean;

    @Column({type: 'varchar', name: 'mobile_number'})
    public mobileNumber: string;

    @Column({type: 'boolean', name: 'verified_mobile'})
    public verifiedMobile: boolean;

    @AfterLoad()
    fromDBData() {
        if(this.mobileNumber) {
            this.mobileNumber = decrypt(this.mobileNumber);
        }
    }
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

    @OneToMany(() => LuckyboxReplyJoin, luckyboxReply => luckyboxReply.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyboxReplyList: LuckyboxReplyJoin[];

    @OneToMany(() => LuckyboxReviewJoin, luckyboxReview => luckyboxReview.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyboxReviewList: LuckyboxReviewJoin[];

    @OneToMany(() => LuckyboxPurchaseJoin, luckyboxPurchase => luckyboxPurchase.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyboxPurchaseList: LuckyboxPurchaseJoin[];

    @OneToMany(() => LuckyboxPurchaseItemJoin, luckyboxPurchaseItem => luckyboxPurchaseItem.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyboxPurchaseItem: LuckyboxPurchaseItemJoin;

    @OneToMany(() => LuckyboxDeliveryPurchaseJoin, luckyboxDeliveryPurchase => luckyboxDeliveryPurchase.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public luckyboxDeliveryPurchase: LuckyboxDeliveryPurchaseJoin;

    @OneToMany(() => EventWinJoin, eventWin => eventWin.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWin: EventWinJoin[];
    
    @OneToMany(() => EventWinJoinWrite, eventWinJoinWrite => eventWinJoinWrite.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWinJoinWrite: EventWinJoinWrite[];
    
    @OneToMany(() => EventWinJoinPresent, eventWinJoinPresent => eventWinJoinPresent.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWinJoinPresent: EventWinJoinPresent[];
    
    @OneToMany(() => EventWinJoinSeqNo, eventWinJoinSeqNo => eventWinJoinSeqNo.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWinJoinSeqNo: EventWinJoinSeqNo[];
    
    @OneToMany(() => EventWinJoinWinnerUser, eventWinJoinWinnerUser => eventWinJoinWinnerUser.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWinJoinWinnerUser: EventWinJoinWinnerUser[];
    
    @OneToMany(() => EventWinJoinWinnerList, eventWinJoinWinnerList => eventWinJoinWinnerList.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventWinJoinWinnerList: EventWinJoinWinnerList[];
    
    @OneToMany(() => EventReplyJoinToMember, eventReplyJoinToMember => eventReplyJoinToMember.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventReplyJoinToMember: EventReplyJoinToMember[];

    @OneToMany(() => EventReviewJoin, eventReviewJoin => eventReviewJoin.memberTotal)
    @JoinColumn({name: 'user_key', referencedColumnName: 'userKey'})
    public eventReview: EventReviewJoin[];

}
