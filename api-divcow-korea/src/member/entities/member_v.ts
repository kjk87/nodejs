
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { MemberA } from "./member_a";


@Entity({
    name: 'member_v'
})
export class MemberV extends MemberA {

}