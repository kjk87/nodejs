import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { MissionsModel } from "../models/missions";
import { IsNotEmpty } from "../../common/services/decorators";
import { Missions } from "../entities/missions";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { MissionLevelsModel } from "../../mission/models/mission_levels";

export class MissionsCreateParams {
    public id?: number;
    public name?: string;
    public mission_type_id?: number;
    public image?: string;
    public required_user_level?: number;
    public required_friends_invitation?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class MissionsUpdateParams {
    public id?: number;
    public name?: string;
    public mission_type_id?: number;
    public image?: string;
    public required_user_level?: number;
    public required_friends_invitation?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface MissionsListFilter extends ListFilter {
    id?: number;
    name?: string;
    mission_type_id?: number;
    image?: string;
    required_user_level?: number;
    required_friends_invitation?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class MissionsService extends CoreService {

    @Inject(()=> MissionsModel)
    private missionsModel: MissionsModel;

    @Inject(()=> MissionLevelsModel)
    private missionLevelsModel: MissionLevelsModel;

    constructor() {
        super();
    }

    public async missions(req: Request, res: Response, type: number, user: TelegramUsers){
        let missionsList = (await this.missionsModel.all({mission_type : type})).list;

        for(let missions of missionsList){
            missions.next_level = await this.missionLevelsModel.getNextLevel(missions.id, user.id);
            missions.production_per_hour = await this.missionLevelsModel.getSumProductionPerHour(missions.id, user.id);
        }

        return missionsList;
    }

    public async create(req: Request, res: Response, params: MissionsCreateParams) {
        let missions = new Missions();

        missions.id = params.id;
        missions.name = params.name;
        missions.mission_type_id = params.mission_type_id;
        missions.image = params.image;
        missions.required_user_level = params.required_user_level;
        missions.required_friends_invitation = params.required_friends_invitation;
        missions.created_at = params.created_at;
        missions.updated_at = params.updated_at;

        await this.missionsModel.create(missions);
        return missions;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let missions = await this.missionsModel.get(seqNo);
        if(!missions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return missions;
    }

    public async list(req: Request, res: Response, filter: MissionsListFilter, order: IOrder[], paging: IPaging) {
        return await this.missionsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: MissionsUpdateParams) {
        let missions = await this.missionsModel.get(seqNo);
        if(!missions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            missions.id = params.id;
        };
        if(params.name !== undefined) {
            missions.name = params.name;
        };
        if(params.mission_type_id !== undefined) {
            missions.mission_type_id = params.mission_type_id;
        };
        if(params.image !== undefined) {
            missions.image = params.image;
        };
        if(params.required_user_level !== undefined) {
            missions.required_user_level = params.required_user_level;
        };
        if(params.required_friends_invitation !== undefined) {
            missions.required_friends_invitation = params.required_friends_invitation;
        };
        if(params.created_at !== undefined) {
            missions.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            missions.updated_at = params.updated_at;
        };

        await this.missionsModel.update(missions);
        return missions;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let missions = await this.missionsModel.get(seqNo);
        if(!missions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.missionsModel.delete(missions);
        return missions;
    }

}