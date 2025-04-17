import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'cache'
})
export class Cache extends CoreEntity {

    @PrimaryColumn({type: 'varchar', name: 'key'})
    public key: string;

    @Column({type: 'mediumtext', name: 'value'})
    public value: string;

    @Column({type: 'int', name: 'expiration'})
    public expiration: number;

}