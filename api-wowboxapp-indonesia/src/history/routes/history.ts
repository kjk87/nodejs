import { HistoryBallFilter, HistoryBenefitFilter, HistoryCashFilter } from './../services/history';
import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { HistoryCommissionFilter, HistoryPointFilter, HistoryService } from "../services/history";
import { MemberA } from "../../member/entities/member_a";


@JsonController('/history')
export class HistoryController extends CoreController {

    @Inject(()=> HistoryService)
    private historyService: HistoryService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/getCommission')
    public async getCommissionThisMonth(@Req() req: Request, @Res() res: Response, @QueryParams() filter : HistoryCommissionFilter, @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.getCommission(filter, member));
    }

    @Authorized()
    @Get('/commission/list')
    public async historyCommissionList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryCommissionFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyCommissionList(filter, paging, order, member));
    }

    @Authorized()
    @Get('/point/list')
    public async historyPointList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryPointFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyPointList(filter, paging, order, member));
    }
    
    @Authorized()
    @Get('/cash/list')
    public async historyCashList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryCashFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyCashList(filter, paging, order, member));
    }

    @Authorized()
    @Get('/ball/list')
    public async historyBallList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryBallFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyBallList(filter, paging, order, member));
    }
    
    @Authorized()
    @Get('/benefit/list')
    public async historyBenefitList(@Req() req: Request, @Res() res: Response, @QueryParams() filter: HistoryBenefitFilter, @QueryParam('paging') paging: IPaging, @QueryParam('order') order: IOrder[], @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.historyBenefitList(filter, paging, order, member));
    }

    @Authorized()
    @Get('/getTotalBenefit')
    public async getTotalBenefit(@Req() req: Request, @Res() res: Response, @QueryParams() filter : HistoryBenefitFilter, @CurrentUser() member:MemberA) {
        return returnForm(await this.historyService.getTotalBenefit(filter, member));
    }

}