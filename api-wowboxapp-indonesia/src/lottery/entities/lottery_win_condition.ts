
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { LotteryJoin } from "./lottery";

@Entity({
    name: 'lottery_win_condition'
})
export class LotteryWinCondition extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lottery_round'})
    public lotteryRound: number;

    @Column({type: 'int',  name: 'first_grade'})
    public firstGrade: number;

    @Column({type: 'int',  name: 'second_grade'})
    public secondGrade: number;

    @Column({type: 'int',  name: 'third_grade'})
    public thirdGrade: number;

    @Column({type: 'int',  name: 'forth_grade'})
    public forthGrade: number;

    @Column({type: 'int',  name: 'fifth_grade'})
    public fifthGrade: number;

    @Column({type: 'decimal',  name: 'first_money'})
    public firstMoney: number;

    @Column({type: 'decimal',  name: 'second_money'})
    public secondMoney: number;

    @Column({type: 'decimal',  name: 'third_money'})
    public thirdMoney: number;

    @Column({type: 'decimal',  name: 'forth_money'})
    public forthMoney: number;

    @Column({type: 'decimal',  name: 'fifth_money'})
    public fifthMoney: number;

    @Column({type: 'int',  name: 'winner_count'})
    public winnerCount: number;

    @Column({type: 'decimal',  name: 'winner_usdt_amount'})
    public winnerUsdtAmount: number;

}

@Entity({
    name: 'lottery_win_condition'
})
export class LotteryWinConditionJoin extends LotteryWinCondition {
    @OneToOne(() => LotteryJoin, lottery => lottery.lotteryWinCondition)
    @JoinColumn({name: 'lottery_round', referencedColumnName: 'lotteryRound'})
    public lottery: LotteryJoin;
}