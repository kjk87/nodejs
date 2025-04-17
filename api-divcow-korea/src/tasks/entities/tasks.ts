import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { TASKS_TYPE } from "../../common/services/type";
import { TelegramUserTasksJoin } from "../../telegram/entities/telegram_user_tasks";

@Entity({
    name: 'tasks'
})
export class Tasks extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'text', name: 'description'})
    public description: string;

    @Column({type: 'varchar', name: 'image'})
    public image: string;

    @Column({type: 'int', name: 'reward_coins'})
    public reward_coins: number;

    @Column({type: 'enum', enum: TASKS_TYPE, name: 'type'})
    public type: TASKS_TYPE;

    @Column({type: 'varchar', name: 'action_name'})
    public action_name: string;

    @Column({type: 'varchar', name: 'link'})
    public link: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}

@Entity({
    name: 'tasks'
})
export class TasksJoin extends Tasks {

    @OneToOne(() => TelegramUserTasksJoin, telegramUserTasksJoin => telegramUserTasksJoin.tasks_join)
    @JoinColumn({name: 'id', referencedColumnName: 'task_id'})
    public telegram_user_tasks: TelegramUserTasksJoin;

}