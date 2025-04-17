// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { GiftCardBrandModel } from "../models/gift_card_brand";


export interface GiftCardBrandFilter extends ListFilter {
    seqNo?: number;
    title?: string;
    status?: string;
    array?: string;
}

@Service()
export class GiftCardBrandService extends CoreService {

     @Inject(()=> GiftCardBrandModel)
     private giftCardBrandModel: GiftCardBrandModel;

     constructor() {
          super();
     }

     public async list() {
          let filter : GiftCardBrandFilter = {};
          filter.status = 'active';
          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.giftCardBrandModel.all(filter, order);

     }
}