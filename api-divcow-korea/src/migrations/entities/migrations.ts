import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'migrations'
})
export class Migrations extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'migration'})
    public migration: string;

    @Column({type: 'int', name: 'batch'})
    public batch: number;

}