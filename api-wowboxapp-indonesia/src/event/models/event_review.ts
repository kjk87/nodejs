import { Service } from "typedi";
import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventReview, EventReviewJoin } from "../entities/event_review";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class EventReviewModel extends CoreModel<EventReview> {
    
    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventReview)
    }

    public async setFilter(builder: SelectQueryBuilder<EventReview> | UpdateQueryBuilder<EventReview> | DeleteQueryBuilder<EventReview>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.user_key) {
                this.equalsIn(builder, filter, 'user_key', 'entity')
            }
            if(filter.status) {
                this.equalsIn(builder, filter, 'status', 'entity');
            }
            if(filter.seq_no) {
                this.equalsIn(builder, filter, 'seq_no', 'entity');
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<EventReview>, filter: any = {}, entity?: any): Promise<void> {
        if(entity == EventReviewJoin) {
            builder.leftJoinAndSelect('entity.eventReviewImage', 'eventReviewImage'); 
        }

        if(filter.my === false) {
            builder.addSelect(`(select count(1) from event_reply where event_review_seq_no = entity.seq_no and status = 1)`, 'entity_reply_count');
        } else if(filter.my === true) {
            builder.addSelect(`(select count(1) from event_reply where event_review_seq_no = entity.seq_no and status = 1)`, 'entity_reply_count');
        }
    }

    
}