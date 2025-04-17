import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TelegramUserMissionsModel } from "../models/telegram_user_missions";
import { IsNotEmpty } from "../../common/services/decorators";
import { TelegramUserMissions } from "../entities/telegram_user_missions";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class TelegramUserMissionsCreateParams {
    public id?: number;
    public telegram_user_id?: number;
    public mission_level_id?: number;
    public level?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class TelegramUserMissionsUpdateParams {
    public id?: number;
    public telegram_user_id?: number;
    public mission_level_id?: number;
    public level?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface TelegramUserMissionsListFilter extends ListFilter {
    id?: number;
    telegram_user_id?: number;
    mission_level_id?: number;
    level?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class TelegramUserMissionsService extends CoreService {

    @Inject(()=> TelegramUserMissionsModel)
    private telegramUserMissionsModel: TelegramUserMissionsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: TelegramUserMissionsCreateParams) {
        let telegramUserMissions = new TelegramUserMissions();

        telegramUserMissions.id = params.id;
        telegramUserMissions.telegram_user_id = params.telegram_user_id;
        telegramUserMissions.mission_level_id = params.mission_level_id;
        telegramUserMissions.level = params.level;
        telegramUserMissions.created_at = params.created_at;
        telegramUserMissions.updated_at = params.updated_at;

        await this.telegramUserMissionsModel.create(telegramUserMissions);
        return telegramUserMissions;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let telegramUserMissions = await this.telegramUserMissionsModel.get(seqNo);
        if(!telegramUserMissions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return telegramUserMissions;
    }

    public async list(req: Request, res: Response, filter: TelegramUserMissionsListFilter, order: IOrder[], paging: IPaging) {
        return await this.telegramUserMissionsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: TelegramUserMissionsUpdateParams) {
        let telegramUserMissions = await this.telegramUserMissionsModel.get(seqNo);
        if(!telegramUserMissions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            telegramUserMissions.id = params.id;
        };
        if(params.telegram_user_id !== undefined) {
            telegramUserMissions.telegram_user_id = params.telegram_user_id;
        };
        if(params.mission_level_id !== undefined) {
            telegramUserMissions.mission_level_id = params.mission_level_id;
        };
        if(params.level !== undefined) {
            telegramUserMissions.level = params.level;
        };
        if(params.created_at !== undefined) {
            telegramUserMissions.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            telegramUserMissions.updated_at = params.updated_at;
        };

        await this.telegramUserMissionsModel.update(telegramUserMissions);
        return telegramUserMissions;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let telegramUserMissions = await this.telegramUserMissionsModel.get(seqNo);
        if(!telegramUserMissions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.telegramUserMissionsModel.delete(telegramUserMissions);
        return telegramUserMissions;
    }

}