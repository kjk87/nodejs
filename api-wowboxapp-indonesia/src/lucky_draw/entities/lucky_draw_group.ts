
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawGift, LuckyDrawGiftJoin } from "./lucky_draw_gift";
import { LuckyDrawWinJoin } from "./lucky_draw_win";
import { LuckyDrawThemeGroupJoin } from "./lucky_draw_theme_group";

@Entity({
    name: 'lucky_draw_group'
})
export class LuckyDrawGroup extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar', name: 'status'})
    public status: string;//active', 'inactive'

    @Column({type: 'varchar', name: 'title'})
    public title: string;
    
    @Column({type: 'varchar', name: 'contents'})
    public contents: string;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'varchar', name: 'comment'})
    public comment: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}

@Entity({
    name: 'lucky_draw_group'
})
export class LuckyDrawGroupJoin extends LuckyDrawGroup {
    @OneToMany(() => LuckyDrawThemeGroupJoin, luckyDrawThemeGroup=> luckyDrawThemeGroup.luckyDrawGroup)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'luckyDrawGroupSeqNo'})
    public themeGroupList: LuckyDrawThemeGroupJoin[];

}