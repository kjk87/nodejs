import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { PersonalAccessTokensService, PersonalAccessTokensCreateParams, PersonalAccessTokensUpdateParams, PersonalAccessTokensListFilter } from "../services/personal_access_tokens";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/personalAccessTokens')
export class PersonalAccessTokensController extends CoreController {

    @Inject(()=> PersonalAccessTokensService)
    private personalAccessTokensService: PersonalAccessTokensService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: PersonalAccessTokensCreateParams) {
//         return await this.personalAccessTokensService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.personalAccessTokensService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: PersonalAccessTokensListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.personalAccessTokensService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: PersonalAccessTokensUpdateParams) {
//         return await this.personalAccessTokensService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.personalAccessTokensService.delete(req, res, seqNo);
//     }

}