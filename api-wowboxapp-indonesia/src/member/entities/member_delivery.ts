
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
   
    @Column({type: 'varchar',  name: 'receiver_name'})
    public receiverName: string;

    @Column({type: 'varchar',  name: 'receiver_family_name'})
    public receiverFamilyName: string;
    
    @Column({type: 'varchar',  name: 'receiver_post_code'})
    public receiverPostCode: string;
    
    @Column({type: 'varchar',  name: 'receiver_tel'})
    public receiverTel: string;
    
    @Column({type: 'varchar',  name: 'receiver_address'})
    public receiverAddress: string;
    
    @Column({type: 'varchar',  name: 'receiver_address2'})
    public receiverAddress2: string;

    @Column({type: 'varchar',  name: 'receiver_provinsi'})
    public receiverProvinsi: string;
    
    @Column({type: 'varchar',  name: 'receiver_kabkota'})
    public receiverKabkota: string;
    
    @Column({type: 'varchar',  name: 'receiver_kecamatan'})
    public receiverKecamatan: string;
    
    @Column({type: 'varchar',  name: 'delivery_memo'})
    public deliveryMemo: string;

}
