import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { Req, Res } from "routing-controllers";
import { EventWinModel } from "../models/event_win";
import { EventWinJoin, EventWinJoinByUser, EventWinJoinPresent, EventWinJoinSeqNo, EventWinJoinWinnerUser } from "../entities/event_win";
import { EventReplyModel } from "../models/event_reply";
import { EventJoinModel } from "../models/event_join";
import { IOrder, IPaging, ListFilter } from "../../common/core/CoreModel";
import { arrayToMapArray, isNonEmptyArray, now } from "../../common/services/util";
import { IsNotEmpty } from "../../common/services/decorators";
import { MemberA } from "../../member/entities/member_a";
import { EntityManager } from "typeorm";

export class EventWinListFilter extends ListFilter {

    @IsNotEmpty()
    public eventSeqNo: number;
    public openStatus: boolean;
}

@Service()
export class EventWinService extends CoreService {

    @Inject(()=> EventWinModel)
    private eventWinModel: EventWinModel;
    
    @Inject(()=> EventReplyModel)
    private eventReplyModel: EventReplyModel;

    @Inject(()=> EventJoinModel)
    private eventJoinModel:EventJoinModel;

    public async list(@Req() req: Request, @Res() res: Response, filter: EventWinListFilter, paging) {

        filter.openStatus = true;
        filter.joinColumn = [
            {
                joinTable: 'eventGift'
            },
            {
                joinTable: 'memberTotal'
            }
        ]

        let order: IOrder[] = [
            {
                column: 'price',
                dir: 'DESC',
                table: 'eventGift'
            },
            {
                column: 'seqNo',
                dir: 'DESC',
                table: 'entity'
            }
        ];
        
        let list = await this.eventWinModel.list(filter, order, paging, EventWinJoin);

        return list;
    }

    public async getWinListOnlyPresent(@Req() req: Request, @Res() res: Response, filter, paging) {
        
        let _filter = {
            win_status: true,
            open_status: 1,
            review_present: 1,
            impression_not: true,
            joinColumn : [
                {
                    joinTable: 'eventGift'
                },
                {
                    joinTable: 'memberTotal'
                }
            ]
            
        }
        
        let list = await this.eventWinModel.list(_filter, [{column: 'seqNo', dir: 'DESC', table: 'entity'}], paging, EventWinJoinPresent);

        return list;
    }

    public async getMyWinListOnlyPresent(@Req() req: Request, @Res() res: Response, filter, paging, member: MemberA) {
        
        let _filter = {
            win_status: true,
            open_status: 1,
            review_present: 1,
            impression_not: true,
            myWinListOnlyPresent: true,
            user_key: member.userKey,
            joinColumn : [
                {
                    joinTable: 'eventGift'
                },
                {
                    joinTable: 'memberTotal'
                }
            ]
        }
        
        let list = await this.eventWinModel.list(_filter, [{column: 'seqNo', dir: 'DESC', table: 'entity'}, {column: 'price', dir: 'DESC', table: 'entity'}], paging, EventWinJoinPresent);
        return list;
    }

    public async getWinBySeqNo(req: Request, res: Response, filter) {

        let _filter = {
            seq_no: filter.seqNo,
            open_status: 1,
            joinColumn : [
                {
                    joinTable: 'eventGift'
                },
                {
                    joinTable: 'memberTotal'
                }
            ]
        }

        let data = await this.eventWinModel.getByFilter(_filter, undefined, EventWinJoinSeqNo);
        console.log(data);
        return data;
    }

    public async getNewWinCountByUser(req, res, member:MemberA) {
        let data = await this.eventWinModel.getNewWinCountByUser(member.userKey);

        return {
            count: data[0]._count
        }
    }

    public async getUserWinList(req: Request, res: Response, paging: IPaging, member: MemberA) {
        let filter = {
            user_key: member.userKey,
            open_status: 1,
            joinColumn : [
                {
                    joinTable: 'event'
                }
            ]
        }
        
        let data = await this.eventWinModel.list(filter, [{column: 'seqNo', dir: 'DESC', table: 'entity'}], paging, EventWinJoinByUser);

        return data;
    }

    public async existsResult(req: Request, res: Response, eventSeqNo: number, member: MemberA) {
        let join = await this.eventJoinModel.getExists(eventSeqNo, member.userKey);
        let win = await this.eventWinModel.getExists(eventSeqNo, member.userKey);

        return {
            join: join[0]._exists == 0 ? false : true,
            win: win[0]._exists == 0 ? false : true
        }
    }

    public async getEventWinAllByUser(req: Request, res: Response, eventSeqNo: number, member: MemberA) {
        let filter = {
            user_key: member.userKey,
            event_seq_no: eventSeqNo,
            open_status: 1,
            joinColumn : [
                {
                    joinTable: 'eventGift'
                },
                {
                    joinTable: 'memberTotal'
                }
            ]
        }
        
        let data = await this.eventWinModel.list(filter, [{column: 'seqNo', dir: 'DESC', table: 'entity'}], undefined, EventWinJoinPresent);

        return data;
    }

    public async updateUseGift(req, res, filter,) {
        let eventWin = await this.eventWinModel.getByFilter({event_seq_no: filter.eventSeqNo, seq_no: filter.seqNo});
        eventWin.giftStatus = 1;
        eventWin.useDatetime = now();

        await this.eventWinModel.update(eventWin);

        return eventWin;
    }

    public async getLottoWinner(req, res, filter, paging) {
        let _filter = {
            lotto_times: filter.lottoTimes,
            primary_type: filter.primaryType || ['lotto', 'lottoPlaybol'],
        }
        return await this.eventWinModel.list(_filter, [{column: 'lotto_times', dir: 'DESC', table: 'event'}, {column: 'primary_type', dir: 'ASC', table: 'event'}], paging, EventWinJoinWinnerUser);
    }
} 