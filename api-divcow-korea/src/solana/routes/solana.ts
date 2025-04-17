import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Inject } from "typedi";
import { SolanaService } from "../services/solana";
import { returnForm } from "../../common/services/util";

@JsonController('/solana')
export class SolanaController extends CoreController {

    @Inject(()=> SolanaService)
    private solanaService: SolanaService;

    constructor() {
        super();
    }

    @Post('/transaction')
    public async transaction(@Req() req: Request, @Res() res: Response, @BodyParam('fromAddress') fromAddress:string, @BodyParam('toAddress') toAddress:string, @BodyParam('amount') amount:number) {
        return returnForm(await this.solanaService.transaction(fromAddress, toAddress, amount));
    }

//     @Get('/:seqNo(\\d+)')
//     public async get(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.referralTasksService.get(req, res, seqNo);
//     }

//     @Get()
//     public async list(@Req() req: Request, @Res() res: Response, @QueryParams() filter: ReferralTasksListFilter, @QueryParam('order') order: IOrder[], @QueryParam('paging') paging: IPaging) {
//         return await this.referralTasksService.list(req, res, filter, order, paging);
//     }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: ReferralTasksUpdateParams) {
//         return await this.referralTasksService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.referralTasksService.delete(req, res, seqNo);
//     }

}