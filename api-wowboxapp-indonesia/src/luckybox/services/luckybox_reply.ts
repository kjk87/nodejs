import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxReplyModel } from "../models/luckybox_reply";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { LuckyboxReply, LuckyboxReplyJoin } from "../entities/luckybox_reply";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { now } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { EntityManager } from "typeorm";

export class LuckyboxReplyCreateParams {
    public seqNo?: number;
    public userKey?: string;
    public luckyboxPurchaseItemSeqNo?: number;
    public luckyboxReviewSeqNo?: number;
    
    @IsNotEmpty()
    public reply?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public status?: number;
}
export class LuckyboxReplyUpdateParams {
    public seqNo?: number;
    public userKey?: string;
    public luckyboxPurchaseItemSeqNo?: number;
    public luckyboxReviewSeqNo?: number;
    public reply?: string;
    public regDatetime?: string;
    public modDatetime?: string;
    public status?: number;
}
export class LuckyboxReplyListFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
    
    @IsNotEmpty()
    luckyboxPurchaseItemSeqNo?: number;
    
    luckyboxReviewSeqNo?: number;
    reply?: string;
    regDatetime?: string;
    modDatetime?: string;
    status?: number;
}
@Service()
export class LuckyboxReplyService extends CoreService {

    @Inject(()=> LuckyboxReplyModel)
    private luckyboxReplyModel: LuckyboxReplyModel;

    constructor() {
         super();
    }

    @Transaction()
    public async create(req: Request, res: Response, params: LuckyboxReplyCreateParams, member: MemberA, manager?: EntityManager) {
         
     let luckyboxReply = new LuckyboxReply();

         luckyboxReply.userKey = member.userKey;
         luckyboxReply.luckyboxPurchaseItemSeqNo = params.luckyboxPurchaseItemSeqNo;
         luckyboxReply.luckyboxReviewSeqNo = params.luckyboxReviewSeqNo;
         luckyboxReply.reply = params.reply;
         luckyboxReply.regDatetime = now();
         luckyboxReply.modDatetime = now();
         luckyboxReply.status = 1;

         await this.luckyboxReplyModel.create(luckyboxReply, undefined, manager);
         return luckyboxReply.toObject();
    }

    public async get(req: Request, res: Response, seqNo: number) {
         let luckyboxReply = await this.luckyboxReplyModel.get(seqNo);
         if(!luckyboxReply) {
              throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
         }
         return luckyboxReply;
    }

     public async list(req: Request, res: Response, filter: LuckyboxReplyListFilter, order: IOrder[], paging: IPaging) {
          
          filter.status = 1;
          filter.joinColumn = [
               {
                    joinTable: 'memberTotal'
               }
          ]

          let list = await this.luckyboxReplyModel.list(filter, order, paging, LuckyboxReplyJoin);

          
          return list;
     }

     @Transaction()
     public async update(req: Request, res: Response, seqNo: number, params: LuckyboxReplyUpdateParams, member: MemberA, manager?: EntityManager) {
          let luckyboxReply = await this.luckyboxReplyModel.get(seqNo);
          if(!luckyboxReply) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
         
          if(luckyboxReply.userKey != member.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION, 'not permission');
          }

          if(params.reply !== undefined) {
               luckyboxReply.reply = params.reply;
               luckyboxReply.modDatetime = now();
          };

         await this.luckyboxReplyModel.update(luckyboxReply, undefined, manager);
         return luckyboxReply;
     }

     public async delete(req: Request, res: Response, seqNo: number, member: MemberA) {
          let luckyboxReply = await this.luckyboxReplyModel.get(seqNo);
          if(!luckyboxReply) {
               throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
          }
     
          if(luckyboxReply.userKey != member.userKey) {
               throw new CoreError(ErrorType.E_NOTPERMISSION, 'not permission');
          }

         await this.luckyboxReplyModel.delete(luckyboxReply);
         return luckyboxReply;
     }

}