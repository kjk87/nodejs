import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'cache_locks'
})
export class CacheLocks extends CoreEntity {

    @PrimaryColumn({type: 'varchar', name: 'key'})
    public key: string;

    @Column({type: 'varchar', name: 'owner'})
    public owner: string;

    @Column({type: 'int', name: 'expiration'})
    public expiration: number;

}