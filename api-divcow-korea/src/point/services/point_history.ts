import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { PointHistoryModel } from "../models/point_history";
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { PointHistory } from "../entities/point_history";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsers } from "../../telegram/entities/telegram_users";

export class PointHistoryCreateParams {
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export class PointHistoryUpdateParams {
    public id?: number;
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export interface PointHistoryListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    type?: string;
    subject?: string;
    comment?: string;
    amount?: number;
}

@Service()
export class PointHistoryService extends CoreService {

    @Inject(()=> PointHistoryModel)
    private pointHistoryModel: PointHistoryModel;

    constructor() {
        super();
    }

    public async create(params: PointHistoryCreateParams, manager?: EntityManager) {
        let pointHistory = new PointHistory();

        pointHistory.telegram_user_id = params.telegram_user_id;
        pointHistory.type = params.type;
        pointHistory.subject = params.subject;
        pointHistory.comment = params.comment;
        pointHistory.amount = params.amount;
        pointHistory.created_at = now();

        await this.pointHistoryModel.create(pointHistory, undefined, manager);
        return pointHistory;
    }

    public async get(req: Request, res: Response) {
        
        let result: any = {};
        let pointHistory = await this.pointHistoryModel.all();

        let length = pointHistory.list.length;
        
        if(length > 0) {
            let ran = Math.floor(Math.random()*length);

            result = pointHistory.list[ran];
        }
        
        return result;
    }

    public async list(req: Request, res: Response, paging: IPaging, user: TelegramUsers) {
        let filter: PointHistoryListFilter = {};
        filter.telegram_user_id = user.id;
        let order: IOrder[] = [
            {
                column: 'id',
                dir: "DESC"
            }
        ]
        return await this.pointHistoryModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: PointHistoryUpdateParams) {
        let pointHistory = await this.pointHistoryModel.get(seqNo);
        if(!pointHistory) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            pointHistory.id = params.id;
        };


        await this.pointHistoryModel.update(pointHistory);
        return pointHistory;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let pointHistory = await this.pointHistoryModel.get(seqNo);
        if(!pointHistory) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.pointHistoryModel.delete(pointHistory);
        return pointHistory;
    }

}