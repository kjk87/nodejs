import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { ProductImageService } from "../services/product_image";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";

@JsonController('/productImage')
export class ProductImageController extends CoreController {

    constructor() {
        super();
    }



}