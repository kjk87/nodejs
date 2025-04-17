import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LuckyboxProductGroupModel } from "../models/luckybox_product_group";
import { LuckyboxProductGroup } from "../entities/luckybox_product_group";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LuckyboxProductGroupCreateParams {
    public seqNo?: number;
    public title?: string;
    public turnNo?: number;
    public priority?: number;
    public status?: string;
    public regDatetime?: string;
    public modDatetime?: string;
}
export class LuckyboxProductGroupUpdateParams {
    public seqNo?: number;
    public title?: string;
    public turnNo?: number;
    public priority?: number;
    public status?: string;
    public regDatetime?: string;
    public modDatetime?: string;
}
export interface LuckyboxProductGroupListFilter extends ListFilter {
    seqNo?: number;
    title?: string;
    turnNo?: number;
    priority?: number;
    status?: string;
    regDatetime?: string;
    modDatetime?: string;
}
@Service()
export class LuckyboxProductGroupService extends CoreService {

     @Inject(()=> LuckyboxProductGroupModel)
     private luckyboxProductGroupModel: LuckyboxProductGroupModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: LuckyboxProductGroupCreateParams) {
          let luckyboxProductGroup = new LuckyboxProductGroup();

          luckyboxProductGroup.seqNo = params.seqNo;
          luckyboxProductGroup.title = params.title;
          luckyboxProductGroup.turnNo = params.turnNo;
          luckyboxProductGroup.priority = params.priority;
          luckyboxProductGroup.status = params.status;
          luckyboxProductGroup.regDatetime = params.regDatetime;
          luckyboxProductGroup.modDatetime = params.modDatetime;

          await this.luckyboxProductGroupModel.create(luckyboxProductGroup);
          return luckyboxProductGroup.toObject();
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let luckyboxProductGroup = await this.luckyboxProductGroupModel.get(seqNo);
          if(!luckyboxProductGroup) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return luckyboxProductGroup;
     }

     public async list(req: Request, res: Response, filter: LuckyboxProductGroupListFilter, order: IOrder[], paging: IPaging) {
          return await this.luckyboxProductGroupModel.list(filter, order, paging);
     }

     public async update(Request, res: Response, seqNo: number, params: LuckyboxProductGroupUpdateParams) {
          let luckyboxProductGroup = await this.luckyboxProductGroupModel.get(seqNo);
          if(!luckyboxProductGroup) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }

               if(params.seqNo !== undefined) {
                    luckyboxProductGroup.seqNo = params.seqNo;
               };
               if(params.title !== undefined) {
                    luckyboxProductGroup.title = params.title;
               };
               if(params.turnNo !== undefined) {
                    luckyboxProductGroup.turnNo = params.turnNo;
               };
               if(params.priority !== undefined) {
                    luckyboxProductGroup.priority = params.priority;
               };
               if(params.status !== undefined) {
                    luckyboxProductGroup.status = params.status;
               };
               if(params.regDatetime !== undefined) {
                    luckyboxProductGroup.regDatetime = params.regDatetime;
               };
               if(params.modDatetime !== undefined) {
                    luckyboxProductGroup.modDatetime = params.modDatetime;
               };

          await this.luckyboxProductGroupModel.update(luckyboxProductGroup);
          return luckyboxProductGroup;
     }

     public async delete(req: Request, res: Response, seqNo: number) {
          let luckyboxProductGroup = await this.luckyboxProductGroupModel.get(seqNo);
          if(!luckyboxProductGroup) {

               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          await this.luckyboxProductGroupModel.delete(luckyboxProductGroup);
          return luckyboxProductGroup;
     }

}