import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TestService } from "../services/test";

@JsonController('/test')
export class TestController extends CoreController {

    @Inject(()=> TestService)
    private testService: TestService;


    constructor() {
        super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: any) {
        return await this.testService.test(req, res, params);
    }


}