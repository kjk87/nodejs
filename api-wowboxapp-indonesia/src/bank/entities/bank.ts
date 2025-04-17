
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'bank'
})
export class Bank extends CoreEntity {

    @PrimaryColumn({type: 'varchar',  name: 'code'})
    public code: number;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;
}