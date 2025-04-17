import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'banner'
})
export class Banner extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number; 
    
    @Column({type: 'boolean', name: 'aos'})
    public aos: boolean;
    
    @Column({type: 'boolean', name: 'ios'})
    public ios: boolean;
    
    @Column({type: 'varchar', name: 'type'})
    public type: string;

    @Column({type: 'varchar', name: 'nation'})
    public nation: string;

    @Column({type: 'varchar', name: 'title'})
    public title: string;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'boolean', name: 'display'})
    public display: boolean;
    
    @Column({type: 'datetime', name: 'start_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public startDatetime: string;
    
    @Column({type: 'datetime', name: 'end_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public endDatetime: string;
    
    @Column({type: 'varchar', name: 'move_type'})
    public moveType: string;//none, inner, outer
    
    @Column({type: 'varchar', name: 'inner_type'})
    public innerType: string;//notice, faq, main
    
    @Column({type: 'varchar', name: 'outer_url'})
    public outerUrl: string;

    @Column({type: 'int', name: 'target1'})
    public target1: number;

    @Column({type: 'int', name: 'target2'})
    public target2: number;

    @Column({type: 'int', name: 'android_array'})
    public androidArray: number;

    @Column({type: 'int', name: 'ios_array'})
    public iosArray: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public regDatetime: string;
}

export class FrontBanner {
    public seqNo: number = NaN;
    public image: string = undefined;
    public type: string = undefined;
    public title: string = undefined;
    public innerType: string = undefined;
    public moveType: string = undefined;
    public moveTarget: string = undefined;
}