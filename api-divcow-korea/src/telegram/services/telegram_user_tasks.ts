import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TelegramUserTasksModel } from "../models/telegram_user_tasks";
import { IsNotEmpty } from "../../common/services/decorators";
import { TelegramUserTasks } from "../entities/telegram_user_tasks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class TelegramUserTasksCreateParams {
    public id?: number;
    public telegram_user_id?: number;
    public task_id?: number;
    public is_submitted?: boolean;
    public is_rewarded?: boolean;
    public submitted_at?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class TelegramUserTasksUpdateParams {
    public id?: number;
    public telegram_user_id?: number;
    public task_id?: number;
    public is_submitted?: boolean;
    public is_rewarded?: boolean;
    public submitted_at?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface TelegramUserTasksListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    task_id?: number;
    is_submitted?: boolean;
    is_rewarded?: boolean;
    submitted_at?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class TelegramUserTasksService extends CoreService {

    @Inject(()=> TelegramUserTasksModel)
    private telegramUserTasksModel: TelegramUserTasksModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: TelegramUserTasksCreateParams) {
        let telegramUserTasks = new TelegramUserTasks();

        telegramUserTasks.id = params.id;
        telegramUserTasks.telegram_user_id = params.telegram_user_id;
        telegramUserTasks.task_id = params.task_id;
        telegramUserTasks.is_submitted = params.is_submitted;
        telegramUserTasks.is_rewarded = params.is_rewarded;
        telegramUserTasks.submitted_at = params.submitted_at;
        telegramUserTasks.created_at = params.created_at;
        telegramUserTasks.updated_at = params.updated_at;

        await this.telegramUserTasksModel.create(telegramUserTasks);
        return telegramUserTasks;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let telegramUserTasks = await this.telegramUserTasksModel.get(seqNo);
        if(!telegramUserTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return telegramUserTasks;
    }

    public async list(req: Request, res: Response, filter: TelegramUserTasksListFilter, order: IOrder[], paging: IPaging) {
        return await this.telegramUserTasksModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TelegramUserTasksUpdateParams) {
        let telegramUserTasks = await this.telegramUserTasksModel.get(seqNo);
        if(!telegramUserTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            telegramUserTasks.id = params.id;
        };
        if(params.telegram_user_id !== undefined) {
            telegramUserTasks.telegram_user_id = params.telegram_user_id;
        };
        if(params.task_id !== undefined) {
            telegramUserTasks.task_id = params.task_id;
        };
        if(params.is_submitted !== undefined) {
            telegramUserTasks.is_submitted = params.is_submitted;
        };
        if(params.is_rewarded !== undefined) {
            telegramUserTasks.is_rewarded = params.is_rewarded;
        };
        if(params.submitted_at !== undefined) {
            telegramUserTasks.submitted_at = params.submitted_at;
        };
        if(params.created_at !== undefined) {
            telegramUserTasks.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            telegramUserTasks.updated_at = params.updated_at;
        };

        await this.telegramUserTasksModel.update(telegramUserTasks);
        return telegramUserTasks;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let telegramUserTasks = await this.telegramUserTasksModel.get(seqNo);
        if(!telegramUserTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.telegramUserTasksModel.delete(telegramUserTasks);
        return telegramUserTasks;
    }

}