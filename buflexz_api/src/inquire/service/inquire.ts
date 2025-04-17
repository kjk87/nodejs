// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { InquireModel } from "../models/inquire";
import { MemberA } from "../../member/entities/member_a";
import { Inquire, InquireJoin } from "../entities/inquire";
import { InquireImageModel } from "../models/inquire_image";
import { InquireImage } from "../entities/inquire_image";


export interface InquireFilter extends ListFilter {
     seqNo?: number;
     userKey?: string;
     type?: string
     status?: string;
     condition?: string;
 }

 export interface InquireImageFilter extends ListFilter {
     seqNo?: number;
     inquireSeqNo?: number;
 }

@Service()
export class InquireService extends CoreService {

     @Inject(()=> InquireModel)
     private inquireModel: InquireModel;

     @Inject(()=> InquireImageModel)
     private inquireImageModel: InquireImageModel;

     constructor() {
          super();
     }


     public async list(paging: IPaging, member:MemberA){
          let filter : InquireFilter = {};
          filter.userKey = member.userKey;
          filter.joinColumn = [
               {
                    joinTable: 'imageList',
                    join: 'left',//optional (default left)
                    defaultTable: 'entity'//optional (default entity)
               }
          ]

          let order:IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          return await this.inquireModel.list(filter, order, paging, InquireJoin);
     }

     @Transaction()
     public async inquire(req: Request, res: Response, params:Inquire, member:MemberA, manager?: EntityManager){
          let imageList = params['imageList'];

          

          let inquire = new Inquire();
          inquire.title = params.title;
          inquire.contents = params.contents
          inquire.type = params.type
          inquire.userKey = member.userKey
          inquire.nation = member.nation
          inquire.status = 'pending'
          inquire.regDatetime = now();

          await this.inquireModel.update(inquire, Inquire, manager);
          if(imageList){
               for(let image of imageList) {
                    let inquireImage = new InquireImage();
                    inquireImage.inquireSeqNo = inquire.seqNo;
                    inquireImage.image = image.image;
                    inquireImage.regDatetime = inquire.regDatetime;
                    await this.inquireImageModel.create(inquireImage, InquireImage, manager);
               }
          }
          

          return true;
     }
}