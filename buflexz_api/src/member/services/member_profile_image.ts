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
import { MemberProfileImageModel } from "../models/member_profile_image";

export interface MemberProfileImageFilter extends ListFilter {
     seqNo?: number;
     status?: string;
}

@Service()
export class MemberProfileImageService extends CoreService {

     @Inject(()=> MemberProfileImageModel)
     private memberProfileImageModel: MemberProfileImageModel;


     constructor() {
          super();
     }

     public async list() {
          let filter:MemberProfileImageFilter = {};
          filter.status = 'active';
          let order : IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.memberProfileImageModel.all(filter, order);
     }
}