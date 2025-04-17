
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'config'
})
export class Config extends CoreEntity {

    @PrimaryColumn({type: 'varchar',  name: 'code'})
    public code: string;

    @Column({type: 'longtext',  name: 'config'})
    public config: string;

}