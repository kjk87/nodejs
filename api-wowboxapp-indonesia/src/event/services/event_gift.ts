import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Req, Res } from "routing-controllers";
import { EventGiftModel } from "../models/event_gift";
import { EventGiftJoin } from "../entities/event_gift";

@Service()
export class EventGiftService extends CoreService {

    @Inject(()=> EventGiftModel)
    private eventGiftModel: EventGiftModel;


    public async all(@Req() req: Request, @Res() res: Response, eventSeqNo: number) {
        return await this.eventGiftModel.all({event_seq_no: eventSeqNo}, [{column: 'price', dir: 'DESC'}, {column: 'seq_no', dir: 'ASC'}], EventGiftJoin);
    }

    public async getLottoPlaybolGift(req, res, filter) {
        let list = await this.eventGiftModel.getLottoPlaybolGift([filter.lottoTimes]);
        return list;
    }
}