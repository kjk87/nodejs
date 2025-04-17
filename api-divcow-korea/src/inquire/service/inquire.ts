// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { EntityManager } from "typeorm";
import { now } from "../../common/services/util";
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

          let order:IOrder[] = [
               {
                    column: 'seqNo',
                    dir: 'DESC'
               }
          ]

          let list = await this.inquireModel.list(filter, order, paging, InquireJoin);

          for(let inquire of list.list){
               let imageList = await this.inquireImageModel.all({inquire_seq_no: inquire.seqNo});
               inquire.imageList = imageList.list;
           }

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
                    inquireImage.image = image;
                    inquireImage.regDatetime = inquire.regDatetime;
                    await this.inquireImageModel.create(inquireImage, InquireImage, manager);
               }
          }
          

          return true;
     }
}