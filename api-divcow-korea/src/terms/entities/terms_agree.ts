
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'terms_agree'
})
export class TermsAgree extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'int',  name: 'terms_seq_no'})
    public termsSeqNo: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}