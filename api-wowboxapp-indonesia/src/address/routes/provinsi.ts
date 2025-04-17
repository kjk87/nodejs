import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { Status } from "../../common/services/type";
import { returnForm } from "../../common/services/util";
import { MemberA } from "../../member/entities/member_a";
import { ProvinsiService } from "../services/provinsi";


@JsonController('/provinsi')
export class ProvinsiController extends CoreController {

    @Inject(()=> ProvinsiService)
    private provinsiService: ProvinsiService;

    constructor() {
        super();
    }

    @Get('/list')
    public async list(@Req() req: Request, @Res() res: Response) {
        return returnForm(await this.provinsiService.list());
    }
}