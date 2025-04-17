
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawThemeGroupJoin } from "./lucky_draw_theme_group";

@Entity({
    name: 'lucky_draw_theme'
})
export class LuckyDrawTheme extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar', name: 'status'})
    public status: string;//active', 'inactive'

    @Column({type: 'boolean', name: 'ios'})
    public ios: boolean;

    @Column({type: 'boolean', name: 'aos'})
    public aos: boolean;
    
    @Column({type: 'varchar', name: 'title'})
    public title: string;
    
    @Column({type: 'varchar', name: 'comment'})
    public comment: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

    @Column({type: 'int', name: 'array'})
    public array: number;

}

@Entity({
    name: 'lucky_draw_theme'
})
export class LuckyDrawThemeJoin extends LuckyDrawTheme {
    @OneToMany(() => LuckyDrawThemeGroupJoin, luckyDrawThemeGroup=> luckyDrawThemeGroup.luckyDrawTheme)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'luckyDrawThemeSeqNo'})
    public groupList: LuckyDrawThemeGroupJoin[];

}