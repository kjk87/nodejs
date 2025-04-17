import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'buff_invite_mining'
})
export class BuffInviteMining extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'decimal',  name: 'coin'})
    public coin: number;
    
    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
}