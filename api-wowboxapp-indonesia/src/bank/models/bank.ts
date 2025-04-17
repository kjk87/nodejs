import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Bank } from "../entities/bank";
import { BankFilter } from "../services/bank";

@Service()
export class BankModel extends CoreModel<Bank> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, Bank);
    }

    public async setFilter(builder: SelectQueryBuilder<Bank> | UpdateQueryBuilder<Bank> | DeleteQueryBuilder<Bank>, filter: BankFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.code) {
                builder.andWhere('code = :code', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<Bank>, filter: BankFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}