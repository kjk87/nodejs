import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { TetherHistoryModel } from "../models/tether_history";
import { TetherHistory } from "../entities/tether_history";

export class TetherHistoryCreateParams {
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export class TetherHistoryUpdateParams {
    public id?: number;
    public telegram_user_id: number;
    public type: string;
    public subject: string;
    public comment: string;
    public amount: number;
}

export interface TetherHistoryListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    type?: string;
    subject?: string;
    comment?: string;
    amount?: number;
}

@Service()
export class TetherHistoryService extends CoreService {

    @Inject(()=> TetherHistoryModel)
    private tetherHistoryModel: TetherHistoryModel;

    constructor() {
        super();
    }

    public async create(params: TetherHistoryCreateParams, manager?: EntityManager) {
        let tetherHistory = new TetherHistory();

        tetherHistory.telegram_user_id = params.telegram_user_id;
        tetherHistory.type = params.type;
        tetherHistory.subject = params.subject;
        tetherHistory.comment = params.comment;
        tetherHistory.amount = params.amount;
        tetherHistory.created_at = now();

        await this.tetherHistoryModel.create(tetherHistory, undefined, manager);
        return tetherHistory;
    }

    public async list(req: Request, res: Response, paging: IPaging, user: TelegramUsers) {
        let filter: TetherHistoryListFilter = {};
        filter.telegram_user_id = user.id;
        let order: IOrder[] = [
            {
                column: 'id',
                dir: "DESC"
            }
        ]
        return await this.tetherHistoryModel.list(filter, order, paging);
    }
    

}