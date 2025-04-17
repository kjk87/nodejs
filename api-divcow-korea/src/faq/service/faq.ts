// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { FaqCategoryModel } from "../models/faq_category";
import { FaqModel } from "../models/faq";


export interface FaqCategoryFilter extends ListFilter {
    seqNo?: number;
    status?: string;
}

export interface FaqFilter extends ListFilter {
     seqNo?: number;
     nation?: string;
     category?: number;
     aos?: boolean;
     ios?: boolean;
     status?: string;
     condition?: string;
 }

@Service()
export class FaqService extends CoreService {

     @Inject(()=> FaqCategoryModel)
     private faqCategoryModel: FaqCategoryModel;

     @Inject(()=> FaqModel)
     private faqModel: FaqModel;

     constructor() {
          super();
     }

     public async categoryList() {
          let filter : FaqCategoryFilter = {};
          filter.status = 'active';

          let order:IOrder[] = [
               {
                    column: 'array',
                    dir: 'ASC'
               }
          ]

          return await this.faqCategoryModel.list(filter, order);

     }

     public async list(filter:FaqFilter, paging: IPaging){
          filter = filter || {};
          filter.status = 'active'
          filter.condition = `(nation = 'all' or nation like '%${filter.nation}%')`;
          let order:IOrder[]
          if(filter.aos){
               order = [
                    {
                         column: 'aos_array',
                         dir: 'ASC'
                    }
               ]
          }

          if(filter.ios){
               order = [
                    {
                         column: 'aos_array',
                         dir: 'ASC'
                    }
               ]
          }

          return await this.faqModel.list(filter, order, paging);
     }

     public async get(seqNo:number){
          let filter : FaqFilter = {};
          filter.status = 'active';
          filter.seqNo = seqNo;
          return await this.faqModel.getByFilter(filter);
     }
}