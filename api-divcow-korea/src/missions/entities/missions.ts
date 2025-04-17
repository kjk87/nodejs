import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'missions'
})
export class Missions extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'bigint', name: 'mission_type_id'})
    public mission_type_id: number;

    @Column({type: 'varchar', name: 'image'})
    public image: string;

    @Column({type: 'int', name: 'required_user_level'})
    public required_user_level: number;

    @Column({type: 'int', name: 'required_friends_invitation'})
    public required_friends_invitation: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}