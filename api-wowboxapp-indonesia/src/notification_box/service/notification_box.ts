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
import { NotificationBoxModel } from "../models/notification_box";
import { MemberA } from "../../member/entities/member_a";
import { NotificationBox } from "../entities/notification_box";

export interface NotificationBoxFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     isRead?: boolean;
 }

@Service()
export class NotificationBoxService extends CoreService {

     @Inject(()=> NotificationBoxModel)
     private notificationBoxModel: NotificationBoxModel;

     constructor() {
          super();
     }

     public async list(order:IOrder[], paging: IPaging, member:MemberA){
          let filter :NotificationBoxFilter =  {};
          filter.userKey = member.userKey
     
          if(!order){
               order = [
                    {
                         column: 'seqNo',
                         dir: 'DESC'
                    }
               ]
          }

          return await this.notificationBoxModel.list(filter, order, paging);
     }

     public async getUnReadCount(member:MemberA){
          let filter :NotificationBoxFilter =  {};
          filter.userKey = member.userKey;
          filter.isRead = false;
          return await this.notificationBoxModel.getCount(filter);
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async read(req: Request, res: Response, seqNo: number, member:MemberA, manager?: EntityManager) {

          let filter:NotificationBoxFilter = {};
          filter.userKey = member.userKey;
          filter.seqNo = seqNo;

          let notificationBox:NotificationBox = await this.notificationBoxModel.getByFilter(filter);

          if(notificationBox){
               notificationBox.isRead = true;
               await this.notificationBoxModel.update(notificationBox, NotificationBox, manager);
          }
          
          return true;
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async delete(req: Request, res: Response, seqNo: number, member:MemberA, manager?: EntityManager) {

          let filter:NotificationBoxFilter = {};
          filter.userKey = member.userKey;
          filter.seqNo = seqNo;

          let notificationBox:NotificationBox = await this.notificationBoxModel.getByFilter(filter);

          if(notificationBox){
               notificationBox.isRead = true;
               await this.notificationBoxModel.delete(notificationBox, manager);
          }
          
          return true;
     }
}