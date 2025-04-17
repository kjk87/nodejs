import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { ReferralTasksModel } from "../models/referral_tasks";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { ReferralTasks, ReferralTasksJoin } from "../entities/referral_tasks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { TelegramUsersModel } from "../../telegram/models/telegram_users";
import { TelegramUserReferralTaskModel } from "../../telegram/models/telegram_user_referral_task";
import { TelegramUserReferralTask } from "../../telegram/entities/telegram_user_referral_task";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";

export class ReferralTasksCreateParams {
    public id?: number;
    public title?: string;
    public number_of_referrals?: string;
    public reward?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class ReferralTasksUpdateParams {
    public id?: number;
    public title?: string;
    public number_of_referrals?: string;
    public reward?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface ReferralTasksListFilter extends ListFilter {
    id?: number;
    title?: string;
    number_of_referrals?: string;
    reward?: number;
    created_at?: string;
    updated_at?: string;
    telegram_user_id?: number;
}

@Service()
export class ReferralTasksService extends CoreService {

    @Inject(()=> ReferralTasksModel)
    private referralTasksModel: ReferralTasksModel;

    @Inject(()=> TelegramUserReferralTaskModel)
    private telegramUserReferralTaskModel: TelegramUserReferralTaskModel;

    @Inject(()=> TelegramUsersModel)
    private telegramUsersModel: TelegramUsersModel;
    
    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    constructor() {
        super();
    }

    public async referralTask(req: Request, res: Response, user: TelegramUsers){
        let filter : ReferralTasksListFilter = {};
        filter.telegram_user_id = user.id;

        filter.joinColumn = [
            {
                joinTable: 'telegram_user_referral_task'
            }
        ]

        return (await this.referralTasksModel.all(filter, undefined, ReferralTasksJoin)).list;
    }

    @Transaction()
    public async referralTaskComplete(req: Request, res: Response, taskId:number, user: TelegramUsers, manager?: EntityManager){

        let count = await this.telegramUserReferralTaskModel.getCount({telegram_user_id : user.id, referral_task_id: taskId})
        if(count > 0){
            res.status(400);
            return {success: false, message:"Task already completed"};
        }

        let task:ReferralTasks = await this.referralTasksModel.get(taskId)

        let totalReferrals = await this.telegramUsersModel.getCount({referred_by : user.id})
        if(totalReferrals < task.number_of_referrals){
            res.status(400);
            return {success: false, message:"Not enough referrals."};
        }

        let userReferralTask = new TelegramUserReferralTask();
        userReferralTask.referral_task_id = taskId;
        userReferralTask.telegram_user_id = user.id;
        userReferralTask.is_completed = true;
        userReferralTask.created_at = now();
        userReferralTask.updated_at = now();
        await this.telegramUserReferralTaskModel.create(userReferralTask, manager);

        let pointHistory = new PointHistoryCreateParams();
        pointHistory.telegram_user_id = user.id;
        pointHistory.type = 'charge';
        pointHistory.subject = 'Mission Reward';
        pointHistory.comment = 'Mission Reward';
        pointHistory.amount = task.reward;
        await this.pointHistoryService.create(pointHistory, manager);

        await this.telegramUsersService.updateBalance(user, task.reward, manager);

        return {success: true, message:"Task completed"};
    }

    public async create(req: Request, res: Response, params: ReferralTasksCreateParams) {
        let referralTasks = new ReferralTasks();

        referralTasks.id = params.id;
        referralTasks.title = params.title;
        referralTasks.number_of_referrals = params.number_of_referrals;
        referralTasks.reward = params.reward;
        referralTasks.created_at = params.created_at;
        referralTasks.updated_at = params.updated_at;

        await this.referralTasksModel.create(referralTasks);
        return referralTasks;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let referralTasks = await this.referralTasksModel.get(seqNo);
        if(!referralTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return referralTasks;
    }

    public async list(req: Request, res: Response, filter: ReferralTasksListFilter, order: IOrder[], paging: IPaging) {
        return await this.referralTasksModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: ReferralTasksUpdateParams) {
        let referralTasks = await this.referralTasksModel.get(seqNo);
        if(!referralTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            referralTasks.id = params.id;
        };
        if(params.title !== undefined) {
            referralTasks.title = params.title;
        };
        if(params.number_of_referrals !== undefined) {
            referralTasks.number_of_referrals = params.number_of_referrals;
        };
        if(params.reward !== undefined) {
            referralTasks.reward = params.reward;
        };
        if(params.created_at !== undefined) {
            referralTasks.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            referralTasks.updated_at = params.updated_at;
        };

        await this.referralTasksModel.update(referralTasks);
        return referralTasks;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let referralTasks = await this.referralTasksModel.get(seqNo);
        if(!referralTasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.referralTasksModel.delete(referralTasks);
        return referralTasks;
    }

}