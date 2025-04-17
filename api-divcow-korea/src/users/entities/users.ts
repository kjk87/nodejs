import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'users'
})
export class Users extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'varchar', name: 'email'})
    public email: string;

    @Column({type: 'timestamp', name: 'email_verified_at'})
    public email_verified_at: string;

    @Column({type: 'varchar', name: 'password'})
    public password: string;

    @Column({type: 'varchar', name: 'remember_token'})
    public remember_token: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}