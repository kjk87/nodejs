import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { PersonalAccessTokensModel } from "../models/personal_access_tokens";
import { IsNotEmpty } from "../../common/services/decorators";
import { PersonalAccessTokens } from "../entities/personal_access_tokens";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class PersonalAccessTokensCreateParams {
    public id?: number;
    public tokenable_type?: string;
    public tokenable_id?: number;
    public name?: string;
    public token?: string;
    public abilities?: string;
    public last_used_at?: string;
    public expires_at?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class PersonalAccessTokensUpdateParams {
    public id?: number;
    public tokenable_type?: string;
    public tokenable_id?: number;
    public name?: string;
    public token?: string;
    public abilities?: string;
    public last_used_at?: string;
    public expires_at?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface PersonalAccessTokensListFilter extends ListFilter {
    id?: number;
    tokenable_type?: string;
    tokenable_id?: number;
    name?: string;
    token?: string;
    abilities?: string;
    last_used_at?: string;
    expires_at?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class PersonalAccessTokensService extends CoreService {

    @Inject(()=> PersonalAccessTokensModel)
    private personalAccessTokensModel: PersonalAccessTokensModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: PersonalAccessTokensCreateParams) {
        let personalAccessTokens = new PersonalAccessTokens();

        personalAccessTokens.id = params.id;
        personalAccessTokens.tokenable_type = params.tokenable_type;
        personalAccessTokens.tokenable_id = params.tokenable_id;
        personalAccessTokens.name = params.name;
        personalAccessTokens.token = params.token;
        personalAccessTokens.abilities = params.abilities;
        personalAccessTokens.last_used_at = params.last_used_at;
        personalAccessTokens.expires_at = params.expires_at;
        personalAccessTokens.created_at = params.created_at;
        personalAccessTokens.updated_at = params.updated_at;

        await this.personalAccessTokensModel.create(personalAccessTokens);
        return personalAccessTokens;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let personalAccessTokens = await this.personalAccessTokensModel.get(seqNo);
        if(!personalAccessTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return personalAccessTokens;
    }

    public async list(req: Request, res: Response, filter: PersonalAccessTokensListFilter, order: IOrder[], paging: IPaging) {
        return await this.personalAccessTokensModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: PersonalAccessTokensUpdateParams) {
        let personalAccessTokens = await this.personalAccessTokensModel.get(seqNo);
        if(!personalAccessTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            personalAccessTokens.id = params.id;
        };
        if(params.tokenable_type !== undefined) {
            personalAccessTokens.tokenable_type = params.tokenable_type;
        };
        if(params.tokenable_id !== undefined) {
            personalAccessTokens.tokenable_id = params.tokenable_id;
        };
        if(params.name !== undefined) {
            personalAccessTokens.name = params.name;
        };
        if(params.token !== undefined) {
            personalAccessTokens.token = params.token;
        };
        if(params.abilities !== undefined) {
            personalAccessTokens.abilities = params.abilities;
        };
        if(params.last_used_at !== undefined) {
            personalAccessTokens.last_used_at = params.last_used_at;
        };
        if(params.expires_at !== undefined) {
            personalAccessTokens.expires_at = params.expires_at;
        };
        if(params.created_at !== undefined) {
            personalAccessTokens.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            personalAccessTokens.updated_at = params.updated_at;
        };

        await this.personalAccessTokensModel.update(personalAccessTokens);
        return personalAccessTokens;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let personalAccessTokens = await this.personalAccessTokensModel.get(seqNo);
        if(!personalAccessTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.personalAccessTokensModel.delete(personalAccessTokens);
        return personalAccessTokens;
    }

}