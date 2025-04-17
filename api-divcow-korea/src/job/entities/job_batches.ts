import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'job_batches'
})
export class JobBatches extends CoreEntity {

    @PrimaryColumn({type: 'varchar', name: 'id'})
    public id: string;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'int', name: 'total_jobs'})
    public total_jobs: number;

    @Column({type: 'int', name: 'pending_jobs'})
    public pending_jobs: number;

    @Column({type: 'int', name: 'failed_jobs'})
    public failed_jobs: number;

    @Column({type: 'longtext', name: 'failed_job_ids'})
    public failed_job_ids: string;

    @Column({type: 'mediumtext', name: 'options'})
    public options: string;

    @Column({type: 'int', name: 'cancelled_at'})
    public cancelled_at: number;

    @Column({type: 'int', name: 'created_at'})
    public created_at: number;

    @Column({type: 'int', name: 'finished_at'})
    public finished_at: number;

}