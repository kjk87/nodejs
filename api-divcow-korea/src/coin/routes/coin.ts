import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { CoinService } from "../services/coin";


@JsonController('/coin')
export class CoinController extends CoreController {

    @Inject(()=> CoinService)
    private coinService: CoinService;

    constructor() {
        super();
    }

}