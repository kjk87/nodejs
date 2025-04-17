import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { DeviceFilter, DeviceService, DeviceUpdateParams } from "../services/device";
import { Device } from "../entities/device";
import { returnForm } from "../../common/services/util";


@JsonController('/device')
export class DeviceController extends CoreController {

    @Inject(()=> DeviceService)
    private deviceService: DeviceService;

    constructor() {
        super();
    }

    @Post()
    public async create(@Req() req: Request, @Res() res: Response, @Body() params: Device) {
        return returnForm(await this.deviceService.create(req, res, params));
    }

    @Get()
    public async getDevice(@Req() req: Request, @Res() res: Response, @QueryParams() filter: DeviceFilter) {
        return returnForm(await this.deviceService.getDevice(filter));
    }

    @Post('/push')
    public async updateDevice(@Req() req: Request, @Res() res: Response, @Body() params: DeviceUpdateParams) {
        return returnForm(await this.deviceService.updateDevice(req, res, params));
    }

}