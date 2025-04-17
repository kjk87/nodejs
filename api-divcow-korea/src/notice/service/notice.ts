// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { NoticeModel } from "../models/notice";

export interface NoticeFilter extends ListFilter {
     seqNo?: number;
     nation?: string;
     aos?: boolean;
     ios?: boolean;
     status?: string;
     condition?: string;
 }

@Service()
export class NoticeService extends CoreService {

     @Inject(()=> NoticeModel)
     private noticeModel: NoticeModel;

     constructor() {
          super();
     }

     public async list(filter:NoticeFilter, order:IOrder[], paging: IPaging, ){
          filter = filter || {};
          filter.status = 'active'
          filter.condition = `(nation = 'all' or nation like '%${filter.nation}%')`;
     
          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }

          return await this.noticeModel.list(filter, order, paging);
     }

     public async get(seqNo:number){
          let filter : NoticeFilter = {};
          filter.status = 'active';
          filter.seqNo = seqNo;
          return await this.noticeModel.getByFilter(filter);
     }
}