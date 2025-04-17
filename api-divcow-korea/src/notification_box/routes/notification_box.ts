import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { NotificationBoxService } from "../service/notification_box";


@JsonController('/notificationBox')
export class NotificationBoxController extends CoreController {

    @Inject(()=> NotificationBoxService)
    private notificationBoxService: NotificationBoxService;

    constructor() {
        super();
    }

    @Authorized()
    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('order') order:IOrder[], @QueryParam('paging') paging: IPaging, @CurrentUser() member: MemberA) {
        return returnForm(await this.notificationBoxService.list(order, paging, member));
    }

    @Authorized()
    @Get('/getUnReadCount')
    public async getUnReadCount(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return returnForm(await this.notificationBoxService.getUnReadCount(member));
    }

    @Authorized()
    @Post('/read')
    public async read(@Req() req: Request, @Res() res: Response, @BodyParam('seqNo') seqNo:number, @CurrentUser() member: MemberA) {
        return returnForm(await this.notificationBoxService.read(req, res, seqNo, member));
    }

    @Authorized()
    @Post('/delete')
    public async delete(@Req() req: Request, @Res() res: Response, @BodyParam('seqNo') seqNo:number, @CurrentUser() member: MemberA) {
        return returnForm(await this.notificationBoxService.delete(req, res, seqNo, member));
    }
}