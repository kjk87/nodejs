
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity()
export class LotteryJoin extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lottery_round'})
    public lotteryRound: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

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

    @Column({type: 'datetime', name: 'join_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public joinDatetime: string;
}