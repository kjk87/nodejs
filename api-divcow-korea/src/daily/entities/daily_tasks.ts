import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'daily_tasks'
})
export class DailyTasks extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'varchar', name: 'description'})
    public description: string;

    @Column({type: 'int', name: 'required_login_streak'})
    public required_login_streak: number;

    @Column({type: 'int', name: 'reward_coins'})
    public reward_coins: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}