import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Notice } from "../entities/notice";
import { NoticeFilter } from "../service/notice";

@Service()
export class NoticeModel extends CoreModel<Notice> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, Notice);
    }

    public async setFilter(builder: SelectQueryBuilder<Notice> | UpdateQueryBuilder<Notice> | DeleteQueryBuilder<Notice>, filter: NoticeFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.aos) {
                builder.andWhere('aos = :aos', filter);
            }
            if(filter.ios) {
                builder.andWhere('ios = :ios', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.condition) {
                builder.andWhere(filter.condition);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Notice>, filter: NoticeFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}