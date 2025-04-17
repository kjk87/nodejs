import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response} from 'express';
import { now } from "../../common/services/util";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { PopupModel } from "../models/popup";


export class PopupListFilter extends ListFilter {
    

    ios?: boolean;
    aos?: boolean;
    display?: boolean;
    nation?: string;
    startDatetime?: string;
    endDatetime?: string;
}

@Service()
export class PopupService extends CoreService {

    @Inject(()=> PopupModel)
    private popupModel: PopupModel;

    public async list(req: Request, res: Response, filter: PopupListFilter) {

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

        return await this.popupModel.all(filter, order);
    }
}