import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { KecamatanService } from "../services/kecamatan";


@JsonController('/kecamatan')
export class KecamatanController extends CoreController {

    @Inject(()=> KecamatanService)
    private kecamatanService: KecamatanService;

    constructor() {
        super();
    }

    @Post('/insert')
    public async insert(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.kecamatanService.insert(req, res));
    }

    @Post('/update')
    public async update(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.kecamatanService.update(req, res));
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('parentId') parentId: number) {
        return returnForm(await this.kecamatanService.list(parentId));
    }
}