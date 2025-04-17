
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'member_delivery'
})
export class MemberDelivery extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'char',  name: 'user_key'})
    public userKey: string;
   
    @Column({type: 'char',  name: 'nation'})
    public nation: string;

    @Column({type: 'varchar',  name: 'nation_kr'})
    public nationKr: string;
    
    @Column({type: 'varchar',  name: 'receiver_name'})
    public receiverName: string;

    @Column({type: 'varchar',  name: 'method'})
    public method: string;
    
    @Column({type: 'varchar',  name: 'zipcode'})
    public zipcode: string;
    
    @Column({type: 'varchar',  name: 'addr1'})
    public addr1: string;
    
    @Column({type: 'varchar',  name: 'addr2'})
    public addr2: string;
    
    @Column({type: 'varchar',  name: 'state'})
    public state: string;

    @Column({type: 'varchar',  name: 'city'})
    public city: string;
    
    @Column({type: 'varchar',  name: 'detail'})
    public detail: string;
    
    @Column({type: 'varchar',  name: 'tel_nation'})
    public telNation: string;
    
    @Column({type: 'varchar',  name: 'tel_region'})
    public telRegion: string;
    
    @Column({type: 'varchar',  name: 'tel1'})
    public tel1: string;
    
    @Column({type: 'varchar',  name: 'tel2'})
    public tel2: string;
    
    @Column({type: 'varchar',  name: 'email'})
    public email: string;

}
