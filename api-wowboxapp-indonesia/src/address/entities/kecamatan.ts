
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'kecamatan'
})
export class Kecamatan extends CoreEntity {

    @PrimaryColumn({type: 'int',  name: 'id'})
    public id: number;

    @Column({type: 'int',  name: 'parent_id'})
    public parentId: number;
    
    @Column({type: 'varchar',  name: 'kecamatan'})
    public kecamatan: string;

}