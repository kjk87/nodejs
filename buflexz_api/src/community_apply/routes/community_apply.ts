import { Authorized, Body, CurrentUser, Get, JsonController, Post, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response} from 'express';
import { returnForm } from "../../common/services/util";
import { Inject } from "typedi";
import { IPaging } from "../../common/core/CoreModel";
import { MemberA } from "../../member/entities/member_a";
import { CommunityApplyService } from "../services/community_apply";
import { CommunityApply } from "../entities/coummunity_apply";


@JsonController('/communityApply')
export class BannerController extends CoreController {

    @Inject(()=> CommunityApplyService)
    private communityApplyService: CommunityApplyService;


    @Authorized()
    @Get()
    public async get(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.communityApplyService.get(member));
    }

    @Authorized()
    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: CommunityApply, @CurrentUser() member:MemberA) {
        return returnForm(await this.communityApplyService.create(req, res, params, member));
    }
}