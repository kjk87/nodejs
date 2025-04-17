import { LuckyDraw } from './../entities/lucky_draw';
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
import { getLang, getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { LuckyDrawPurchaseModel } from "../models/lucky_draw_purchase";
import { MemberA } from "../../member/entities/member_a";
import { LuckyDrawPurchase } from "../entities/lucky_draw_purchase";
import { MemberService } from "../../member/services/member";
import { LuckyDrawService } from "./lucky_draw";
import { LuckyDrawNumberModel } from "../models/lucky_draw_number";
import { LuckyDrawNumber } from "../entities/lucky_draw_number";
import { HistoryBall } from '../../history/entities/histroy_ball';
import { LANGUAGE } from '../../language';
import { LuckyDrawModel } from '../models/lucky_draw';


export interface LuckyDrawPurchaseFilter extends ListFilter {
    seqNo?: number;
    luckyDrawSeqNo?: number;
    userKey?: string;
    condition?: string;
}


@Service()
export class LuckyDrawPurchaseService extends CoreService {

    @Inject(()=> LuckyDrawPurchaseModel)
    private luckyDrawPurchaseModel: LuckyDrawPurchaseModel;

    @Inject(()=> LuckyDrawModel)
    private luckyDrawModel: LuckyDrawModel;

    @Inject(()=> LuckyDrawService)
    private luckyDrawService: LuckyDrawService;

    @Inject(()=> LuckyDrawNumberModel)
    private luckyDrawNumberModel: LuckyDrawNumberModel;

    @Inject(()=> MemberService)
    private memberService: MemberService;

    public async list(paging: IPaging, member:MemberA){

        let luckyDrawList: LuckyDraw[] = (await this.luckyDrawService.all()).list;

        let list = await this.luckyDrawPurchaseModel.getTotalMyJoinList(member, luckyDrawList, paging);

       let count = await this.luckyDrawPurchaseModel.getTotalMyJoinCount(member, luckyDrawList);

        return {list : list, total : count};
   }

    public async getJoinCount(luckyDrawSeqNo:number, member:MemberA){
        
        let filter:LuckyDrawPurchaseFilter = {};
        filter.luckyDrawSeqNo = luckyDrawSeqNo;
        filter.userKey = member.userKey;

        return await this.luckyDrawPurchaseModel.getMyJoinCount(filter);
    }

    @Transaction()
    public async purchase(req: Request, res: Response, luckyDrawPurchase:LuckyDrawPurchase, member:MemberA, manager?: EntityManager){
        let numberList:LuckyDrawNumber[] = luckyDrawPurchase.selectNumberList;

        let luckyDraw : LuckyDraw = await this.luckyDrawService.get(luckyDrawPurchase.luckyDrawSeqNo);

        if(luckyDraw.status != 'active'){
            throw new CoreError(ErrorType.E_CLOSE, 'close lucky draw');
        }
        
        if(luckyDraw.engageType == 'ball'){
            member = await this.memberService.getMember(member.userKey);
            let useBall = luckyDraw.engageBall * numberList.length
            if(useBall > member.ball){
                throw new CoreError(ErrorType.E_LACK_COST, 'ball lack');
            }

            luckyDrawPurchase.engagedPrice = useBall;
        }else if(luckyDraw.engageType == 'free'){
            luckyDrawPurchase.engagedPrice = 0;
        }

        if(luckyDraw.engageNumber > 0){
            let joinCount = await this.getJoinCount(luckyDraw.seqNo, member);
            let totalJoinCount = joinCount + numberList.length
            if(totalJoinCount > luckyDraw.engageNumber){
                throw new CoreError(ErrorType.E_ALREADY_LIMIT, 'join limit');
            }
        }

        luckyDrawPurchase.engagedCount = numberList.length;

        let seqNos = '';
        let winNumber = ':';

        for(let i = 0; i < numberList.length; ++i) {
            let luckyDrawNumber = numberList[i];
            seqNos += luckyDrawNumber.seqNo;
            if(i < numberList.length -1){
                seqNos += ','
            }
            winNumber += luckyDrawNumber.winNumber;
            winNumber += ':'
        }

        luckyDrawPurchase.userKey = member.userKey;
        luckyDrawPurchase.title = luckyDraw.title;
        luckyDrawPurchase.winNumber = winNumber;
        luckyDrawPurchase.regDatetime = now();
        luckyDrawPurchase.modDatetime = now();
        luckyDrawPurchase.status = 'active';
        luckyDrawPurchase.engageType = luckyDraw.engageType;
        luckyDrawPurchase.buyerNation = member.nation;
        luckyDrawPurchase.buyerName = member.nickname;
    
        await this.luckyDrawPurchaseModel.purchase(luckyDrawPurchase, manager);

        await this.luckyDrawNumberModel.updateUse(luckyDraw.seqNo, seqNos, manager);

        if(luckyDrawPurchase.engagedPrice > 0){
            let historyBall = new HistoryBall();
            historyBall.userKey = member.userKey;
            historyBall.type = 'used';
            historyBall.category = 'luckyDraw';
            historyBall.ball = luckyDrawPurchase.engagedPrice;
            historyBall.subject = getLang(member.language).luckyDrawUseBallSubject;
            historyBall.comment = getLang(member.language).luckyDrawUseBallComment;
            historyBall.regDatetime = now();
            await this.memberService.updateBall(historyBall, member, manager);
        }
        

        let remainCount = await this.luckyDrawNumberModel.remainCount(luckyDraw.seqNo, manager);

        if(remainCount == 0){
            luckyDraw.status = 'expire';
            luckyDraw.modDatetime = now();
            await this.luckyDrawModel.update(luckyDraw, LuckyDraw, manager);
        }
          
        
        return luckyDrawPurchase;
    }
}