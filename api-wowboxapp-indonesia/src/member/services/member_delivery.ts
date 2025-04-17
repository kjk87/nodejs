import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { MemberDelivery } from "../entities/member_delivery";
import { MemberDeliveryModel } from "../models/member_delivery";
import { MemberA } from "../entities/member_a";
import { Transaction } from "../../common/services/decorators";
import { EntityManager } from "typeorm";

export interface MemberDeliveryFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
}

@Service()
export class MemberDeliveryService extends CoreService {

     @Inject(()=> MemberDeliveryModel)
     private memberDeliveryModel: MemberDeliveryModel;


     constructor() {
          super();
     }

     public async get(seqNo: number) {
          let memberDelivery = await this.memberDeliveryModel.get(seqNo);
          return memberDelivery;
     }

     public async getByUserKey(member:MemberA) {
          let filter:MemberDeliveryFilter = {};
          filter.userKey = member.userKey;
          let memberDelivery = await this.memberDeliveryModel.getByFilter(filter);
          return memberDelivery;
     }

     public async save(params:MemberDelivery, manager?: EntityManager){

          return await this.memberDeliveryModel.update(params, MemberDelivery, manager);
     }
}