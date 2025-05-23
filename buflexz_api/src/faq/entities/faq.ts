
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'faq'
})
export class Faq extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'boolean', name: 'aos'})
    public aos: boolean;
    
    @Column({type: 'boolean', name: 'ios'})
    public ios: boolean;

    @Column({type: 'int',  name: 'category'})
    public category: number;

    @Column({type: 'varchar',  name: 'nation'})
    public nation: string;
    
    @Column({type: 'varchar',  name: 'status'})
    public status: string;//active, inactive

    @Column({type: 'varchar',  name: 'title'})
    public title: string;
    
    @Column({type: 'varchar',  name: 'contents'})
    public contents: string;
    
    @Column({type: 'int',  name: 'aos_array'})
    public aosArray: number;
    
    @Column({type: 'int',  name: 'ios_array'})
    public iosArray: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}