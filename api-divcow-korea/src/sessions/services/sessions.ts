import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { SessionsModel } from "../models/sessions";
import { IsNotEmpty } from "../../common/services/decorators";
import { Sessions } from "../entities/sessions";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class SessionsCreateParams {
    public id?: string;
    public user_id?: number;
    public ip_address?: string;
    public user_agent?: string;
    public payload?: string;
    public last_activity?: number;
}

export class SessionsUpdateParams {
    public id?: string;
    public user_id?: number;
    public ip_address?: string;
    public user_agent?: string;
    public payload?: string;
    public last_activity?: number;
}

export interface SessionsListFilter extends ListFilter {
    id?: string;
    user_id?: number;
    ip_address?: string;
    user_agent?: string;
    payload?: string;
    last_activity?: number;
}

@Service()
export class SessionsService extends CoreService {

    @Inject(()=> SessionsModel)
    private sessionsModel: SessionsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: SessionsCreateParams) {
        let sessions = new Sessions();

        sessions.id = params.id;
        sessions.user_id = params.user_id;
        sessions.ip_address = params.ip_address;
        sessions.user_agent = params.user_agent;
        sessions.payload = params.payload;
        sessions.last_activity = params.last_activity;

        await this.sessionsModel.create(sessions);
        return sessions;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let sessions = await this.sessionsModel.get(seqNo);
        if(!sessions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return sessions;
    }

    public async list(req: Request, res: Response, filter: SessionsListFilter, order: IOrder[], paging: IPaging) {
        return await this.sessionsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: SessionsUpdateParams) {
        let sessions = await this.sessionsModel.get(seqNo);
        if(!sessions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            sessions.id = params.id;
        };
        if(params.user_id !== undefined) {
            sessions.user_id = params.user_id;
        };
        if(params.ip_address !== undefined) {
            sessions.ip_address = params.ip_address;
        };
        if(params.user_agent !== undefined) {
            sessions.user_agent = params.user_agent;
        };
        if(params.payload !== undefined) {
            sessions.payload = params.payload;
        };
        if(params.last_activity !== undefined) {
            sessions.last_activity = params.last_activity;
        };

        await this.sessionsModel.update(sessions);
        return sessions;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let sessions = await this.sessionsModel.get(seqNo);
        if(!sessions) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.sessionsModel.delete(sessions);
        return sessions;
    }

}