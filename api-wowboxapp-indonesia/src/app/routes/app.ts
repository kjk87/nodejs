import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { AppFilter, AppService } from "../services/app";


@JsonController('/app')
export class AppController extends CoreController {

    @Inject(()=> AppService)
    private appService: AppService;

    constructor() {
        super();
    }

    @Get()
    public async getApp(@Req() req: Request, @Res() res: Response, @QueryParams() filter: AppFilter) {
        return returnForm(await this.appService.getApp(filter));
    }
}