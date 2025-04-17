import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { BuffCoinHistoryModel } from "../models/buff_coin_history";
import { IsNotEmpty } from "../../common/services/decorators";
import { BuffCoinHistory } from "../entities/buff_coin_history";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { BuffInviteMiningModel } from "../models/buff_invite_mining";
import { BuffInviteMining } from "../entities/buff_invite_mining";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { MemberA } from "../../member/entities/member_a";

export interface BuffInviteMiningFilter extends ListFilter {
    seqNo?: number;
    userKey?: string;
}
@Service()
export class BuffInviteMiningService extends CoreService {

     @Inject(()=> BuffInviteMiningModel)
     private buffInviteMiningModel: BuffInviteMiningModel;


     constructor() {
          super();
     }

     public async create(req: Request, res: Response, userKey: string, coin:number, manager?: EntityManager) {
          
          let buffInviteMining = new BuffInviteMining();

          buffInviteMining.userKey = userKey;
          buffInviteMining.coin = coin;
          buffInviteMining.regDatetime = now();

          return await this.buffInviteMiningModel.create(buffInviteMining, BuffInviteMining, manager);
         
     }

     public async list(req: Request, res: Response, paging: IPaging, member:MemberA) {
          
          let filter:BuffInviteMiningFilter = {}
          filter.userKey = member.userKey;

          let order: IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          return await this.buffInviteMiningModel.list(filter, order, paging);
     }

     public async getSumCoin(req: Request, res: Response, member:MemberA) {

          return await this.buffInviteMiningModel.getSumCoin(member.userKey);
     }

     public async getCount(req: Request, res: Response, member:MemberA) {

          let filter:BuffInviteMiningFilter = {}
          filter.userKey = member.userKey;

          return await this.buffInviteMiningModel.getCount(filter);
     }

}