import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response} from 'express';
import { now } from "../../common/services/util";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { BenefitModel } from "../models/benefit";
import { BenefitCalculateModel } from "../models/benefit_calculate";


export class BenefitCalculateFilter extends ListFilter {
    

    userKey?: string;
    startDate?: string;
    endDate?: string;
}

@Service()
export class BenefitCalculateService extends CoreService {

    @Inject(()=> BenefitCalculateModel)
    private benefitCalculateModel: BenefitCalculateModel;

    public async list(req: Request, res: Response, paging: IPaging, filter : BenefitCalculateFilter, member:MemberA) {

        filter.userKey = member.userKey;

        let order:IOrder[] = [
            {
                 column: 'seqNo',
                 dir: 'DESC'
            }
       ];

        return await this.benefitCalculateModel.list(filter, order, paging);
    }
}