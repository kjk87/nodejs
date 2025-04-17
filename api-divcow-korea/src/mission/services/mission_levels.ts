import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { MissionLevelsModel } from "../models/mission_levels";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { MissionLevels } from "../entities/mission_levels";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { EntityManager } from "typeorm";
import { TelegramUsersModel } from "../../telegram/models/telegram_users";
import { TelegramUserMissionsModel } from "../../telegram/models/telegram_user_missions";
import { TelegramUserMissions } from "../../telegram/entities/telegram_user_missions";
import { now } from "../../common/services/util";
import { MissionsModel } from "../../missions/models/missions";
import { Missions } from "../../missions/entities/missions";

export class MissionLevelsCreateParams {
    public id?: number;
    public mission_id?: number;
    public level?: number;
    public cost?: number;
    public production_per_hour?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class MissionLevelsUpdateParams {
    public id?: number;
    public mission_id?: number;
    public level?: number;
    public cost?: number;
    public production_per_hour?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface MissionLevelsListFilter extends ListFilter {
    id?: number;
    mission_id?: number;
    level?: number;
    cost?: number;
    production_per_hour?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class MissionLevelsService extends CoreService {

    @Inject(()=> MissionLevelsModel)
    private missionLevelsModel: MissionLevelsModel;

    @Inject(()=> MissionsModel)
    private missionsModel: MissionsModel;

    @Inject(()=> TelegramUsersModel)
    private telegramUsersModel: TelegramUsersModel;

    @Inject(()=> TelegramUserMissionsModel)
    private telegramUserMissionsModel: TelegramUserMissionsModel;

    constructor() {
        super();
    }

    @Transaction()
    public async missionLevelsStore(req: Request, res: Response, missionLevelId: number, user: TelegramUsers, manager?: EntityManager){
        let missionLevels: MissionLevels = await this.missionLevelsModel.get(missionLevelId, undefined, undefined, manager);
        user = await this.telegramUsersModel.get(user.id, undefined, undefined, manager);
        if(user.balance < missionLevels.cost){
            res.status(400);
            return {success: false, message:"Insufficient balance"};
        }

        let telegramUserMissions = new TelegramUserMissions();
        telegramUserMissions.telegram_user_id = user.id;
        telegramUserMissions.mission_level_id = missionLevels.id;
        telegramUserMissions.level = missionLevels.level;
        telegramUserMissions.created_at = now();
        telegramUserMissions.updated_at = now();
        await this.telegramUserMissionsModel.create(telegramUserMissions, undefined, manager);
        
        user.production_per_hour += missionLevels.production_per_hour;
        user.balance -= missionLevels.cost;
        await this.telegramUsersModel.update(user, undefined, manager);

        let missions: Missions = await this.missionsModel.get(missionLevels.mission_id);
        let filter: MissionLevelsListFilter = {};
        filter.mission_id = missionLevels.mission_id;
        filter.level = missionLevels.level+1;
        let nextMissionLevels: MissionLevels = await this.missionLevelsModel.getByFilter(filter);

        return {
                message: `Mission ${missions.name} upgraded ${missionLevels.level} level`,
                next_level: nextMissionLevels,
                user: user
            };

    }

    public async create(req: Request, res: Response, params: MissionLevelsCreateParams) {
        let missionLevels = new MissionLevels();

        missionLevels.id = params.id;
        missionLevels.mission_id = params.mission_id;
        missionLevels.level = params.level;
        missionLevels.cost = params.cost;
        missionLevels.production_per_hour = params.production_per_hour;
        missionLevels.created_at = params.created_at;
        missionLevels.updated_at = params.updated_at;

        await this.missionLevelsModel.create(missionLevels);
        return missionLevels;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let missionLevels = await this.missionLevelsModel.get(seqNo);
        if(!missionLevels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return missionLevels;
    }

    public async list(req: Request, res: Response, filter: MissionLevelsListFilter, order: IOrder[], paging: IPaging) {
        return await this.missionLevelsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: MissionLevelsUpdateParams) {
        let missionLevels = await this.missionLevelsModel.get(seqNo);
        if(!missionLevels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            missionLevels.id = params.id;
        };
        if(params.mission_id !== undefined) {
            missionLevels.mission_id = params.mission_id;
        };
        if(params.level !== undefined) {
            missionLevels.level = params.level;
        };
        if(params.cost !== undefined) {
            missionLevels.cost = params.cost;
        };
        if(params.production_per_hour !== undefined) {
            missionLevels.production_per_hour = params.production_per_hour;
        };
        if(params.created_at !== undefined) {
            missionLevels.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            missionLevels.updated_at = params.updated_at;
        };

        await this.missionLevelsModel.update(missionLevels);
        return missionLevels;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let missionLevels = await this.missionLevelsModel.get(seqNo);
        if(!missionLevels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.missionLevelsModel.delete(missionLevels);
        return missionLevels;
    }

}