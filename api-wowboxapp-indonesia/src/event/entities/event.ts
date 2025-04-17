import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";
import { EventGiftJoin} from "./event_gift";
import { EventTime, EventTimeJoin} from "./event_time";
import { EventWinJoin, EventWinJoinByUser, EventWinJoinPresent, EventWinJoinSeqNo, EventWinJoinWinnerUser } from "./event_win";

@Entity({
    name: 'event'
})
export class Event extends CoreEntity {
    
    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number; 
    
    @Column({type: 'varchar', name: 'title'})
    public title: string;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;
    
    @Column({type: 'varchar', name: 'primary_type'})
    public primaryType: string;
    
    @Column({type: 'varchar', name: 'secondary_type'})
    public secondaryType: string;
    
    @Column({type: 'varchar', name: 'win_announce_type'})
    public winAnnounceType: string;
    
    @Column({type: 'datetime', name: 'start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public startDatetime: string;
    
    @Column({type: 'datetime', name: 'end_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public endDatetime: string;
    
    @Column({type: 'datetime', name: 'display_start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public displayStartDatetime: string;
    
    @Column({type: 'datetime', name: 'display_end_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public displayEndDatetime: string;
    
    @Column({type: 'boolean', name: 'android'})
    public android: boolean;
    
    @Column({type: 'boolean', name: 'ios'})
    public ios: boolean;
    
    @Column({type: 'varchar', name: 'contents_type'})
    public contentsType: string;
    
    @Column({type: 'text', name: 'contents'})
    public contents: string;
    
    @Column({type: 'varchar', name: 'join_type'})
    public joinType: string;
    
    @Column({type: 'int', name: 'join_limit_count'})
    public joinLimitCount: number;
    
    @Column({type: 'int', name: 'join_term'})
    public joinTerm: number;
    
    @Column({type: 'int', name: 'reward'})
    public reward: number;
    
    @Column({type: 'boolean', name: 'gift'})
    public gift: boolean;

    @Column({type: 'int', name: 'join_count'})
    public joinCount: number;
    
    @Column({type: 'int', name: 'min_join_count'})
    public minJoinCount: number;
    
    @Column({type: 'int', name: 'max_join_count'})
    public maxJoinCount: number;
    
    @Column({type: 'int', name: 'winner_count'})
    public winnerCount: number;
    
    @Column({type: 'int', name: 'total_gift_count'})
    public totalGiftCount: number;
    
    @Column({type: 'varchar', name: 'code'})
    public code: string;
    
    @Column({type: 'varchar', name: 'display_time_type'})
    public displayTimeType: string;
    
    @Column({type: 'varchar', name: 'path'})
    public path: string;
    
    @Column({type: 'varchar', name: 'move_type'})
    public moveType: string; 
    
    @Column({type: 'varchar', name: 'move_target_string'})
    public moveTargetString: string;
    
    @Column({type: 'bigint', name: 'move_target_number'})
    public moveTargetNumber: string;
    
    @Column({type: 'datetime', name: 'win_announce_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public winAnnounceDatetime: string;
    
    @Column({type: 'text', name: 'winner_desc'})
    public winnerDesc: string;
    
    @Column({type: 'varchar', name: 'winner_alert'})
    public winnerAlert: string;
    
    @Column({type: 'varchar', name: 'virtual_number'})
    public virtualNumber: string;
    
    @Column({type: 'varchar', name: 'reward_type'})
    public rewardType: string;
    
    @Column({type: 'varchar', name : 'event_prop', transformer: {
        to: d => d ? JSON.stringify(d) : d,
        from: d => d ? JSON.parse(d) : d
    }})
    public eventProp: Object;
    
    @Column({type: 'varchar', name: 'etc'})
    public etc: string;
    
    @Column({type: 'int', name: 'priority'})
    public priority: number;
    
    @Column({type: 'boolean', name: 'man'})
    public man: boolean;
    
    @Column({type: 'boolean', name: 'woman'})
    public woman: boolean;
    
    @Column({type: 'boolean', name: '10age'})
    public age10: boolean;
    
    @Column({type: 'boolean', name: '20age'})
    public age20: boolean;
    
    @Column({type: 'boolean', name: '30age'})
    public age30: boolean;
    
    @Column({type: 'boolean', name: '40age'})
    public age40: boolean;
    
    @Column({type: 'boolean', name: '50age'})
    public age50: boolean;
    
    @Column({type: 'boolean', name: '60age'})
    public age60: boolean;
    
    @Column({type: 'boolean', name: 'married'})
    public married: boolean;
    
    @Column({type: 'boolean', name: 'not_married'})
    public notMarried: boolean;
    
    @Column({type: 'boolean', name: 'hasChild'})
    public hasChild: boolean;
    
    @Column({type: 'boolean', name: 'noChild'})
    public noChild: boolean;
    
    @Column({type: 'boolean', name: 'all_address'})
    public allAddress: boolean; 
    
    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public regDatetime: string;
    
    @Column({type: 'bigint', name: 'group_seq_no'})
    public groupSeqNo: number;
    
    @Column({type: 'varchar', name: 'win_code'})
    public winCode: string;
    
    @Column({type: 'boolean', name: 'house'})
    public house: boolean;
    
    @Column({type: 'varchar', name: 'app_type'})
    public appType: string;
    
    @Column({type: 'boolean', name: 'auto_regist'})
    public autoRegist: boolean;
    
    @Column({type: 'varchar', name: 'banner_image_url'})
    public bannerImageUrl: string;
    
    @Column({type: 'varchar', name: 'win_image_url'})
    public winImageUrl: string;
    
    @Column({type: 'varchar', name: 'total_gift_image_url'})
    public totalGiftImageUrl: string;
    
    @Column({type: 'varchar', name: 'event_link'})
    public eventLink: string;
    
    @Column({type: 'boolean', name: 'delivery_info'})
    public deliveryInfo: boolean;
    
    @Column({type: 'boolean', name: 'is_db'})
    public isDb: boolean;
    
    @Column({type: 'int', name: 'detail_type'})
    public detailType: number;
    
    @Column({type: 'varchar', name: 'detail_title'})
    public detailTitle: string;
    
    @Column({type: 'varchar', name: 'detail_explain'})
    public detailExplain: string;
    
    @Column({type: 'varchar', name: 'personal_title'})
    public personalTitle: string; 
    
    @Column({type: 'varchar', name: 'personal_contents'})
    public personalContents: string;
    
    @Column({type: 'bigint', name: 'campaign_seq_no'})
    public campaignSeqNo: number;
    
    @Column({type: 'boolean', name: 'use_detail_item'})
    public useDetailItem: boolean;
    
    @Column({type: 'varchar', name: 'main_banner_image'})
    public mainBannerImage: string;
    
    @Column({type: 'varchar', name: 'event_detail_image'})
    public eventDetailImage: string;
    
    @Column({type: 'boolean', name: 'main_banner_display'})
    public mainBannerDisplay: boolean;
    
    @Column({type: 'int', name: 'main_banner_array'})
    public mainBannerArray: number;
    
    @Column({type: 'varchar', name: 'live_url'})
    public liveUrl: string;
    
    @Column({type: 'varchar', name: 'win_announce_url'})
    public winAnnounceUrl: string;

    @Column({type: 'varchar', name: 'hint'})
    public hint: string;

    @Column({type: 'varchar', name: 'join_reward_type'})
    public joinRewardType: string;

    @Column({type: 'int', name: 'join_reward_amount'})
    public joinRewardAmount: number;

    @Column({select: false, update: false, insert: false})
    public lastJoinDatetime: string;

    @Column({select: false, update: false, insert: false})
    public w_url: string;

    @Column({select: false, update: false, insert: false})
    public wd_url: string;

    @Column({select: false, update: false, insert: false})
    public bz_url: string;

    @Column({select: false, update: false, insert: false})
    public bn_url: string;

    @Column({select: false, update: false, insert: false})
    public d_url: string;

    @Column({select: false, update: false, insert: false})
    public g_url: string;
}

@Entity({ 
    name: 'event'
})
export class EventJoin extends Event {

    @OneToMany(() => EventTimeJoin, eventTime => eventTime.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventTime: EventTimeJoin[];

    @OneToMany(() => EventGiftJoin, eventGift => eventGift.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventGift: EventGiftJoin[];

}

@Entity({
    name: 'event'
})
export class EventJoinToEventWin extends Event {

    @OneToOne(() => EventWinJoin, eventWin => eventWin.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventWin: EventWinJoin;
}

@Entity({
    name: 'event'
})
export class EventJoinToEventWinPresent extends Event {
    @OneToOne(() => EventWinJoinPresent, eventWin => eventWin.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventWin: EventWinJoinPresent;
}

@Entity({
    name: 'event'
})
export class EventJoinToEventWinSeqNo extends Event {
    @OneToOne(() => EventWinJoinSeqNo, eventWin => eventWin.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventWin: EventWinJoinSeqNo;
}

@Entity({
    name: 'event'
})
export class EventJoinToEventWinByUser extends Event {
    @OneToOne(() => EventWinJoinByUser, eventWin => eventWin.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventWin: EventWinJoinByUser;
}


@Entity({
    name: 'event'
})
export class EventJoinToEventWinWinnerUser extends Event {
    @OneToOne(() => EventWinJoinWinnerUser, eventWin => eventWin.event)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'eventSeqNo'})
    public eventWin: EventWinJoinWinnerUser;
}
