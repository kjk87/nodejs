import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TelegramUserDailyTasksModel } from "../models/telegram_user_daily_tasks";
import { IsNotEmpty } from "../../common/services/decorators";
import { TelegramUserDailyTasks } from "../entities/telegram_user_daily_tasks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class TelegramUserDailyTasksCreateParams {
    public id?: number;
    public telegram_user_id?: number;
    public daily_task_id?: number;
    public completed?: boolean;
    public created_at?: string;
    public updated_at?: string;
}

export class TelegramUserDailyTasksUpdateParams {
    public id?: number;
    public telegram_user_id?: number;
    public daily_task_id?: number;
    public completed?: boolean;
    public created_at?: string;
    public updated_at?: string;
}

export interface TelegramUserDailyTasksListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    daily_task_id?: number;
    completed?: boolean;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class TelegramUserDailyTasksService extends CoreService {

    @Inject(()=> TelegramUserDailyTasksModel)
    private telegramUserDailyTasksModel: TelegramUserDailyTasksModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: TelegramUserDailyTasksCreateParams) {
        let telegramUserDailyTasks = new TelegramUserDailyTasks();

        telegramUserDailyTasks.id = params.id;
        telegramUserDailyTasks.telegram_user_id = params.telegram_user_id;
        telegramUserDailyTasks.daily_task_id = params.daily_task_id;
        telegramUserDailyTasks.completed = params.completed;
        telegramUserDailyTasks.created_at = params.created_at;
        telegramUserDailyTasks.updated_at = params.updated_at;

        await this.telegramUserDailyTasksModel.create(telegramUserDailyTasks);
        return telegramUserDailyTasks;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let telegramUserDailyTasks = await this.telegramUserDailyTasksModel.get(seqNo);
        if(!telegramUserDailyTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return telegramUserDailyTasks;
    }

    public async list(req: Request, res: Response, filter: TelegramUserDailyTasksListFilter, order: IOrder[], paging: IPaging) {
        return await this.telegramUserDailyTasksModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TelegramUserDailyTasksUpdateParams) {
        let telegramUserDailyTasks = await this.telegramUserDailyTasksModel.get(seqNo);
        if(!telegramUserDailyTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            telegramUserDailyTasks.id = params.id;
        };
        if(params.telegram_user_id !== undefined) {
            telegramUserDailyTasks.telegram_user_id = params.telegram_user_id;
        };
        if(params.daily_task_id !== undefined) {
            telegramUserDailyTasks.daily_task_id = params.daily_task_id;
        };
        if(params.completed !== undefined) {
            telegramUserDailyTasks.completed = params.completed;
        };
        if(params.created_at !== undefined) {
            telegramUserDailyTasks.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            telegramUserDailyTasks.updated_at = params.updated_at;
        };

        await this.telegramUserDailyTasksModel.update(telegramUserDailyTasks);
        return telegramUserDailyTasks;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let telegramUserDailyTasks = await this.telegramUserDailyTasksModel.get(seqNo);
        if(!telegramUserDailyTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.telegramUserDailyTasksModel.delete(telegramUserDailyTasks);
        return telegramUserDailyTasks;
    }

}