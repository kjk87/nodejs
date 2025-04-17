import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { GameRankingJoin } from "../../ranking/entities/game_ranking";
import { GameCategoryJoin } from "./game_category";

@Entity({
    name: 'games'
})
export class Games extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    public id: number;

    @Column({type: 'varchar', name: 'type'})
    public type: string;//web, external
    
    @Column({type: 'varchar', name: 'name'})
    public name: string;

    @Column({type: 'varchar', name: 'description'})
    public description: string;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'varchar', name: 'banner_image'})
    public banner_image: string;

    @Column({type: 'varchar', name: 'url'})
    public url: string;

    @Column({type: 'varchar', name: 'orientation'})
    public orientation: string;

    @Column({type: 'date', name: 'announce_date', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public announce_date: string;

    @Column({type: 'int', name: 'period'})
    public period: number;
    
    @Column({type: 'boolean', name: 'is_ranking'})
    public is_ranking: boolean;

    @Column({type: 'varchar', name: 'prize_type'})
    public prize_type: string;

    @Column({type: 'int', name: 'prize_1'})
    public prize_1: number;

    @Column({type: 'int', name: 'prize_2'})
    public prize_2: number;

    @Column({type: 'int', name: 'prize_3'})
    public prize_3: number;

    @Column({type: 'int', name: 'prize_other'})
    public prize_other: number;

    @Column({type: 'int', name: 'category_seq_no'})
    public category_seq_no: number;

    @Column({type: 'int', name: 'cut_off_score'})
    public cut_off_score: number;
}

@Entity({ 
    name: 'games'
})
export class GamesJoin extends Games {

    @OneToOne(() => GameRankingJoin, rankin => rankin.games)
    @JoinColumn({name: 'id', referencedColumnName: 'games_id'})
    public ranking: GameRankingJoin;

    @ManyToOne(() => GameCategoryJoin, gameCategory => gameCategory.games)
    @JoinColumn({name: 'category_seq_no', referencedColumnName: 'seqNo'})
    public gameCategory: GameCategoryJoin;

}