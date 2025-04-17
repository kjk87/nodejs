import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response} from 'express';
import { now } from "../../common/services/util";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { BenefitModel } from "../models/benefit";


export class BenefitFilter extends ListFilter {
    

    userKey?: string;
    status?: string;
}

@Service()
export class BenefitService extends CoreService {

    @Inject(()=> BenefitModel)
    private benefitModel: BenefitModel;

    public async get(req: Request, res: Response, member:MemberA) {

        let filter : BenefitFilter = {}
        filter.userKey = member.userKey;
        filter.status = 'active';

        return await this.benefitModel.getByFilter(filter);
    }
}