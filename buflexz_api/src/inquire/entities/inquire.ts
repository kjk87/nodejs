
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { InquireImageJoin } from "./inquire_image";


@Entity({
    name: 'inquire'
})
export class Inquire extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char', name: 'user_key'})
    public userKey: string;
    
    @Column({type: 'varchar',  name: 'nation'})
    public nation: string;
    
    @Column({type: 'varchar',  name: 'type'})
    public type: string;//general, partnership, error, etc

    @Column({type: 'varchar',  name: 'status'})
    public status: string;//pending, complete
    
    @Column({type: 'varchar',  name: 'title'})
    public title: string;
    
    @Column({type: 'varchar',  name: 'contents'})
    public contents: string;
    
    @Column({type: 'varchar',  name: 'reply'})
    public reply: string;
    
    @Column({type: 'int',  name: 'replyer'})
    public replyer: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'datetime',  name: 'reply_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public replyDatetime: string;
}

@Entity({
    name: 'inquire'
})
export class InquireJoin extends Inquire {
    @OneToMany(() => InquireImageJoin, imageList => imageList.inquire)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'inquireSeqNo'})
    public imageList: InquireImageJoin[];
}