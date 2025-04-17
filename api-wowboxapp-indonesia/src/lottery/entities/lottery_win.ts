
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
// import { LotteryJoinItemJoin } from "./lottery_join_item";

@Entity()
export class LotteryWin extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lottery_round'})
    public lotteryRound: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

    @Column({type: 'int',  name: 'grade'})
    public grade: number;

    @Column({type: 'varchar',  name: 'gift_type'})
    public giftType: string;

    @Column({type: 'decimal',  name: 'money'})
    public money: number;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'datetime', name: 'status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public statusDatetime: string;

    @Column({type: 'int',  name: 'no1'})
    public no1: number;

    @Column({type: 'int',  name: 'no2'})
    public no2: number;

    @Column({type: 'int',  name: 'no3'})
    public no3: number;

    @Column({type: 'int',  name: 'no4'})
    public no4: number;

    @Column({type: 'int',  name: 'no5'})
    public no5: number;

    @Column({type: 'int',  name: 'no6'})
    public no6: number;

    @Column({type: 'boolean',  name: 'win_no1'})
    public winNo1: boolean;

    @Column({type: 'boolean',  name: 'win_no2'})
    public winNo2: boolean;

    @Column({type: 'boolean',  name: 'win_no3'})
    public winNo3: boolean;

    @Column({type: 'boolean',  name: 'win_no4'})
    public winNo4: boolean;

    @Column({type: 'boolean',  name: 'win_no5'})
    public winNo5: boolean;

    @Column({type: 'boolean',  name: 'win_no6'})
    public winNo6: boolean;

    @Column({type: 'boolean',  name: 'win_add'})
    public winAdd: boolean;

    @Column({type: 'datetime', name: 'join_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d, 'd')
    }})
    public joinDatetime: string;

    public member:MemberA;
}
