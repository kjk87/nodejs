import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Banner } from "../entities/banner";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { BannerListFilter } from "../services/banner";


@Service()
export class BannerModel extends CoreModel<Banner> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Banner)
    }

    public async setFilter(builder: SelectQueryBuilder<Banner> | UpdateQueryBuilder<Banner> | DeleteQueryBuilder<Banner>, filter: BannerListFilter, entity?: any): Promise<void> {
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
            if(filter.type) {
                builder.andWhere('type = :type', filter);
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

    public async setJoin(builder: SelectQueryBuilder<Banner>, filter: BannerListFilter = {}, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}