import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'jobs'
})
export class Jobs extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'queue'})
    public queue: string;

    @Column({type: 'longtext', name: 'payload'})
    public payload: string;

    @Column({type: 'tinyint', name: 'attempts'})
    public attempts: string;

    @Column({type: 'int', name: 'reserved_at'})
    public reserved_at: number;

    @Column({type: 'int', name: 'available_at'})
    public available_at: number;

    @Column({type: 'int', name: 'created_at'})
    public created_at: number;

}