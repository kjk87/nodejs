// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { PointMallCategoryModel } from "../models/point_mall_category";
import { _axios } from "../../common/services/axios";
import { MemberA } from "../../member/entities/member_a";

export interface PointMallCategoryFilter extends ListFilter {
     seqNo?: number;
     status?: string;
 }

@Service()
export class PointMallCategoryService extends CoreService {

     @Inject(()=> PointMallCategoryModel)
     private pointMallCategoryModel: PointMallCategoryModel;

     constructor() {
          super();
     }

     //리스트 & 조인
     public async list() {

          let filter : PointMallCategoryFilter = {};
          filter.status = 'active';

          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.pointMallCategoryModel.all(filter, order);
     }
}