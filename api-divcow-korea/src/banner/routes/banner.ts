import { CurrentUser, Get, JsonController, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response} from 'express';
import { returnForm } from "../../common/services/util";
import { Inject } from "typedi";
import { BannerListFilter, BannerService } from "../services/banner";
import { IPaging } from "../../common/core/CoreModel";
import { FrontBanner } from "../entities/banner";


@JsonController('/banner')
export class BannerController extends CoreController {

    @Inject(()=> BannerService)
    private bannerService: BannerService;


    @Get()
    public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: BannerListFilter) {
        return returnForm(await this.bannerService.list(req, res, filter));
    }
}