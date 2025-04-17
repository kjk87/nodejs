
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LotteryWinConditionJoin } from "./lottery_win_condition";

@Entity({
    name: 'lottery'
})
export class Lottery extends CoreEntity {

    @PrimaryColumn({type: 'int', name: 'lottery_round'})
    public lotteryRound: number;

    @Column({type: 'datetime', name: 'event_start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public eventStartDatetime: string;

    @Column({type: 'datetime', name: 'event_end_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public eventEndDatetime: string;

    @Column({type: 'varchar', name: 'status'})
    public status: string;

    @Column({type: 'datetime', name: 'announce_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public announceDatetime: string;

    @Column({type: 'int', name: 'no1'})
    public no1: number;

    @Column({type: 'int', name: 'no2'})
    public no2: number;

    @Column({type: 'int', name: 'no3'})
    public no3: number;

    @Column({type: 'int', name: 'no4'})
    public no4: number;

    @Column({type: 'int', name: 'no5'})
    public no5: number;

    @Column({type: 'int', name: 'no6'})
    public no6: number;

    @Column({type: 'int', name: 'bonus_no'})
    public bonusNo: number;

    @Column({type: 'varchar', name: 'first_type'})
    public firstType: string;

    @Column({type: 'int', name: 'first_money'})
    public firstMoney: number;

    @Column({type: 'varchar', name: 'second_type'})
    public secondType: string;

    @Column({type: 'int', name: 'second_money'})
    public secondMoney: number;

    @Column({type: 'varchar', name: 'third_type'})
    public thirdType: string;

    @Column({type: 'int', name: 'third_money'})
    public thirdMoney: number;

    @Column({type: 'varchar', name: 'forth_type'})
    public forthType: string;

    @Column({type: 'int', name: 'forth_money'})
    public forthMoney: number;

    @Column({type: 'varchar', name: 'fifth_type'})
    public fifthType: string;

    @Column({type: 'int', name: 'fifth_money'})
    public fifthMoney: number;

    @Column({type: 'date', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d, 'd')
    }})
    public regDatetime: string;

    @Column({type: 'datetime', name: 'mod_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public modDatetime: string;

    @Column({type: 'int', name: 'total_join_count'})
    public totalJoinCount: number;

    @Column({type: 'varchar', name: 'announce_url'})
    public announceUrl: string;

    @Column({type: 'boolean', name: 'flag_first'})
    public flagFirst: boolean;

    @Column({type: 'boolean', name: 'flag_second'})
    public flagSecond: boolean;

    @Column({type: 'boolean', name: 'flag_third'})
    public flagThird: boolean;

    @Column({type: 'boolean', name: 'flag_forth'})
    public flagForth: boolean;

    @Column({type: 'boolean', name: 'flag_fifth'})
    public flagFifth: boolean;

    @Column({type: 'boolean', name: 'flag_delete_user'})
    public flagDeleteUser: boolean;

    @Column({type: 'boolean', name: 'flag_delete_join'})
    public flagDeleteJoin: boolean;
    
    @Column({type: 'varchar', name: 'banner_image'})
    public bannerImage: string;

}

@Entity({
    name: 'lottery'
})
export class LotteryJoin extends Lottery {
    @OneToOne(() => LotteryWinConditionJoin, lotteryWinCondition => lotteryWinCondition.lottery)
    @JoinColumn({name: 'lottery_round', referencedColumnName: 'lotteryRound'})
    public lotteryWinCondition: LotteryWinConditionJoin;
}