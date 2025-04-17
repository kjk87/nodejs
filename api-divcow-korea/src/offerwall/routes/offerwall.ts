import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { OfferWallService } from "../services/tasks";

@JsonController('/offerwall')
export class OfferWallController extends CoreController {

    @Inject(()=> OfferWallService)
    private offerWallService: OfferWallService;

    constructor() {
        super();
    }

}