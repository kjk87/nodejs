import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TasksModel } from "../models/tasks";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { Tasks, TasksJoin } from "../entities/tasks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TASKS_TYPE } from "../../common/services/type";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { TelegramUserTasksModel } from "../../telegram/models/telegram_user_tasks";
import { TelegramUserTasks } from "../../telegram/entities/telegram_user_tasks";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";

export class TasksCreateParams {
    public id?: number;
    public name?: string;
    public description?: string;
    public image?: string;
    public reward_coins?: number;
    public type?: TASKS_TYPE;
    public action_name?: string;
    public link?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class TasksUpdateParams {
    public id?: number;
    public name?: string;
    public description?: string;
    public image?: string;
    public reward_coins?: number;
    public type?: TASKS_TYPE;
    public action_name?: string;
    public link?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface TasksListFilter extends ListFilter {
    id?: number;
    status?: string;
    name?: string;
    description?: string;
    image?: string;
    reward_coins?: number;
    type?: string;
    action_name?: string;
    link?: string;
    created_at?: string;
    updated_at?: string;
    telegram_user_id?: number;
}

@Service()
export class TasksService extends CoreService {

    @Inject(()=> TasksModel)
    private tasksModel: TasksModel;

    @Inject(()=> TelegramUserTasksModel)
    private telegramUserTasksModel: TelegramUserTasksModel;

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    constructor() {
        super();
    }

    public async tasks(req: Request, res: Response, user: TelegramUsers){
        let filter : TasksListFilter = {};
        filter.status = 'active'
        filter.joinColumn = [
            {
                joinTable: 'telegram_user_tasks',
                joinCondition : `telegram_user_tasks.telegram_user_id = ${user.id}`
            }
        ]
        let list = (await this.tasksModel.all(filter, undefined, TasksJoin)).list;
        for(let task of list){
            if(task.telegram_user_tasks){
                task.is_submitted = task.telegram_user_tasks.is_submitted;
                task.is_rewarded = task.telegram_user_tasks.is_rewarded;
                task.submitted_at = task.telegram_user_tasks.submitted_at;
            }else{
                task.is_submitted = false;
                task.is_rewarded = false;
                task.submitted_at = false;
            }
            
        }
        

        return list;
    }

    @Transaction()
    public async tasksStore(req: Request, res: Response, taskId: number, user: TelegramUsers, manager?: EntityManager){
        let userTask = await this.telegramUserTasksModel.getByFilter({task_id : taskId, telegram_user_id : user.id})
        if(userTask){
            res.status(400);
            return {success: false, message:"Task already submitted."};
        }

        let dateStr = now();

        let telegramUserTasks = new TelegramUserTasks();
        telegramUserTasks.telegram_user_id = user.id;
        telegramUserTasks.task_id = taskId;
        telegramUserTasks.is_submitted = true;
        telegramUserTasks.is_rewarded = false;
        telegramUserTasks.submitted_at = dateStr;
        telegramUserTasks.created_at = dateStr;
        telegramUserTasks.updated_at = dateStr;
        await this.telegramUserTasksModel.create(telegramUserTasks, undefined, manager);

        return {success: true, message:"Task submitted successfully. Waiting for approval."};

    }

    @Transaction()
    public async tasksClaim(req: Request, res: Response, taskId: number, user: TelegramUsers, manager?: EntityManager){
        let userTask = await this.telegramUserTasksModel.getByFilter({task_id : taskId, telegram_user_id : user.id})
        if(!userTask){
            res.status(404);
            return {success: false, message:"Task not found."};
        }

        if(userTask.is_rewarded){
            res.status(400);
            return {success: false, message:"Task already rewarded."};
        }

        let task: Tasks = await this.tasksModel.get(taskId);

        userTask.is_rewarded = true;

        let pointHistory = new PointHistoryCreateParams();
        pointHistory.telegram_user_id = user.id;
        pointHistory.type = 'charge';
        pointHistory.subject = 'Mission Reward';
        pointHistory.comment = 'Mission Reward';
        pointHistory.amount = task.reward_coins;
        await this.pointHistoryService.create(pointHistory, manager);

        await this.telegramUserTasksModel.update(userTask, undefined, manager);
        await this.telegramUsersService.updateBalance(user, task.reward_coins, manager);
        return {success: true, message:`You have successfully claimed ${task.reward_coins} from ${task.name}.`};

    }

    public async create(req: Request, res: Response, params: TasksCreateParams) {
        let tasks = new Tasks();

        tasks.id = params.id;
        tasks.name = params.name;
        tasks.description = params.description;
        tasks.image = params.image;
        tasks.reward_coins = params.reward_coins;
        tasks.type = params.type;
        tasks.action_name = params.action_name;
        tasks.link = params.link;
        tasks.created_at = params.created_at;
        tasks.updated_at = params.updated_at;

        await this.tasksModel.create(tasks);
        return tasks;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let tasks = await this.tasksModel.get(seqNo);
        if(!tasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return tasks;
    }

    public async list(req: Request, res: Response, filter: TasksListFilter, order: IOrder[], paging: IPaging) {
        return await this.tasksModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TasksUpdateParams) {
        let tasks = await this.tasksModel.get(seqNo);
        if(!tasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            tasks.id = params.id;
        };
        if(params.name !== undefined) {
            tasks.name = params.name;
        };
        if(params.description !== undefined) {
            tasks.description = params.description;
        };
        if(params.image !== undefined) {
            tasks.image = params.image;
        };
        if(params.reward_coins !== undefined) {
            tasks.reward_coins = params.reward_coins;
        };
        if(params.type !== undefined) {
            tasks.type = params.type;
        };
        if(params.action_name !== undefined) {
            tasks.action_name = params.action_name;
        };
        if(params.link !== undefined) {
            tasks.link = params.link;
        };
        if(params.created_at !== undefined) {
            tasks.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            tasks.updated_at = params.updated_at;
        };

        await this.tasksModel.update(tasks);
        return tasks;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let tasks = await this.tasksModel.get(seqNo);
        if(!tasks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.tasksModel.delete(tasks);
        return tasks;
    }

}