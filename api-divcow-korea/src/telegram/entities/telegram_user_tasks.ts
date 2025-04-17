import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { Tasks, TasksJoin } from "../../tasks/entities/tasks";

@Entity({
    name: 'telegram_user_tasks'
})
export class TelegramUserTasks extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'telegram_user_id'})
    public telegram_user_id: number;

    @Column({type: 'bigint', name: 'task_id'})
    public task_id: number;

    @Column({type: 'boolean', name: 'is_submitted'})
    public is_submitted: boolean;

    @Column({type: 'boolean', name: 'is_rewarded'})
    public is_rewarded: boolean;

    @Column({type: 'timestamp', name: 'submitted_at'})
    public submitted_at: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}

@Entity({
    name: 'telegram_user_tasks'
})
export class TelegramUserTasksJoin extends TelegramUserTasks {
    
    @ManyToOne(() => TasksJoin, tasksJoin => tasksJoin.telegram_user_tasks)
    @JoinColumn({name: 'task_id', referencedColumnName: 'id'})
    public tasks_join: TasksJoin;
}