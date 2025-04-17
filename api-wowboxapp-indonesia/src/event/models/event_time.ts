import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventTime } from "../entities/event_time";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class EventTimeModel extends CoreModel<EventTime> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventTime)
    }

    public async setFilter(builder: SelectQueryBuilder<EventTime> | UpdateQueryBuilder<EventTime> | DeleteQueryBuilder<EventTime>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.eventSeqNo) {
                if(Array.isArray(filter.eventSeqNo)) {
                    builder.andWhere(`entity.event_seq_no in (:eventSeqNo)`, filter);
                } else {
                    builder.andWhere(`entity.event_seq_no = :eventSeqNo`, filter);
                }
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<EventTime>, filter: any = {}, entity?: any): Promise<void> {
        
    }
}