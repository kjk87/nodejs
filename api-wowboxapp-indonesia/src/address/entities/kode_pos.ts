
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'kode_pos'
})
export class KodePos extends CoreEntity {

    @PrimaryColumn({type: 'int',  name: 'id'})
    public id: number;

    @Column({type: 'int',  name: 'parent_id'})
    public parentId: number;
    
    @Column({type: 'varchar',  name: 'provinsi'})
    public provinsi: string;

    @Column({type: 'varchar',  name: 'kabkota'})
    public kabkota: string;

    @Column({type: 'varchar',  name: 'kecamatan'})
    public kecamatan: string;

    @Column({type: 'varchar',  name: 'kelurahan'})
    public kelurahan: string;

    @Column({type: 'varchar',  name: 'kode_pos'})
    public kodePos: string;

}