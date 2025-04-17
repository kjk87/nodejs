import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TonHistoryModel } from "../models/ton_history";
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TonHistory } from "../entities/ton_history";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsers } from "../../telegram/entities/telegram_users";

export class TonHistoryCreateParams {
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export class TonHistoryUpdateParams {
    public id?: number;
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export interface TonHistoryListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    type?: string;
    subject?: string;
    comment?: string;
    amount?: number;
}

@Service()
export class TonHistoryService extends CoreService {

    @Inject(()=> TonHistoryModel)
    private tonHistoryModel: TonHistoryModel;

    constructor() {
        super();
    }

    public async create(params: TonHistoryCreateParams, manager?: EntityManager) {
        let tonHistory = new TonHistory();

        tonHistory.telegram_user_id = params.telegram_user_id;
        tonHistory.type = params.type;
        tonHistory.subject = params.subject;
        tonHistory.comment = params.comment;
        tonHistory.amount = params.amount;
        tonHistory.created_at = now();

        await this.tonHistoryModel.create(tonHistory, undefined, manager);
        return tonHistory;
    }

    public async get(req: Request, res: Response) {
        
        let result: any = {};
        let pointHistory = await this.tonHistoryModel.all();

        let length = pointHistory.list.length;
        
        if(length > 0) {
            let ran = Math.floor(Math.random()*length);

            result = pointHistory.list[ran];
        }
        
        return result;
    }

    public async list(req: Request, res: Response, paging: IPaging, user: TelegramUsers) {
        let filter: TonHistoryListFilter = {};
        filter.telegram_user_id = user.id;
        let order: IOrder[] = [
            {
                column: 'id',
                dir: "DESC"
            }
        ]
        return await this.tonHistoryModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TonHistoryUpdateParams) {
        let pointHistory = await this.tonHistoryModel.get(seqNo);
        if(!pointHistory) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            pointHistory.id = params.id;
        };


        await this.tonHistoryModel.update(pointHistory);
        return pointHistory;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let pointHistory = await this.tonHistoryModel.get(seqNo);
        if(!pointHistory) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.tonHistoryModel.delete(pointHistory);
        return pointHistory;
    }

}