import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Popups } from "../entities/popups";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { PopupsListFilter } from "../services/popups";

@Service()
export class PopupsModel extends CoreModel<Popups> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, Popups);
    }

    public async setFilter(builder: SelectQueryBuilder<Popups> | UpdateQueryBuilder<Popups> | DeleteQueryBuilder<Popups>, filter: PopupsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.title) {
                builder.andWhere('title = :title', filter);
            }
            if(filter.text) {
                builder.andWhere('text = :text', filter);
            }
            if(filter.image) {
                builder.andWhere('image = :image', filter);
            }
            if(filter.button_text) {
                builder.andWhere('button_text = :button_text', filter);
            }
            if(filter.button_link) {
                builder.andWhere('button_link = :button_link', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Popups>, filter: PopupsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}