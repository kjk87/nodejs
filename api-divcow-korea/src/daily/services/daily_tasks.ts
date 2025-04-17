import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { DailyTasksModel } from "../models/daily_tasks";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { DailyTasks } from "../entities/daily_tasks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import { TelegramUserDailyTasksModel } from "../../telegram/models/telegram_user_daily_tasks";
import { now } from "../../common/services/util";
import { TelegramUserDailyTasks } from "../../telegram/entities/telegram_user_daily_tasks";
import { MemberA } from "../../member/entities/member_a";
import { MemberDailyTasksModel } from "../../member/models/member_daily_tasks";
import { MemberDailyTasks } from "../../member/entities/member_daily_tasks";
import { MemberService } from "../../member/services/member";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";
import moment = require("moment-timezone");

export class DailyTasksCreateParams {
    public id?: number;
    public name?: string;
    public description?: string;
    public required_login_streak?: number;
    public reward_coins?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class DailyTasksUpdateParams {
    public id?: number;
    public name?: string;
    public description?: string;
    public required_login_streak?: number;
    public reward_coins?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface DailyTasksListFilter extends ListFilter {
    id?: number;
    name?: string;
    description?: string;
    required_login_streak?: number;
    reward_coins?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class DailyTasksService extends CoreService {

    @Inject(()=> DailyTasksModel)
    private dailyTasksModel: DailyTasksModel;

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> TelegramUserDailyTasksModel)
    private telegramUserDailyTasksModel: TelegramUserDailyTasksModel;

    @Inject(()=> MemberDailyTasksModel)
    private memberDailyTasksModel: MemberDailyTasksModel;
    
    @Inject(()=> MemberService)
    private memberService: MemberService;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: DailyTasksCreateParams) {
        let dailyTasks = new DailyTasks();

        dailyTasks.id = params.id;
        dailyTasks.name = params.name;
        dailyTasks.description = params.description;
        dailyTasks.required_login_streak = params.required_login_streak;
        dailyTasks.reward_coins = params.reward_coins;
        dailyTasks.created_at = params.created_at;
        dailyTasks.updated_at = params.updated_at;

        await this.dailyTasksModel.create(dailyTasks);
        return dailyTasks;
    }


    public async dailyTasks(req: Request, res: Response, user: TelegramUsers) {
        
        return await this.dailyTasksModel.dailyTasks(user.login_streak, user.id);
    }
    
    public async appDailyTasks(req: Request, res: Response, member: MemberA) {
        
        return await this.dailyTasksModel.appDailyTasks(member.loginStreak, member.userKey);
    }

    @Transaction()
    public async claimDailyTaskReward(req: Request, res: Response, user: TelegramUsers, manager?: EntityManager) {

        let balance = user.balance;
        let task = await this.dailyTasksModel.all({required_login_streak: user.login_streak}, undefined, undefined, manager);

        if(task.list.length > 0) {

            for(let dailyTasks of task.list) {

                
                let telegramUserDailyTasks = await this.telegramUserDailyTasksModel.getByFilter({telegram_user_id: user.id, daily_task_id: dailyTasks.id}, undefined, undefined, manager);
                if(telegramUserDailyTasks) {
                    
                    telegramUserDailyTasks.completed = true;
                    telegramUserDailyTasks.updated_at = now();
                    await this.telegramUserDailyTasksModel.update(telegramUserDailyTasks, undefined, manager);

                }else{

                    telegramUserDailyTasks = new TelegramUserDailyTasks();
                    telegramUserDailyTasks.telegram_user_id = user.id;
                    telegramUserDailyTasks.daily_task_id = dailyTasks.id;
                    telegramUserDailyTasks.completed = true;
                    telegramUserDailyTasks.created_at = now();
                    telegramUserDailyTasks.updated_at = now();
                    await this.telegramUserDailyTasksModel.create(telegramUserDailyTasks, undefined, manager);
                    
                }

                let pointHistory = new PointHistoryCreateParams();
                pointHistory.telegram_user_id = user.id;
                pointHistory.type = 'charge';
                pointHistory.subject = 'Attendance Reward';
                pointHistory.comment = 'Attendance Reward';
                pointHistory.amount = dailyTasks.reward_coins;
                await this.pointHistoryService.create(pointHistory, manager);

                await this.telegramUsersService.updateBalance(user, dailyTasks.reward_coins, manager);
                balance += dailyTasks.reward_coins;

            }

            return {
                success: true,
                message: 'Daily task reward claimed successfully',
                balance: balance
            }
        }

        res.status(400);
        res.json({
            success: false,
            message: 'Unable to claim daily task reward. Task may not be available or already completed for today.'
        })
        return false;

    }

    @Transaction()
    public async appClaimDailyTaskReward(req: Request, res: Response, member: MemberA, manager?: EntityManager) {

        let task = await this.dailyTasksModel.all({required_login_streak: member.loginStreak}, undefined, undefined, manager);

        if(task.list.length > 0) {

            for(let dailyTasks of task.list) {

                
                let memberDailyTasks = await this.memberDailyTasksModel.getByFilter({user_key: member.userKey, daily_task_id: dailyTasks.id}, undefined, undefined, manager);
                if(memberDailyTasks) {
                    
                    if(memberDailyTasks.updatedAt >= moment().format('YYYY-MM-DD 00:00:00')) {
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }

                    memberDailyTasks.completed = true;
                    memberDailyTasks.updatedAt = now();
                    await this.memberDailyTasksModel.update(memberDailyTasks, undefined, manager);

                }else{

                    memberDailyTasks = new MemberDailyTasks();
                    memberDailyTasks.userKey = member.userKey;
                    memberDailyTasks.dailyTaskId = dailyTasks.id;
                    memberDailyTasks.completed = true;
                    memberDailyTasks.createdAt = now();
                    memberDailyTasks.updatedAt = now();
                    await this.memberDailyTasksModel.create(memberDailyTasks, undefined, manager);
                    
                }

                let historyPoint = new HistoryPoint();
                historyPoint.userKey = member.userKey;
                historyPoint.type = 'charge';
                historyPoint.category = 'attendance';
                historyPoint.point = dailyTasks.reward_coins;
                historyPoint.subject = 'attendance';
                historyPoint.comment = 'attendance';
                historyPoint.regDatetime = now();
                await this.memberService.updatePoint(historyPoint, member, manager);

            }

            return {message: 'SUCCESS'};
        }

        throw new CoreError(ErrorType.E_ALREADY_EXIST);

    }
}