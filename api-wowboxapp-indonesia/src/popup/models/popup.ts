import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Popup } from "../entities/popup";
import { PopupListFilter } from "../services/popup";


@Service()
export class PopupModel extends CoreModel<Popup> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Popup)
    }

    public async setFilter(builder: SelectQueryBuilder<Popup> | UpdateQueryBuilder<Popup> | DeleteQueryBuilder<Popup>, filter: PopupListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.aos) {
                builder.andWhere('aos = :aos', filter);
            }
            if(filter.ios) {
                builder.andWhere('ios = :ios', filter);
            }
            if(filter.display) {
                builder.andWhere('display = :display', filter);
            }
            if(filter.nation) {
                builder.andWhere(`nation = 'all' or nation like '%${filter.nation}%'`);
            }
            if(filter.startDatetime) {
                builder.andWhere(`start_datetime <= :startDatetime`, filter);
            }
            if(filter.endDatetime) {
                builder.andWhere(`end_datetime >= :endDatetime`, filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Popup>, filter: PopupListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}