import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TermsService } from "../services/terms";
import { MemberA } from "../../member/entities/member_a";
import { returnForm } from "../../common/services/util";


@JsonController('/terms')
export class TermsController extends CoreController {

    @Inject(()=> TermsService)
    private termsService: TermsService;

    constructor() {
        super();
    }

    @Get()
    public async activeList(@Req() req: Request, @Res() res: Response, @QueryParam('nation') nation: string) {
        return returnForm(await this.termsService.activeList(nation));
    }

    @Authorized()
    @Get('/notSignedList')
    public async notSignedList(@Req() req: Request, @Res() res: Response, @CurrentUser() member:MemberA) {
        return returnForm(await this.termsService.notSignedList(member));
    }

    @Get('/:seqNo(\\d+)')
    public async getTerms(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo:number) {
        return returnForm(await this.termsService.getTerms(seqNo));
    }

    @Authorized()
    @Post('/agreeAddTerms')
    public async agreeAddTerms(@Req() req: Request, @Res() res: Response, @BodyParam('termsNo') termsNo:string, @CurrentUser() member:MemberA) {
        return returnForm(await this.termsService.agreeAddTerms(termsNo, member));
    }
}