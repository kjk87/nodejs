import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response} from 'express';
import { BannerModel } from "../models/banner";
import { now } from "../../common/services/util";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";


export class BannerListFilter extends ListFilter {
    

    ios?: boolean;
    aos?: boolean;
    display?: boolean;
    type?: string;
    nation?: string;
    startDatetime?: string;
    endDatetime?: string;
    condition?: string;
}

@Service()
export class BannerService extends CoreService {

    @Inject(()=> BannerModel)
    private bannerModel: BannerModel;

    public async list(req: Request, res: Response, filter: BannerListFilter) {

        filter.display = true;
        filter.startDatetime = now(),
        filter.endDatetime = now()

        let orderColumn = '';
        if(Number(filter.aos)) {
            orderColumn = 'androidArray';
        } else if(Number(filter.ios)) {
            orderColumn = 'iosArray';
        }
        
        let order: IOrder[] = [{
            column: orderColumn,
            dir: "ASC"
        }]

        return await this.bannerModel.all(filter, order);
    }
}