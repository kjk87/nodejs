import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'mission_levels'
})
export class MissionLevels extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'bigint', name: 'mission_id'})
    public mission_id: number;

    @Column({type: 'int', name: 'level'})
    public level: number;

    @Column({type: 'int', name: 'cost'})
    public cost: number;

    @Column({type: 'int', name: 'production_per_hour'})
    public production_per_hour: number;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}