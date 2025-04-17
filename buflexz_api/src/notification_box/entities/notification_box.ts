
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'notification_box'
})
export class NotificationBox extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;
    
    @Column({type: 'varchar',  name: 'contents'})
    public contents: string;
    
    @Column({type: 'varchar',  name: 'inner_type'})
    public innerType: string;
    
    @Column({type: 'varchar',  name: 'move_type'})
    public moveType: string;
    
    @Column({type: 'varchar',  name: 'outer_url'})
    public outerUrl: string;
    
    @Column({type: 'int',  name: 'target'})
    public target: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;
    
    @Column({type: 'datetime',  name: 'read_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public readDatetime: string;

    @Column({type: 'boolean',  name: 'is_read'})
    public isRead: boolean;

}