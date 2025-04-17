import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'buff_coin_info'
})
export class BuffCoinInfo extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'double', name: 'btc'})
    public btc: number;
    
    @Column({type: 'double', name: 'usdt'})
    public usdt: number;
    
    @Column({type: 'datetime', name: 'mod_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public modDatetime: string;
}