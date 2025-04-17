
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'member_a'
})
export class MemberA extends CoreEntity {

    @PrimaryColumn({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'char',  name: 'nation'})
    public nation: string;

    @Column({type: 'char',  name: 'language'})
    public language: string;

    @Column({type: 'varchar',  name: 'member_type'})
    public memberType: string;

    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;

    @Column({type: 'varchar',  name: 'status'})//active, dormancy, stop, leave, waitingLeave
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

    @Column({type: 'varchar',  name: 'recommendee_key'})
    public recommendeeKey: string;
    
    @Column({type: 'varchar',  name: 'email'})
    public email: string;
    
    @Column({type: 'varchar',  name: 'device'})
    public device: string;
    
    @Column({type: 'varchar',  name: 'auth_email'})
    public authEmail: string;
    
    @Column({type: 'boolean',  name: 'is_auth_email'})
    public isAuthEmail: boolean;
    
    @Column({type: 'varchar',  name: 'gender'})
    public gender: string;
    
    @Column({type: 'varchar',  name: 'birthday'})
    public birthday: string;
    
    @Column({type: 'varchar',  name: 'profile'})
    public profile: string;
    
    @Column({type: 'varchar',  name: 'platform_email'})
    public platformEmail: string;

    @Column({type: 'varchar',  name: 'platform_key'})
    public platformKey: string;
    
    @Column({type: 'datetime',  name: 'last_login_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public lastLoginDatetime: string;
    
    @Column({type: 'datetime',  name: 'leave_request_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public leaveRequestDatetime: string;
    
    @Column({type: 'datetime',  name: 'leave_finish_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public leaveFinishDatetime: string;


    @Column({type: 'varchar',  name: 'leave_msg'})
    public leaveMsg: string;

    @Column({type: 'datetime', name: 'mod_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public modDatetime: string;

    @Column({type: 'decimal',  name: 'point'})
    public point: number;

    @Column({type: 'int',  name: 'ball'})
    public ball: number;

    @Column({type: 'int',  name: 'candy'})
    public candy: number;

    @Column({type: 'boolean',  name: 'marketing_receiving'})
    public marketingReceiving: boolean;

    @Column({type: 'varchar',  name: 'invite_url'})
    public inviteUrl: string;

    @Column({type: 'int',  name: 'invite_point'})
    public invitePoint: number;

    @Column({type: 'int',  name: 'invite_ticket'})
    public inviteTicket: number;

    @Column({type: 'int',  name: 'invite_ball'})
    public inviteBall: number;

    @Column({type: 'int',  name: 'recommend_point'})
    public recommendPoint: number;

    @Column({type: 'int',  name: 'recommend_ticket'})
    public recommendTicket: number;

    @Column({type: 'int',  name: 'recommend_ball'})
    public recommendBall: number;

    @Column({type: 'float',  name: 'recommend_buff'})
    public recommendBuff: number;
    
    @Column({type: 'int',  name: 'attendance_count'})
    public attendanceCount: number;

    @Column({type: 'datetime',  name: 'attendance_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public attendanceDate: string;

    @Column({type: 'int',  name: 'invite_count'})
    public inviteCount: number;

    @Column({type: 'int',  name: 'reward_point'})
    public rewardPoint: number;

    @Column({type: 'int',  name: 'reward_ticket'})
    public rewardTicket: number;

    @Column({type: 'float',  name: 'reward_buff'})
    public rewardBuff: number;

    @Column({type: 'datetime',  name: 'reward_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public rewardDate: string;


    public token: string;
    
    public refreshToken: string;

    public termsNo: string;

}