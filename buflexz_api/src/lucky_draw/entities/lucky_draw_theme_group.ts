
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { LuckyDrawGift, LuckyDrawGiftJoin } from "./lucky_draw_gift";
import { LuckyDrawWinJoin } from "./lucky_draw_win";
import { LuckyDrawThemeJoin } from "./lucky_draw_theme";
import { LuckyDrawGroupJoin } from "./lucky_draw_group";

@Entity({
    name: 'lucky_draw_theme_group'
})
export class LuckyDrawThemeGroup extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int', name: 'lucky_draw_theme_seq_no'})
    public luckyDrawThemeSeqNo: number;
    
    @Column({type: 'int', name: 'lucky_draw_group_seq_no'})
    public luckyDrawGroupSeqNo: number;

    @Column({type: 'int', name: 'array'})
    public array: number;
}

@Entity({
    name: 'lucky_draw_theme_group'
})
export class LuckyDrawThemeGroupJoin extends LuckyDrawThemeGroup {
    @ManyToOne(() => LuckyDrawThemeJoin, luckyDrawTheme => luckyDrawTheme.groupList)
    @JoinColumn({name: 'lucky_draw_theme_seq_no', referencedColumnName: 'seqNo'})
    public luckyDrawTheme: LuckyDrawThemeJoin;

    @ManyToOne(() => LuckyDrawGroupJoin, luckyDrawGroup => luckyDrawGroup.themeGroupList)
    @JoinColumn({name: 'lucky_draw_group_seq_no', referencedColumnName: 'seqNo'})
    public luckyDrawGroup: LuckyDrawGroupJoin;
}