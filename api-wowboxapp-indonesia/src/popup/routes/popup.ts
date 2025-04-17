import { CurrentUser, Get, JsonController, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response} from 'express';
import { returnForm } from "../../common/services/util";
import { Inject } from "typedi";
import { IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { PopupListFilter, PopupService } from "../services/popup";


@JsonController('/popup')
export class PopupController extends CoreController {

    @Inject(()=> PopupService)
    private popupService: PopupService;


    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: PopupListFilter) {
        return returnForm(await this.popupService.list(req, res, filter));
    }
}