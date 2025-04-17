
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";


@Entity({
    name: 'nation'
})
export class Nation extends CoreEntity {

    @PrimaryColumn({type: 'char',  name: 'code'})
    public code: string;

    @Column({type: 'varchar',  name: 'name'})
    public name: string;
    
    @Column({type: 'varchar',  name: 'name_en'})
    public nameEn: string;

    @Column({type: 'varchar',  name: 'nation_no'})
    public nationNo: string;

    @Column({type: 'float',  name: 'bonus_commission'})
    public bonusCommission: number;
    
    @Column({type: 'float',  name: 'ad_commission'})
    public adCommission: number;
    
    @Column({type: 'float',  name: 'ball_commission'})
    public ballCommission: number;

    @Column({type: 'datetime',  name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}