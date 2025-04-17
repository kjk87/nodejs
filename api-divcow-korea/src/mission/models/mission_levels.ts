import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { MissionLevels } from "../entities/mission_levels";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { MissionLevelsListFilter } from "../services/mission_levels";

@Service()
export class MissionLevelsModel extends CoreModel<MissionLevels> {
    constructor() {
        super(DUCKCOIN_DATASOURCE, MissionLevels);
    }

    public async setFilter(builder: SelectQueryBuilder<MissionLevels> | UpdateQueryBuilder<MissionLevels> | DeleteQueryBuilder<MissionLevels>, filter: MissionLevelsListFilter, entity?: any): Promise<void> {
         if(filter) {
            if(filter.id) {
                builder.andWhere('id = :id', filter);
            }
            if(filter.mission_id) {
                builder.andWhere('mission_id = :mission_id', filter);
            }
            if(filter.level) {
                builder.andWhere('level = :level', filter);
            }
            if(filter.cost) {
                builder.andWhere('cost = :cost', filter);
            }
            if(filter.production_per_hour) {
                builder.andWhere('production_per_hour = :production_per_hour', filter);
            }
            if(filter.created_at) {
                builder.andWhere('created_at = :created_at', filter);
            }
            if(filter.updated_at) {
                builder.andWhere('updated_at = :updated_at', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MissionLevels>, filter: MissionLevelsListFilter, entity?: any): Promise<void> {
       if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getNextLevel(mission_id: number, telegram_user_id: number, manager?: EntityManager) {
        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return (await manager.query(`
                select * from mission_levels ml
                where ml.id not in (select mission_level_id from telegram_user_missions where telegram_user_id=${telegram_user_id})
                and ml.mission_id=${mission_id}
                order by ml.id asc limit 1
        `))[0];
    }

    public async getSumProductionPerHour(mission_id: number, telegram_user_id: number, manager?: EntityManager) {
        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return (await manager.query(`
                select sum(ml.production_per_hour) as production_per_hour from mission_levels ml
                where ml.id in (select mission_level_id from telegram_user_missions where telegram_user_id=${telegram_user_id})
                and ml.mission_id=${mission_id}
        `))[0].production_per_hour;
    }
}