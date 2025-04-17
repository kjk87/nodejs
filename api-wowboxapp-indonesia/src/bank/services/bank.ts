// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { BankModel } from "../models/bank";



export interface BankFilter extends ListFilter {
    code?: string;
}

@Service()
export class BankService extends CoreService {

     @Inject(()=> BankModel)
     private bankModel: BankModel;

     constructor() {
          super();
     }

     public async list(){
          return await this.bankModel.all();
     }

}