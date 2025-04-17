import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { GameRankingJoin } from "../../ranking/entities/game_ranking";
import { GamesJoin } from "./games";

@Entity({
    name: 'game_category'
})
export class GameCategory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar', name: 'status'})
    public status: string;
    
    @Column({type: 'varchar', name: 'title'})
    public title: string;
    
    @Column({type: 'varchar', name: 'image'})
    public image: string;

    @Column({type: 'varchar', name: 'priority'})
    public priority: number;

    @Column({type: 'int', select: false, update: false, insert: false})
    public gameCount: number;
}

@Entity({ 
    name: 'game_category'
})
export class GameCategoryJoin extends GameCategory {

    @OneToMany(() => GamesJoin, games => games.gameCategory)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'categorySeqNo'})
    public games: GamesJoin;

}