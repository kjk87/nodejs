import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxReviewImageModel } from "../models/luckybox_review_image";
import { IsNotEmpty } from "../../common/services/decorators";
import { LuckyboxReviewImage } from "../entities/luckybox_review_image";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LuckyboxReviewImageCreateParams {
    public seqNo?: number;
    public luckyboxReviewSeqNo?: number;
    public image?: string;
    public array?: number;
    public type?: string;
}
export class LuckyboxReviewImageUpdateParams {
    public seqNo?: number;
    public luckyboxReviewSeqNo?: number;
    public image?: string;
    public array?: number;
    public type?: string;
}
export interface LuckyboxReviewImageListFilter extends ListFilter {
    seqNo?: number;
    luckyboxReviewSeqNo?: number;
    image?: string;
    array?: number;
    type?: string;
}
@Service()
export class LuckyboxReviewImageService extends CoreService {

    @Inject(()=> LuckyboxReviewImageModel)
    private luckyboxReviewImageModel: LuckyboxReviewImageModel;

    constructor() {
         super();
    }

    public async create(req: Request, res: Response, params: LuckyboxReviewImageCreateParams) {
         let luckyboxReviewImage = new LuckyboxReviewImage();

         luckyboxReviewImage.seqNo = params.seqNo;
         luckyboxReviewImage.luckyboxReviewSeqNo = params.luckyboxReviewSeqNo;
         luckyboxReviewImage.image = params.image;
         luckyboxReviewImage.array = params.array;
         luckyboxReviewImage.type = params.type;

         await this.luckyboxReviewImageModel.create(luckyboxReviewImage);
         return luckyboxReviewImage.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let luckyboxReviewImage = await this.luckyboxReviewImageModel.get(seqNo);
         if(!luckyboxReviewImage) {
              throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
         }
         return luckyboxReviewImage;
    }

    public async list(req: Request, res: Response, filter: LuckyboxReviewImageListFilter, order: IOrder[], paging: IPaging) {
         return await this.luckyboxReviewImageModel.list(filter, order, paging);
    }

    public async update(Request, res: Response, seqNo: number, params: LuckyboxReviewImageUpdateParams) {
         let luckyboxReviewImage = await this.luckyboxReviewImageModel.get(seqNo);
         if(!luckyboxReviewImage) {
              throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
         }

          if(params.seqNo !== undefined) {
               luckyboxReviewImage.seqNo = params.seqNo;
          };
          if(params.luckyboxReviewSeqNo !== undefined) {
               luckyboxReviewImage.luckyboxReviewSeqNo = params.luckyboxReviewSeqNo;
          };
          if(params.image !== undefined) {
               luckyboxReviewImage.image = params.image;
          };
          if(params.array !== undefined) {
               luckyboxReviewImage.array = params.array;
          };
          if(params.type !== undefined) {
               luckyboxReviewImage.type = params.type;
          };

         await this.luckyboxReviewImageModel.update(luckyboxReviewImage);
         return luckyboxReviewImage;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
         let luckyboxReviewImage = await this.luckyboxReviewImageModel.get(seqNo);
         if(!luckyboxReviewImage) {

              throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
         }

         await this.luckyboxReviewImageModel.delete(luckyboxReviewImage);
         return luckyboxReviewImage;
    }

}