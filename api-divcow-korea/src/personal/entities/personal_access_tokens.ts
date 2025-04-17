import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'personal_access_tokens'
})
export class PersonalAccessTokens extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'tokenable_type'})
    public tokenable_type: string;

    @Column({type: 'bigint', name: 'tokenable_id'})
    public tokenable_id: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'varchar', name: 'token'})
    public token: string;

    @Column({type: 'text', name: 'abilities'})
    public abilities: string;

    @Column({type: 'timestamp', name: 'last_used_at'})
    public last_used_at: string;

    @Column({type: 'timestamp', name: 'expires_at'})
    public expires_at: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}