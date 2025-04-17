import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'failed_jobs'
})
export class FailedJobs extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'uuid'})
    public uuid: string;

    @Column({type: 'text', name: 'connection'})
    public connection: string;

    @Column({type: 'text', name: 'queue'})
    public queue: string;

    @Column({type: 'longtext', name: 'payload'})
    public payload: string;

    @Column({type: 'longtext', name: 'exception'})
    public exception: string;

    @Column({type: 'timestamp', name: 'failed_at'})
    public failed_at: string;

}