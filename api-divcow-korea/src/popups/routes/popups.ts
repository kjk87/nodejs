import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { PopupsService, PopupsCreateParams, PopupsUpdateParams, PopupsListFilter } from "../services/popups";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/popups')
export class PopupsController extends CoreController {

    @Inject(()=> PopupsService)
    private popupsService: PopupsService;

    constructor() {
        super();
    }

    @Get()
    public async get(@Req() req: Request, @Res() res: Response) {
        return await this.popupsService.get(req, res);
    }

}