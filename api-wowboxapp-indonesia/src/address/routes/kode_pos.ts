import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { KabkotaService } from "../services/kabkota";
import { KodePosService } from "../services/kode_pos";


@JsonController('/kodePos')
export class KabkotaController extends CoreController {

    @Inject(()=> KodePosService)
    private kodePosService: KodePosService;

    constructor() {
        super();
    }


    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('parentId') parentId: number) {
        return returnForm(await this.kodePosService.list(parentId));
    }

}