import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TelegramUserReferralTaskModel } from "../models/telegram_user_referral_task";
import { IsNotEmpty } from "../../common/services/decorators";
import { TelegramUserReferralTask } from "../entities/telegram_user_referral_task";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class TelegramUserReferralTaskCreateParams {
    public id?: number;
    public referral_task_id?: number;
    public telegram_user_id?: number;
    public is_completed?: boolean;
    public created_at?: string;
    public updated_at?: string;
}

export class TelegramUserReferralTaskUpdateParams {
    public id?: number;
    public referral_task_id?: number;
    public telegram_user_id?: number;
    public is_completed?: boolean;
    public created_at?: string;
    public updated_at?: string;
}

export interface TelegramUserReferralTaskListFilter extends ListFilter {
    id?: number;
    referral_task_id?: number;
    telegram_user_id?: number;
    is_completed?: boolean;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class TelegramUserReferralTaskService extends CoreService {

    @Inject(()=> TelegramUserReferralTaskModel)
    private telegramUserReferralTaskModel: TelegramUserReferralTaskModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: TelegramUserReferralTaskCreateParams) {
        let telegramUserReferralTask = new TelegramUserReferralTask();

        telegramUserReferralTask.id = params.id;
        telegramUserReferralTask.referral_task_id = params.referral_task_id;
        telegramUserReferralTask.telegram_user_id = params.telegram_user_id;
        telegramUserReferralTask.is_completed = params.is_completed;
        telegramUserReferralTask.created_at = params.created_at;
        telegramUserReferralTask.updated_at = params.updated_at;

        await this.telegramUserReferralTaskModel.create(telegramUserReferralTask);
        return telegramUserReferralTask;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let telegramUserReferralTask = await this.telegramUserReferralTaskModel.get(seqNo);
        if(!telegramUserReferralTask) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return telegramUserReferralTask;
    }

    public async list(req: Request, res: Response, filter: TelegramUserReferralTaskListFilter, order: IOrder[], paging: IPaging) {
        return await this.telegramUserReferralTaskModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TelegramUserReferralTaskUpdateParams) {
        let telegramUserReferralTask = await this.telegramUserReferralTaskModel.get(seqNo);
        if(!telegramUserReferralTask) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            telegramUserReferralTask.id = params.id;
        };
        if(params.referral_task_id !== undefined) {
            telegramUserReferralTask.referral_task_id = params.referral_task_id;
        };
        if(params.telegram_user_id !== undefined) {
            telegramUserReferralTask.telegram_user_id = params.telegram_user_id;
        };
        if(params.is_completed !== undefined) {
            telegramUserReferralTask.is_completed = params.is_completed;
        };
        if(params.created_at !== undefined) {
            telegramUserReferralTask.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            telegramUserReferralTask.updated_at = params.updated_at;
        };

        await this.telegramUserReferralTaskModel.update(telegramUserReferralTask);
        return telegramUserReferralTask;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let telegramUserReferralTask = await this.telegramUserReferralTaskModel.get(seqNo);
        if(!telegramUserReferralTask) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.telegramUserReferralTaskModel.delete(telegramUserReferralTask);
        return telegramUserReferralTask;
    }

}