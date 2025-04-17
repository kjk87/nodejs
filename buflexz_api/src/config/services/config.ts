// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { ConfigModel } from "../models/config";


export interface ConfigFilter extends ListFilter {
    code?: string;
}

@Service()
export class ConfigService extends CoreService {

     @Inject(()=> ConfigModel)
     private configModel: ConfigModel;

     constructor() {
          super();
     }

     public async get(code:string) {
          let filter : ConfigFilter = {};
          filter.code = code;

          return await this.configModel.getByFilter(filter);
     }
}