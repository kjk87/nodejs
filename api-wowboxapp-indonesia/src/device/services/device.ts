// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { DeviceModel } from "../models/device";
import { Device } from "../entities/device";


export interface DeviceFilter extends ListFilter {
    seqNo?: string;
    deviceId?: string;
    pushId?: string;
}

@Service()
export class DeviceService extends CoreService {

     @Inject(()=> DeviceModel)
     private deviceModel: DeviceModel;


     constructor() {
          super();
     }

     //생성
     @Transaction() //트렌잭션 default REPEATABLE READ
     public async create(req: Request, res: Response, params: Device, manager?: EntityManager) {

          let filter:DeviceFilter = {};
          filter.deviceId = params.deviceId;
          let device:Device = await this.deviceModel.getByFilter(filter, undefined, undefined, manager);
          if(!device){
               device = new Device();
               device.deviceId = params.deviceId;
               device.regDatetime = now();
          }
          device.pushId = params.pushId;
          device.pushActivate = params.pushActivate;

          return await this.deviceModel.update(device, Device, manager);

     }

     public async getDevice(filter:DeviceFilter){
          return await this.deviceModel.getByFilter(filter);
     }


}