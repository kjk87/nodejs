
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'lottery_winner'
})
export class LotteryWinner extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'varchar',  name: 'nickname'})
    public nickname: string;

    @Column({type: 'varchar',  name: 'profile'})
    public profile: string;

    @Column({type: 'int',  name: 'rank'})
    public rank: number;

    @Column({type: 'decimal',  name: 'amount'})
    public amount: number;
    
    @Column({type: 'varchar',  name: 'reply'})
    public reply: string;

    @Column({type: 'date',  name: 'date', transformer: {
        to: d => d,
        from: d => translationDatetime(d, 'd')
    }})
    public date: string;

    @Column({type: 'varchar',  name: 'time'})
    public time: string;

}