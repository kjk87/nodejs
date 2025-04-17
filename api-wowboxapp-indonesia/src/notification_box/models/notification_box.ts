import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { NotificationBox } from "../entities/notification_box";
import { NotificationBoxFilter } from "../service/notification_box";


@Service()
export class NotificationBoxModel extends CoreModel<NotificationBox> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, NotificationBox);
    }

    public async setFilter(builder: SelectQueryBuilder<NotificationBox> | UpdateQueryBuilder<NotificationBox> | DeleteQueryBuilder<NotificationBox>, filter: NotificationBoxFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<NotificationBox>, filter: NotificationBoxFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}