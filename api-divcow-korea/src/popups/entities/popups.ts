import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'popups'
})
export class Popups extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'title'})
    public title: string;

    @Column({type: 'varchar', name: 'text'})
    public text: string;

    @Column({type: 'varchar', name: 'image'})
    public image: string;

    @Column({type: 'varchar', name: 'button_text'})
    public button_text: string;

    @Column({type: 'varchar', name: 'button_link'})
    public button_link: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

    @Column({type: 'timestamp', name: 'updated_at'})
    public updated_at: string;

}