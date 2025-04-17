
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'ems_country'
})
export class EmsCountry extends CoreEntity {

    @PrimaryColumn({type: 'char',  name: 'country_code'})
    public countryCode: string;

    @Column({type: 'varchar',  name: 'country'})
    public country: string;
}