import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxReviewModel } from "../models/luckybox_review";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LuckyboxReview, LuckyboxReviewJoin } from "../entities/luckybox_review";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { arrayObjectToValue, arrayToMap, arrayToMapArray, getLang, isNonEmptyArray, now } from "../../common/services/util";
import { LuckyboxReviewImageModel } from "../models/luckybox_review_image";
import { LuckyboxReviewImage } from "../entities/luckybox_review_image";
import { EntityManager } from "typeorm";
import { MemberA } from "../../member/entities/member_a";
import { MemberService } from "../../member/services/member";
import { HistoryPoint } from "../../history/entities/histroy_point";

export class LuckyboxReviewCreateParams {
    public seqNo?: number;
    public userKey?: string;
    public luckyboxPurchaseItemSeqNo?: number;
    public review?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public status?: number;
    public images?: LuckyboxReviewImage[];
}
export class LuckyboxReviewUpdateParams {
    public seqNo?: number;
    public userKey?: string;
    public luckyboxPurchaseItemSeqNo?: number;
    public review?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public status?: number;
    public images?: LuckyboxReviewImage[];
}
export interface LuckyboxReviewListFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    luckyboxPurchaseItemSeqNo?: number;
    review?: string;
    regDatetime?: string;
    modDatetime?: string;
    status?: number;
}
@Service()
export class LuckyboxReviewService extends CoreService {

     @Inject(()=> LuckyboxReviewModel)
     private luckyboxReviewModel: LuckyboxReviewModel;

     @Inject(()=> LuckyboxReviewImageModel)
     private luckyboxReviewImageModel: LuckyboxReviewImageModel;

     @Inject(()=> MemberService)
     private memberService: MemberService;

    constructor() {
         super();
    }

   @Transaction()
     public async create(req: Request, res: Response, params: LuckyboxReviewCreateParams, member: MemberA, manager?: EntityManager) {
          let luckyboxReview = new LuckyboxReview();

          luckyboxReview.userKey = member.userKey;
          luckyboxReview.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
          luckyboxReview.review = params.review;
          luckyboxReview.regDatetime = now();
          luckyboxReview.modDatetime = now();
          luckyboxReview.status = 1;

          await this.luckyboxReviewModel.create(luckyboxReview, manager);

          if(isNonEmptyArray(params.images)) {
               for(let i = 0; i < params.images.length; i++) {
                    let luckyboxReviewImage: LuckyboxReviewImage = new LuckyboxReviewImage();

                    luckyboxReviewImage.image = params.images[i].image;
                    luckyboxReviewImage.type = 'thumbnail';
                    luckyboxReviewImage.luckyboxReviewSeqNo = luckyboxReview.seqNo;

                    await this.luckyboxReviewImageModel.create(luckyboxReviewImage, manager);
               }
          }

          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'charge';
          historyPoint.category = 'wowboxReview';
          historyPoint.point = 100;
          historyPoint.subject = getLang('id').luckyBoxReviewPointSubject;
          historyPoint.comment = getLang('id').luckyBoxReviewPointComment;
          historyPoint.regDatetime = now();
          await this.memberService.updatePoint(historyPoint, member, manager);

          return luckyboxReview.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number, member: MemberA) {
         
          let filter = {
               joinColumn : [
                    {
                         joinTable: 'memberTotal'
                    }
               ]
          }

          let luckyboxReview = await this.luckyboxReviewModel.get(seqNo, LuckyboxReviewJoin, filter);
          if(!luckyboxReview) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
          luckyboxReview.images = await this.luckyboxReviewImageModel.all({luckyboxReviewSeqNo: luckyboxReview.seqNo});
          
          return luckyboxReview;
     }

     public async list(req: Request, res: Response, filter: LuckyboxReviewListFilter, order: IOrder[], paging: IPaging, member: MemberA) {
          
          filter = filter || {};
          filter.status = 1;
          filter.joinColumn = [
               {
                    joinTable: 'memberTotal'
               }
          ]
          
          let list = await this.luckyboxReviewModel.list(filter, order, paging, LuckyboxReviewJoin);

          if(list.list.length > 0) {
               let seqNoArr = arrayObjectToValue(list.list, 'seqNo');
               let imageList = await this.luckyboxReviewImageModel.all({luckyboxReviewSeqNo: seqNoArr});

               let imageMap = arrayToMapArray(imageList, 'luckyboxReviewSeqNo');

               for(let review of list.list) {
                    review.images = imageMap[review.seqNo];
               }
          }

          return list;
     }

   @Transaction()
     public async update(req: Request, res: Response, seqNo: number, params: LuckyboxReviewUpdateParams, member: MemberA, manager?: EntityManager) {
          let luckyboxReview = await this.luckyboxReviewModel.get(seqNo, undefined, undefined, manager);
          if(!luckyboxReview) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
          
          if(luckyboxReview.userKey != member.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION, 'not permission');
          }
          
          if(params.review !== undefined) {
               luckyboxReview.review = params.review;
               luckyboxReview.modDatetime = now();
               luckyboxReview.status = 1;
          };

          await this.luckyboxReviewModel.update(luckyboxReview, undefined, manager);

          await this.luckyboxReviewImageModel.deletesByFilter({luckyboxReviewSeqNo: seqNo}, undefined, manager);

          if(isNonEmptyArray(params.images)) {
               for(let i = 0; i < params.images.length; i++) {
                    let luckyboxReviewImage: LuckyboxReviewImage = new LuckyboxReviewImage();

                    luckyboxReviewImage.image = params.images[i].image;
                    luckyboxReviewImage.type = 'thumbnail';
                    luckyboxReviewImage.luckyboxReviewSeqNo = luckyboxReview.seqNo;

                    await this.luckyboxReviewImageModel.create(luckyboxReviewImage, undefined, manager);
               }
          }

          return luckyboxReview;
     }

     @Transaction()
     public async delete(req: Request, res: Response, seqNo: number, member: MemberA, manager?: EntityManager) {
          let luckyboxReview = await this.luckyboxReviewModel.get(seqNo);
          if(!luckyboxReview) {
              throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
          }

          if(luckyboxReview.userKey != member.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION, 'not permission');
          }

          await this.luckyboxReviewModel.delete(luckyboxReview, manager);
          await this.luckyboxReviewImageModel.deletesByFilter({luckyboxReviewSeqNo: seqNo}, undefined, manager);
          return luckyboxReview;
     }

     public async myList(req: Request, res: Response, filter: LuckyboxReviewListFilter, order: IOrder[], paging: IPaging, member: MemberA) {
          
          filter = filter || {};
          filter.userKey = member.userKey;
          filter.status = 1;
          filter.joinColumn = [
               {
                    joinTable: 'memberTotal'
               }
          ]
          
          let list = await this.luckyboxReviewModel.list(filter, order, paging, LuckyboxReviewJoin);

          if(list.list.length > 0) {
               let seqNoArr = arrayObjectToValue(list.list, 'seqNo');
               let imageList = await this.luckyboxReviewImageModel.all({luckyboxReviewSeqNo: seqNoArr});

               let imageMap = arrayToMapArray(imageList, 'luckyboxReviewSeqNo');

               for(let review of list.list) {
                    review.images = imageMap[review.seqNo];
               }
          }

          return list;
     }
}