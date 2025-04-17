import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'sns_reward'
})
export class SnsReward extends CoreEntity {

    @PrimaryColumn({type: 'char',  name: 'user_key'})
    public userKey: string;

    @Column({type: 'boolean', name: 'youtube'})
    public youtube: boolean;

    @Column({type: 'boolean', name: 'telegram'})
    public telegram: boolean;

    @Column({type: 'boolean', name: 'discord'})
    public discord: boolean;

    @Column({type: 'boolean', name: 'x'})
    public x: boolean;

    @Column({type: 'boolean', name: 'instagram'})
    public instagram: boolean;

}