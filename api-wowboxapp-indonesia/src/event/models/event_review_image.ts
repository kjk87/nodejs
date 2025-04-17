import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { EventReviewImage } from "../entities/event_review_image";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

export class EventReviewImageModel extends CoreModel<EventReviewImage> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, EventReviewImage)
    }

    public async setFilter(builder: SelectQueryBuilder<EventReviewImage> | UpdateQueryBuilder<EventReviewImage> | DeleteQueryBuilder<EventReviewImage>, filter: any, entity?: any): Promise<void> {
        
    }

    public async setJoin(builder: SelectQueryBuilder<EventReviewImage>, filter: any = {}, entity?: any): Promise<void> {
        
    }
}