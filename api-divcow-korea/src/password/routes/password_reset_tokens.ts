import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { PasswordResetTokensService, PasswordResetTokensCreateParams, PasswordResetTokensUpdateParams, PasswordResetTokensListFilter } from "../services/password_reset_tokens";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/passwordResetTokens')
export class PasswordResetTokensController extends CoreController {

    @Inject(()=> PasswordResetTokensService)
    private passwordResetTokensService: PasswordResetTokensService;

    constructor() {
        super();
    }

//     @Post()
//     public async create(@Req() req: Request, @Res() res: Response, @Body() params: PasswordResetTokensCreateParams) {
//         return await this.passwordResetTokensService.create(req, res, params);
//     }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.passwordResetTokensService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: PasswordResetTokensListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.passwordResetTokensService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: PasswordResetTokensUpdateParams) {
//         return await this.passwordResetTokensService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.passwordResetTokensService.delete(req, res, seqNo);
//     }

}