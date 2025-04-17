import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'sessions'
})
export class Sessions extends CoreEntity {

    @PrimaryColumn({type: 'varchar', name: 'id'})
    public id: string;

    @Column({type: 'bigint', name: 'user_id'})
    public user_id: number;

    @Column({type: 'varchar', name: 'ip_address'})
    public ip_address: string;

    @Column({type: 'text', name: 'user_agent'})
    public user_agent: string;

    @Column({type: 'longtext', name: 'payload'})
    public payload: string;

    @Column({type: 'int', name: 'last_activity'})
    public last_activity: number;

}