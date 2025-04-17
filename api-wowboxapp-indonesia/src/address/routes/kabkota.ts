import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { KabkotaService } from "../services/kabkota";


@JsonController('/kabkota')
export class KabkotaController extends CoreController {

    @Inject(()=> KabkotaService)
    private kabkotaService: KabkotaService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response, @QueryParam('parentId') parentId: number) {
        return returnForm(await this.kabkotaService.list(parentId));
    }

}