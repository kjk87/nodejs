import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EmsCountry } from "../entities/ems_country";
import { EmsCountryFilter } from "../service/ems_country";

@Service()
export class EmsCountryModel extends CoreModel<EmsCountry> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EmsCountry);
    }

    public async setFilter(builder: SelectQueryBuilder<EmsCountry> | UpdateQueryBuilder<EmsCountry> | DeleteQueryBuilder<EmsCountry>, filter: EmsCountryFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.countryCode) {
                builder.andWhere('country_code = :countryCode', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<EmsCountry>, filter: EmsCountryFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}