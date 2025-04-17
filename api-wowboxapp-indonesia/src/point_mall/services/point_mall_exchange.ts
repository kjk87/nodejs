import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import * as ErrorType from "../../common/services/errorType";

import { MemberService } from "../../member/services/member";
import { MemberA } from "../../member/entities/member_a";
import { EntityManager } from "typeorm";
import { CoreError } from "../../common/core/CoreError";
import { _axios } from "../../common/services/axios";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { getLang, now } from "../../common/services/util";


@Service()
export class PointMallExchangeService extends CoreService {

     @Inject(()=> MemberService)
     private memberService: MemberService;

     constructor() {
          super();
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async exchange(req: Request, res: Response, point: number, member:MemberA, manager?: EntityManager) {
          member = await this.memberService.getMember(member.userKey)
          if(point > member.point){
               throw new CoreError(ErrorType.E_LACK_COST);
          }

          let histroyPoint = new HistoryPoint();
          histroyPoint.userKey = member.userKey;
          histroyPoint.type = 'used';
          histroyPoint.category = 'wowboxmall';
          histroyPoint.point = point;
          histroyPoint.subject = getLang('id').wowmallPointExchangeSubject;
          histroyPoint.comment = getLang('id').wowmallPointExchangeComment;
          histroyPoint.regDatetime = now();
          member = await this.memberService.updatePoint(histroyPoint, member, manager);

          let params = [{
               user_id: member.platformKey,
               title: getLang('id').wowboxPointExchangeSubject,
               mileage : point
          }];

          console.log('params : ',params);
   
          let url = 'https://wowboxmall.com/member_point.php';
          let resp = await _axios('post', url, params);
          console.log(resp)
          // let result = resp.result;
          
          return true;
     }
}