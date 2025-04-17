import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response} from 'express';
import { now } from "../../common/services/util";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CommunityApplyModel } from "../models/community_apply";
import { Transaction } from "../../common/services/decorators";
import { CommunityApply } from "../entities/coummunity_apply";
import { EntityManager } from "typeorm";
import { CoreError } from "../../common/core/CoreError";
import * as ErrorType from "../../common/services/errorType";


export class CommunityApplyFilter extends ListFilter {
    

    seqNo?: number;
    userKey?: string;
    status?: string;
}

@Service()
export class CommunityApplyService extends CoreService {

    @Inject(()=> CommunityApplyModel)
    private communityApplyModel: CommunityApplyModel;

    public async get(member:MemberA) {

        let filter : CommunityApplyFilter = {}
        filter.userKey = member.userKey;

        return await this.communityApplyModel.getByFilter(filter);
    }

    //생성
    @Transaction() //트렌잭션 default REPEATABLE READ
    public async create(req: Request, res: Response, params: CommunityApply, member:MemberA, manager?: EntityManager) {

        if(params.seqNo){
            let filter : CommunityApplyFilter = {}
            filter.seqNo = params.seqNo;
            filter.userKey = member.userKey;
            params = await this.communityApplyModel.getByFilter(filter);

            if(!params){
                throw new CoreError(ErrorType.E_NOTFOUND);
            }
            params.status = 'redemand';
            
        }else{
            params.userKey = member.userKey;
            params.status = 'pending';
            params.regDatetime = now();
        }
        
        
        params.statusDatetime = now();
        
        return await this.communityApplyModel.update(params, CommunityApply, manager);
    }
}