import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { ReplyReportService, ReportParams } from "../service/reply_report";
import { CheckApiKey } from "../../common/services/decorators";


@JsonController('/replyReport')
export class LuckyDrawWinController extends CoreController {

    @Inject(()=> ReplyReportService)
    private replyReportService: ReplyReportService;

    constructor() {
        super();
    }

    @Authorized()
    @CheckApiKey()
    @Post()
    public async reply(@Req() req: Request, @Res() res: Response, @Body() params : ReportParams, @CurrentUser() member : MemberA) {
        return returnForm(await this.replyReportService.report(req, res, params, member));
    }


}