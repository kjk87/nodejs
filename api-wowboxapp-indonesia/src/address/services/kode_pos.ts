import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { KodePosModel } from "../models/kode_pos";

export interface KodePosFilter extends ListFilter {
    id?: number;
    parentId?: number;
}

@Service()
export class KodePosService extends CoreService {

     @Inject(()=> KodePosModel)
     private kodePosModel: KodePosModel;

     constructor() {
          super();
     }

     public async list(parentId:number){
          let filter: KodePosFilter = {};
          filter.parentId = parentId;
          return await this.kodePosModel.all(filter);
     }
}