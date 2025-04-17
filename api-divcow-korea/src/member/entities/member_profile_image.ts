
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'member_profile_image'
})
export class MemberProfileImage extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;
    
    @Column({type: 'varchar',  name: 'image'})
    public image: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;//active, inactive
    
    @Column({type: 'int',  name: 'array'})
    public array: number;
    
    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}
