import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { EventModel } from "../models/event";
import { Event, EventJoin, EventJoinToEventWin } from "../entities/event";
import { IOrder, IPaging } from "../../common/core/CoreModel";
import { addNow, arrayObjectToValue, arrayToMapArray, filter, getLang, isNonEmptyArray, lots, now, safeArray, safeNumber, shuffle } from "../../common/services/util";
import { EventJoinModel } from "../models/event_join";
import { EventJoin as EventJoinEntity } from "../entities/event_join";
import { EventWin, EventWinJoin, EventWinJoinSeqNo, EventWinJoinWinnerList, EventWinJoinWrite } from "../entities/event_win";
import { EventWinModel } from "../models/event_win";
import { CoreError } from "../../common/core/CoreError";
import * as ErrorType from "../../common/services/errorType";
import moment = require("moment");
import { ActiveStatus, LotteryJoinType, YN } from "../../common/services/type";
import { EventGiftModel } from "../models/event_gift";
import { EventGift, EventGiftJoin } from "../entities/event_gift";
import { EventTimeModel } from "../models/event_time";
import { EventTime } from "../entities/event_time";
import { CoreListResponse } from "../../common/core/CoreListResponse";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { getValidatePhoneNumber } from "../../common/services/validation";
import { LotteryJoinCreateParams, LotteryJoinService } from "../../lottery/services/lottery_join";
import { LotteryService } from "../../lottery/services/lottery";
import { Lottery } from "../../lottery/entities/lottery";
import { MemberA } from "../../member/entities/member_a";
import { EntityManager } from "typeorm";
import { MemberService } from "../../member/services/member";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { HistoryBall } from "../../history/entities/histroy_ball";


export interface EventListFilter {
    platform: string;
    appType: string;
    groupSeqNo: number;
    isToday: string;
    primaryType: any;
    addr?: string[];
    winAnnounceType?: string;
    virtualNumber?: string;
    member_seq_no?: number;
    seqNo?: number[];
}

export interface FTLinkPayRequest {
    shopcode?;
    loginId?;
    appversion?;
    servicecode?;
    autokey?;
    order_req_amt?; //결제요청금액
    order_goodsname?; //주문상품명
    order_name?; //주문자명
    order_hp?; //주문자 휴대폰
    order_email?;
    req_installment?; //할부개월수
    req_cardcode?; //카드사 코드
    comp_orderno?; //업체주문번호(자체관리변호)
    comp_memno?; //업체회원번호(자체회원번호)
    comp_temp1?; // 상품정보 담을예정
    comp_temp2?; // admin return 서버정보
    comp_temp3?; // 우리가 받을 플랫폼 수수료
    comp_temp4?;
    comp_temp5?;
    serverType?;
    roomId?;
    reqdephold?;
    manual_used?;
    manual_amt?;
    ISTEST?;
    duptest?;
}

export class WriteImpressionParams {

    @IsNotEmpty()
    public seqNo: number;

    @IsNotEmpty()
    public impression: string;
}

@Service()
export class EventService extends CoreService {

    @Inject(()=> EventModel)
    private eventModel: EventModel;

    @Inject(()=> EventJoinModel)
    private eventJoinModel: EventJoinModel;

    @Inject(()=> EventWinModel)
    private eventWinModel: EventWinModel;

    @Inject(()=> EventGiftModel)
    private eventGiftModel: EventGiftModel;

    @Inject(()=> EventTimeModel)
    private eventTimeModel: EventTimeModel;

    @Inject(()=> MemberService)
    private memberService: MemberService;


    public async list(req: Request, res: Response, filter: EventListFilter, paging: IPaging, member: MemberA) {

        let _filter = {
            platform: filter.platform,
            app_type: filter.appType,
            group_seq_no: filter.groupSeqNo,
            is_today: filter.isToday,
            primary_type: safeArray(filter.primaryType),
            addr: null,
            win_announce_type: filter.winAnnounceType,
            user_key: member ? member.userKey : null,
            seq_no: filter.seqNo,
            status_not: ['inactive', 'cancel', 'finish'],
            display_start_datetime: now(),
            display_end_datetime: now(),
            gender: member ? member.gender ? "'" + member.gender + "'" : null : null,
            birthday: member ? member.birthday ? "'" + member.birthday + "'" : null : null,
            joinEvent: true
        }

        var order: IOrder[];

        if(filter.primaryType == 'goodluck'){
            order = undefined;
        }else{
            order = [
                {
                    column: 'priority',
                    dir: "DESC"
                },
                {
                    column: 'seqNo',
                    dir: "DESC"
                }
                
            ]
        };

        if(!isNonEmptyArray(_filter.primary_type)) {
            _filter.primary_type = [];
            _filter.primary_type.push('insert');
            _filter.primary_type.push('join');
            _filter.primary_type.push('move');
            _filter.primary_type.push('biz');
        }

        if(!_filter.platform) {
            _filter.platform = 'aos';
        }

        if(member && member.device) {
            _filter.platform = member.joinPlatform
        }
        
        let list = await this.eventModel.list(_filter, order, paging, EventJoin);

        let seqNos = [];
        for(let event of list.list){
            seqNos.push(event.seqNo);
        }

        if(isNonEmptyArray(seqNos)) {
            let eventTimeAll = await this.eventTimeModel.all({eventSeqNo: seqNos});

            let eventTimeAllMap = arrayToMapArray(eventTimeAll.list, 'eventSeqNo');

            for(let event of list.list) {
                event.eventTime = eventTimeAllMap[event.seqNo];
                if(!event.eventTime){
                    event.eventTime = [];
                }
            }
        }

        

        return list;

    }

    public async get(req: Request, res: Response, seqNo: number, member: MemberA) {
        
        let filter = {
            seq_no: seqNo,
            user_key: member ? member.userKey : null,
            addSelect: true,
            joinColumn : [
                {
                    joinTable: 'eventTime'
                },
                {
                    joinTable: 'eventGift'
                }
            ]
        }

        let order: IOrder[] = [
            {
                column: 'price',
                dir: 'DESC',
                table: 'eventGift'
            }
        ]

        let event: EventJoin = await this.eventModel.getByFilter(filter, order, EventJoin);
        if(!event) {
            throw new CoreError(ErrorType.E_NOTFOUND)
        }

        if(event.endDatetime < now()) {
            delete event.winCode;
        }

        return event;
    }

    public async getWinList(req: Request, res: Response, filter: any, paging: IPaging, member: MemberA) {

        let _filter: any = {}
        
        if(filter.eventSeqNo) {
            _filter.event_seq_no = filter.eventSeqNo;
            _filter.user_key = member ? member.userKey : null;
            _filter.open_status = 1
        } else {
            _filter._win_announce_type = 'immediately';
            _filter._status = 'announce';
            _filter.open_status = 1;
            _filter.primary_type = filter.primary_type || null,
            _filter.user_key = member ? member.userKey : null;
        }

        let list;
        if(!_filter.event_seq_no) {
            list = await this.eventModel.list(_filter, [{column: 'price', dir: 'DESC', table: 'eventGift'}, {column: 'seqNo', dir: 'DESC', table: 'eventWin'} ], paging, EventJoinToEventWin);
        } else{
            list = await this.eventWinModel.list(_filter, [{column: 'price', dir: 'DESC', table: 'eventGift'}, {column: 'seqNo', dir: 'DESC', table: 'entity'} ], paging, EventWinJoin)
        }

        return list;
    }

    public async getWinCountOnlyPresentByMemberSeqNo(req: Request, res: Response, member: MemberA) {
        let userKey = member ? member.userKey : null;
        let list = await this.eventModel.getWinCountOnlyPresentByMemberSeqNo(userKey);
        return {count: list[0]._count};
    }

    public async getWinCountOnlyPresentToday(req: Request, res: Response, member: MemberA) {
        let list = await this.eventModel.getWinCountOnlyPresentToday();
        return {count: list[0]._count};
    }

    public async getWinAnnounceList(req: Request, res: Response, filter, paging, member: MemberA) {

        let _filter = {
            primary_type: filter.primaryType,
            win_announce_type: filter.winAnnounceType,
            status: 'announce',
            app_type: filter.appType,
            getWinAnnounceList: true
        }

        let list = await this.eventModel.list(_filter, [{column: 'win_announce_datetime', dir: 'DESC'}], paging, EventJoin)

        return list;
    }

    public async win(member: MemberA, event: Event, gift: EventGift, manager?: EntityManager) {
        let dateStr = now();

        let win = new EventWin();        
        win.userKey = member.userKey;
        win.eventSeqNo = event.seqNo;
        win.giftSeqNo = gift.seqNo;
        win.status = 'pending';
        win.openStatus = true;
        win.giftStatus = 0;
        win.winDatetime = dateStr;
        win.giftTitle = gift.title;
        win.giftPrice = gift.price;

        await this.eventWinModel.create(win, undefined, manager);

        gift.eventSeqNo = event.seqNo;
        gift.remainCount = gift.remainCount - 1;
        gift = await this.eventGiftModel.update(gift, undefined, manager);

        event.winnerCount += 1;

        await this.eventModel.update(event, undefined, manager);

        if(gift.giftType == 'point'){
            let historyPoint = new HistoryPoint();
            historyPoint.userKey = member.userKey;
            historyPoint.type = 'charge';
            historyPoint.category = 'event';
            historyPoint.point = gift.price;
            historyPoint.subject = getLang('id').eventWinPointTitle
            historyPoint.comment = getLang('id').eventWinPointContents
            historyPoint.regDatetime = now();
            await this.memberService.updatePoint(historyPoint, member, manager);
        }else if(gift.giftType == 'ball'){
            let historyBall = new HistoryBall();
            historyBall.userKey = member.userKey;
            historyBall.type = 'charge';
            historyBall.category = 'event';
            historyBall.ball = gift.price;
            historyBall.subject = getLang('id').eventWinBallTitle
            historyBall.comment = getLang('id').eventWinBallContents
            historyBall.regDatetime = now();
            await this.memberService.updateBall(historyBall, member, manager);
        }

        win['eventGift'] = gift;

        return win;
    }

    public lot_gift(gift: EventGift) {

        if(gift.remainCount > 0) {
            return lots(gift.lotPercent);
        }
        return false; 
    }

    @Transaction()
    public async join(req: Request, res: Response, params, member: MemberA, manager?: EntityManager) {


        let event: Event = params.event;
        let join: EventJoin = params.join || {};
        // let user: any = await this.authService.reloadSession(req, res, params);
        member = await this.memberService.getMember(member.userKey, manager);

        let _eventFilter = {
            // user_key: member.userKey,
            // primary_type: event.primaryType,
            seq_no: event.seqNo
            // addSelect: true
        }

        let saved: Event = await this.eventModel.get(event.seqNo, EventJoin, undefined, manager);
        
        console.log('saved',saved);

        if(!saved) throw new CoreError(ErrorType.E_NOTFOUND);
        if(saved.isDb && !join['properties']) {
            throw new CoreError(ErrorType.E_INVALID_ARG);
        }


        if(saved.primaryType == 'number') {
            if(!join.winCode || String(join.winCode).replace(/[0-9].*/ig, '').length > 0) {
                throw new CoreError(ErrorType.E_INVALID_ARG)
            }
        }

        await this.checkStatus(saved);

        await this.checkDisplayDuration(saved);

        await this.checkTimeDuration(saved, manager);


        let bJoinPossible = await this.checkJoinPossible(member, saved, manager);
        req.body.position = 5;
        let result: any = {};
        let joinEvent = await this.joinEvent(member, saved, join, bJoinPossible, manager);
        req.body.position = 6;
        result.join = joinEvent;

        if(saved.maxJoinCount && saved.maxJoinCount > 0 && saved.maxJoinCount <= saved.joinCount && saved.winAnnounceType == 'limit') {
            req.body.position = 7;
            saved.endDatetime = now();
            saved.winAnnounceDatetime = moment().add(3, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            await this.eventModel.update(saved, undefined, manager);
            // await this.eventModel.setEndDateNowAndWinAnnounceDateNow(saved.seqNo, manager);
            req.body.position = 7.5;
        } else if(saved.winAnnounceType == 'immediately') {
            req.body.position = 8;
            let win = await this.lot_user_event(member, saved, manager);
            if(win && win.seqNo != null) {
               result.win = win;
            }
            req.body.position = 8.5;
        }

        return result;
    }

    public async checkStatus(event: Event) {

        if(event.status == ActiveStatus.ACTIVE) {
            return;
        }
        throw new CoreError(ErrorType.E_NOTPERMISSION);
    }

    public async checkDisplayDuration(event: Event) {
        if(event.displayStartDatetime > moment().format('YYYY-MM-DD HH:mm:ss') || event.displayEndDatetime < moment().format('YYYY-MM-DD HH:mm:ss')) {
            throw new CoreError(ErrorType.E_NOTPOSSIBLETIME);
        }
        return;
    }

    public async checkTimeDuration(event: Event, manager?: EntityManager) {
        if(event.secondaryType != 'time') {
            if(event.startDatetime > moment().format('YYYY-MM-DD HH:mm:ss') || event.endDatetime < moment().format('YYYY-MM-DD HH:mm:ss')) {
                throw new CoreError(ErrorType.E_NOTPOSSIBLETIME)
            }

            return;
        }

        let eventTimeList = await this.eventTimeModel.all({eventSeqNo: event.seqNo}, undefined, undefined, manager);

        if(eventTimeList.list.length == 0) {
            throw new CoreError(ErrorType.E_NOTPOSSIBLETIME);
        }

        let inculde = false;
        let nowTime = Number(moment().format('HH')) * 60 * 60 + Number(moment().format('mm')) * 60  + Number(moment().format('ss'));

        for(let d of eventTimeList.list) {

            let startTime = Number(d.startTime.substring(0, 2)) * 60 * 60 + Number(d.startTime.substring(2, 4)) * 60;
            let endTime = Number(d.endTime.substring(0, 2)) * 60 * 60 + Number(d.endTime.substring(2, 4)) * 60;

            if(startTime <= nowTime && endTime >= nowTime) {
                inculde = true;
                break;
            }
        }

        if(inculde == false) {
            throw new CoreError(ErrorType.E_NOTPOSSIBLETIME);
        }

        return;
    }

    public async checkJoinPossible(member: MemberA, event: Event, manager?: EntityManager) {
        if(event.rewardType == 'none' && event.reward < 0 && member.ball < (-1 * Number(event.reward))) {
            throw new CoreError(ErrorType.E_LACK_COST);
        }

        if(event.maxJoinCount > 0 && event.maxJoinCount <= event.joinCount) {
            throw new CoreError(ErrorType.E_ALREADY_LIMIT);
        }

        if(event.primaryType == 'goodluck' && event.reward >= 0) {

            let filter = {
                user_key: member.userKey,
                event_seq_no: event.seqNo
            }

            let order: IOrder[] = [{
                column: 'seqNo',
                dir: 'DESC'
            }]

            let sameJoin = await this.eventJoinModel.getByFilter(filter, order, undefined, manager);
            if(sameJoin) {
                let joinableDate = moment(sameJoin.joinDatetime).add(300, 'second');
                let now = moment();
                let remainSecond = joinableDate.diff(now, 'second');
                if(joinableDate.format('YYYYMMDDHHmmss') > now.format('YYYYMMDDHHmmss')) {

                    throw new CoreError(ErrorType.E_NOTPOSSIBLETIME, undefined,{
                        joinDate: sameJoin.joinDatetime,
                        joinTerm: 300,
                        remainSecond: remainSecond
                    })
                }
            }


            let joinDate = await this.eventJoinModel.getEventLastJoin(member.userKey, manager);

            if(joinDate[0]) {
                let joinableDate = moment(joinDate[0].joinDatetime).add(15, 'second');
                let now = moment();
                let remainSecond = joinableDate.diff(now, 'second');
                if(joinableDate.format('YYYYMMDDHHmmss') > now.format('YYYYMMDDHHmmss')) {

                    throw new CoreError(ErrorType.E_NOTPOSSIBLETIME, undefined, {
                        joinDate: joinDate[0].joinDatetime,
                        joinTerm: 15,
                        remainSecond: remainSecond
                    })
                }
            }
        }

        if(event.joinType == 'always') {
            return true;
        }

        let joinList = await this.eventJoinModel.list({event_seq_no: event.seqNo, user_key: member.userKey}, [{column: 'seqNo', dir: 'DESC'}], { page: 1, limit: 20 }, undefined, manager)

        if(event.joinType == 'event') {
            if(joinList.list.length >= event.joinLimitCount) {
                throw new CoreError(ErrorType.E_ALREADY_EXIST);
            }
            if(joinList.list.length> 0) {
                return false;
            }
            return true;
        }

        if(event.joinType == 'minute') {
            if(joinList.list.length == 0) {
                return true;
            } else {
                if(event.joinTerm && event.joinTerm > 0) {
                    let joinableDate = moment(joinList.list[0].joinDatetime).add(event.joinTerm, 'minutes').format('YYYY-MM-DD HH:mm:ss');

                    if(joinableDate > now()) {
                        throw new CoreError(ErrorType.E_ALREADY_EXIST)
                    }
                } else {
                    return true;
                }
            }
        } else {
            let prevDate = null;
            if(event.joinType == 'daily') prevDate = addNow(-1, 'day', 'YYYY-MM-DD 23:59:59');
            else if(event.joinType == 'weekly') prevDate = addNow(-7 , 'day', 'YYYY-MM-DD 23:59:59');
            else if(event.joinType == 'monthly') prevDate = addNow(-1, 'month', 'YYYY-MM-DD 23:59:59');

            if(!prevDate) {
                throw new CoreError(ErrorType.E_UNKNOWN);
            }

            let joinCount = 0;

            for(let join of joinList.list) {
                if(join.joinDatetime > prevDate) {
                    joinCount++;
                }
            }

            console.log('joinCount',joinCount);
            console.log('joinLimitCount',event.joinLimitCount);

            if(joinCount >= event.joinLimitCount) {
                throw new CoreError(ErrorType.E_ALREADY_EXIST);
            }
        }

        return true;

    }

    public async joinEvent(member: MemberA, event: Event, joinParams: any, bJoinPossible: boolean, manager?: EntityManager) {

        let ball = event.reward;

        let join = new EventJoinEntity();

        join.eventSeqNo = event.seqNo;
        join.userKey = member.userKey;
        join.joinDatetime = now();
        join.joinProp = joinParams.joinProp;
        join.winCode = joinParams.winCode;

        join = await this.eventJoinModel.create(join, undefined, manager);
        
        event.joinCount++;
        await this.eventModel.update(event, undefined, manager);
        
        join.joinDatetime = null;

        if(ball != 0) {

            if(ball < 0 && member.ball < Math.abs(ball)){
                throw new CoreError(ErrorType.E_LACK_COST);
            }

            if(ball > 0) {
                let historyBall = new HistoryBall();
                historyBall.userKey = member.userKey;
                historyBall.type = 'charge';
                historyBall.category = 'eventJoin';
                historyBall.ball = ball;
                historyBall.subject = getLang('id').eventJoinTitle
                historyBall.comment = getLang('id').eventJoinChargeBallContents
                historyBall.regDatetime = now();
                await this.memberService.updateBall(historyBall, member, manager);

            } else {

                let historyBall = new HistoryBall();
                historyBall.userKey = member.userKey;
                historyBall.type = 'used';
                historyBall.category = 'eventJoin';
                historyBall.ball = Math.abs(ball);
                historyBall.subject = getLang('id').eventJoinTitle
                historyBall.comment = getLang('id').eventJoinUseBallContents
                historyBall.regDatetime = now();
                await this.memberService.updateBall(historyBall, member, manager);
            }
        }

        if(event.joinRewardType && event.joinRewardAmount > 0){
            switch(event.joinRewardType){
                case 'ball':
                    let historyBall = new HistoryBall();
                    historyBall.userKey = member.userKey;
                    historyBall.type = 'charge';
                    historyBall.category = 'eventJoin';
                    historyBall.ball = event.joinRewardAmount;
                    historyBall.subject = getLang('id').eventJoinTitle
                    historyBall.comment = getLang('id').eventJoinChargeBallContents
                    historyBall.regDatetime = now();
                    await this.memberService.updateBall(historyBall, member, manager);
                     break;
                case 'point':
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = member.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'eventJoin';
                    historyPoint.point = event.joinRewardAmount;
                    historyPoint.subject = getLang('id').eventJoinTitle
                    historyPoint.comment = getLang('id').eventJoinChargePointContents
                    historyPoint.regDatetime = now();
                    await this.memberService.updatePoint(historyPoint, member, manager);
                     break;
           }
        }

        return join;
    }

    public async lot_user_event(member: MemberA, event: Event, manager?: EntityManager) {
        var eventWin :EventWin;
        if(event.gift) {
            let giftList = await this.eventGiftModel.list({event_seq_no: event.seqNo}); 

            let remain = false;
            let allzero = true;
            let noorder = true;
            let remainCount = 0;

            for(let gift of giftList.list) {

                remainCount += gift.remainCount;
                if(allzero == true && gift.lotPercent > 0) allzero = false;
                if(noorder == true && gift.winOrder) noorder = false;
                if(remain == false && gift.remainCount > 0) remain = true;
            }

            console.log('remainCount : ',remainCount)
            
            if(allzero && noorder == true) return eventWin;

            if(event.winAnnounceType == 'immediately' && noorder == false && remain == true) {
                for(let gift of giftList.list) {
                    let winner = false;
                    if(gift.winOrder) {
                        let arr = gift.winOrder.split(/\s*\,\s*/);
                        if(isNonEmptyArray(arr)) {
                            for(let i = 0; i < arr.length; i++) {
                                let orderStr = arr[i];
                                if(orderStr) {
                                    let seq = orderStr;
                                    if(seq == event.joinCount) {
                                        winner = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    if(winner) {
                        eventWin = await this.win(member, event, gift, manager);
                        if(eventWin) {
                            if(--remainCount == 0) {
                                remain = false;
                            }
                            break;
                        }
                    }
                }
                
            }

            if(!eventWin && allzero == false && remain == true) {

                for(let gift of giftList.list) {
                    if(this.lot_gift(gift)) {
                        eventWin = await this.win(member, event, gift, manager);
                        if(eventWin) break;
                    }
                }
            }
            
            for(let gift of giftList.list) {
                if(gift.remainCount > 0) {
                    remain = true;
                    break;
                }
            }

            if(remain == false) {
                if(event.winAnnounceType == 'immediately') {
                    event.status = 'announce';
                    event.priority = -1;
                    event.winAnnounceDatetime = now();

                    await this.eventModel.update(event, undefined, manager);
                } else {
                    event.status = 'pending';
                    event.priority = -1;

                    await this.eventModel.update(event, undefined, manager);
                }
            }
        }

        return eventWin;
    }

    public async checkVirtualused(number: string) {
        let cnt = await this.eventModel.getByFilter({virtual_number: number, status: ActiveStatus.ACTIVE});
        if(cnt) {
            return true;
        } 
        return false;
    }

    public async checkExistVirtualNumber(number: string) {
        let cnt = await this.eventModel.getByFilter({virtual_number: number});
        if(cnt) {
            return true;
        }
        return false;
    }

    public async getMaxCode() {
        let newCode = '';

        let code = await this.eventModel.getMaxCode(); 
        if(!code[0]) {
            newCode = '1' + moment().format('YYYYMMDD') + '050001';
        } else {
            let lastNum = Number(code[0]._code.substring(11));

            if(lastNum < 9999) {
                let newLastNum = lastNum + 1;
                let newLastCode = '000' + newLastNum;
                newLastCode = newLastCode.substring(newLastCode.length - 2);
                newCode = code[0]._code.substring(0, 11) + newLastCode;
            } else if(lastNum == 9999) {
                let firstNum = Number(code[0]._code) + 1;
                
                newCode = String(firstNum) + code[0]._code.substring(1, 11) + '0001';
            }
        }

        return newCode;
    }

    @Transaction()
    public async writeImpression(req: Request, res: Response, win: WriteImpressionParams, member: MemberA, manager?: EntityManager) {

        let saved : EventWin = await this.eventWinModel.getByFilter({seqNo: win.seqNo}, undefined, undefined, manager);
   
        if(!saved) {
            throw new CoreError(ErrorType.E_NOTFOUND);
        }
 
        let [event, gift] = await Promise.all([
            this.eventModel.get(saved.eventSeqNo, undefined, undefined, manager),
            this.eventGiftModel.getByFilter({eventSeqNo: saved.eventSeqNo, seqNo: saved.giftSeqNo}, undefined, undefined, manager)
        ])

        if(saved.userKey != member.userKey) {
            throw new CoreError(ErrorType.E_NOTPERMISSION);
        }
   
        let insert = saved.impression ? false : true;
        win.impression = filter(win.impression);
   
        
        await this.eventWinModel.updateImpression(win.seqNo, win.impression, manager);
 
        // if(insert && !user.isVirtual) {
        //     if(gift.giftType == 'mobileGift' && gift.autoSend && gift.giftishowSeqNo) {

        //         let giftishow = await this.giftishowModel.get(gift.giftishowSeqNo, undefined, undefined, manager);
        //         let trId = 'pplus_' + getRandomId();
        //         let mobile = user.mobileNumber;

        //         let contents = '캐시픽 이벤트 당첨을 축하드립니다. \n경품에 당첨되신 기념으로  구글플레이스토어에\n리뷰를 남겨주시면 캐시픽에 큰 힘이됩니다.\n\n';
        //         if(user.device.platform = 'ios') {
        //             contents += 'https://itunes.apple.com/app/id1529226245';
        //         } else {
        //             contents += 'https://play.google.com/store/apps/details?id=com.pplus.luckybol';
        //         }

        //         let resultObject = await this.giftishowBuyService.send(req, res, giftishow.goodsCode, trId, '캐시픽 이벤트 당첨', contents, mobile);

        //         if(resultObject) {
                    
        //             let eventWin = await this.eventWinModel.get(win.id, undefined, undefined, manager);

        //             eventWin.giftOrderNo = resultObject.orderNo;
        //             eventWin.giftTrId = trId;
        //             eventWin.giftMobileNumber = encryptStrData(win.appType + '##' + getValidatePhoneNumber(mobile));

        //             await this.eventWinModel.update(eventWin, manager);
        //         }
        //     }
        // } 

        return {message: 'SUCCESS'};
   
    }

}