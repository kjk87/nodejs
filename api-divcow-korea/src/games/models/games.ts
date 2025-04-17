import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { Games } from "../entities/games";
import { GamesListFilter } from "../services/games";

@Service()
export class GamesModel extends CoreModel<Games> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Games);
    }

    public async setFilter(builder: SelectQueryBuilder<Games> | UpdateQueryBuilder<Games> | DeleteQueryBuilder<Games>, filter: GamesListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.name) {
                builder.andWhere('name = :name', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.banner_image) {
                builder.andWhere('banner_image = :banner_image', filter);
            }
            if(filter.url) {
                builder.andWhere('url = :url', filter);
            }
            if(filter.priority) {
                builder.andWhere('priority = :priority', filter);
            }
            if(filter.is_ranking != undefined) {
                builder.andWhere('is_ranking = :is_ranking', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Games>, filter: GamesListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}