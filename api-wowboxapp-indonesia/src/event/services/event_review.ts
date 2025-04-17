import { Inject, Service } from "typedi";
import { EntityManager } from "typeorm";
import { CoreService } from "../../common/core/CoreService";
import { isNonEmptyArray, now } from "../../common/services/util";
import { EventReview, EventReviewJoin } from "../entities/event_review";
import { EventReviewImage } from "../entities/event_review_image";
import { EventReviewModel } from "../models/event_review";
import { EventReviewImageModel } from "../models/event_review_image";
import { Request, Response } from 'express';
import { CoreError } from "../../common/core/CoreError";
import * as ErrorType from "../../common/services/errorType";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { Transaction } from "../../common/services/decorators";

@Service()
export class EventReviewService extends CoreService {

    @Inject(()=> EventReviewModel)
    private eventReviewModel: EventReviewModel;

    @Inject(()=> EventReviewImageModel)
    private eventReviewImageModel: EventReviewImageModel;


    @Transaction()
    public async create(req:Request, res:Response, params, member: MemberA, manager?: EntityManager) {
        
        params.review = params.review;

        let review = new EventReview();
        review.userKey = member.userKey;
        review.eventSeqNo = params.eventSeqNo;
        review.eventWinSeqNo = params.eventWinSeqNo;
        review.eventGiftSeqNo = params.eventGiftSeqNo;
        review.review = params.review;
        review.regDatetime = now();
        review.modDatetime = now();
        review.status = 1;
        
        review = await this.eventReviewModel.create(review, undefined, manager)

        if(isNonEmptyArray(params.images)) {
            for(let image of params.images) {
                let eventReviewImage = new EventReviewImage();

                eventReviewImage.eventReviewSeqNo = review.seqNo;
                eventReviewImage.image = image.image;
                eventReviewImage.array = image.array;
                eventReviewImage.type = 'thumbnail';

                await this.eventReviewImageModel.create(eventReviewImage, undefined, manager);
            }
        }

        return review;
    }

  @Transaction()
    public async update(req: Request, res: Response, reviewSeqNo:number, params, member: MemberA, manager?: EntityManager) {
        
        let review = await this.eventReviewModel.get(reviewSeqNo);

        if(!review) {
            throw new CoreError(ErrorType.E_NOTFOUND)
        }

        if(review.userKey != member.userKey) {
            throw new CoreError(ErrorType.E_NOTPERMISSION)
        }

        review.review = params.review;
        review.modDatetime = now();
        review.status = 1;

        await this.eventReviewModel.update(review, undefined, manager);
        
        if(isNonEmptyArray(params.images)) {
            for(let image of params.images) {
                let eventReviewImage = new EventReviewImage();

                eventReviewImage.eventReviewSeqNo = review.seqNo;
                eventReviewImage.image = image.image;
                eventReviewImage.array = image.array;
                eventReviewImage.type = 'thumbnail';

                await this.eventReviewImageModel.update(eventReviewImage, undefined, manager);

            }
        }
        
        return review;
    }

    public async list(req: Request, res: Response, filter, order: IOrder[], paging: IPaging) {
        let _filter = {
            status: 1        }

        //order = orderingKey(order);

        return await this.eventReviewModel.list(_filter, order, paging, EventReviewJoin);

    }

    public async myList(req: Request, res: Response, order: IOrder[], paging: IPaging, member: MemberA) {
        let _filter = {
            user_key: member.userKey,
            status: 1
        }

        //order = orderingKey(order);

        return await this.eventReviewModel.list(_filter, order, paging, EventReviewJoin);
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let _filter = {
            seq_no: seqNo,
            my: false
        }

        return await this.eventReviewModel.getByFilter(_filter, null, EventReviewJoin);

        
    }
}




