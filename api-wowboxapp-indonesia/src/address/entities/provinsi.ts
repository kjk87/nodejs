
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'provinsi'
})
export class Provinsi extends CoreEntity {

    @PrimaryColumn({type: 'int',  name: 'id'})
    public id: number;

    @Column({type: 'varchar',  name: 'provinsi'})
    public provinsi: string;

}