import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { HistoryPointFilter, HistoryService, HistoryTetherFilter } from "../services/history";
import { MemberA } from "../../member/entities/member_a";


@JsonController('/history')
export class HistoryController extends CoreController {

    @Inject(()=> HistoryService)
    private historyService: HistoryService;

    constructor() {
        super();
    }


    @Authorized()
    @Get('/point/list')
    public async historyPointList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryPointFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyPointList(filter, paging, order, member));
    }
    
    @Authorized()
    @Get('/tether/list')
    public async historyTetherList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryTetherFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyTetherList(filter, paging, order, member));
    }

    @Authorized()
    @Get('/lottery/list')
    public async historyLotteryList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryPointFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyLotteryList(filter, paging, order, member));
    }
}