import { BodyParam, Get, JsonController, Post, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { EventGiftService } from "../services/event_gift";
import { returnForm } from "../../common/services/util";

@JsonController('/eventGift')
export class EventGiftController extends CoreController {

    @Inject(()=> EventGiftService)
    private eventGiftService: EventGiftService;

    @Post('/all')
    public async all(@Req() req: Request, @Res() res: Response, @BodyParam('eventSeqNo') eventSeqNo) {
        return returnForm(await this.eventGiftService.all(req, res, eventSeqNo))
    }

    // @Get('/lottoPlaybol')
    // public async getLottoPlaybolGift(@Req() req: Request, @Res() res: Response, @QueryParams() filter) {
    //     return returnForm(await this.eventGiftService.getLottoPlaybolGift(req, res, filter))   
    // }
}