
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'app'
})
export class App extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'platform'})
    public platform: string;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;
    
    @Column({type: 'varchar',  name: 'version'})
    public version: string;

    @Column({type: 'boolean',  name: 'is_vital'})
    public isVital: boolean;
    
    @Column({type: 'boolean',  name: 'is_open'})
    public isOpen: boolean;

    @Column({type: 'varchar',  name: 'store_url'})
    public storeUrl: string;
    
    @Column({type: 'varchar',  name: 'comment'})
    public comment: string;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}