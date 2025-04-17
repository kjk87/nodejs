import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { UsersModel } from "../models/users";
import { IsNotEmpty } from "../../common/services/decorators";
import { Users } from "../entities/users";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class UsersCreateParams {
    public id?: number;
    public name?: string;
    public email?: string;
    public email_verified_at?: string;
    public password?: string;
    public remember_token?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class UsersUpdateParams {
    public id?: number;
    public name?: string;
    public email?: string;
    public email_verified_at?: string;
    public password?: string;
    public remember_token?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface UsersListFilter extends ListFilter {
    id?: number;
    name?: string;
    email?: string;
    email_verified_at?: string;
    password?: string;
    remember_token?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class UsersService extends CoreService {

    @Inject(()=> UsersModel)
    private usersModel: UsersModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: UsersCreateParams) {
        let users = new Users();

        users.id = params.id;
        users.name = params.name;
        users.email = params.email;
        users.email_verified_at = params.email_verified_at;
        users.password = params.password;
        users.remember_token = params.remember_token;
        users.created_at = params.created_at;
        users.updated_at = params.updated_at;

        await this.usersModel.create(users);
        return users;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let users = await this.usersModel.get(seqNo);
        if(!users) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return users;
    }

    public async list(req: Request, res: Response, filter: UsersListFilter, order: IOrder[], paging: IPaging) {
        return await this.usersModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: UsersUpdateParams) {
        let users = await this.usersModel.get(seqNo);
        if(!users) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            users.id = params.id;
        };
        if(params.name !== undefined) {
            users.name = params.name;
        };
        if(params.email !== undefined) {
            users.email = params.email;
        };
        if(params.email_verified_at !== undefined) {
            users.email_verified_at = params.email_verified_at;
        };
        if(params.password !== undefined) {
            users.password = params.password;
        };
        if(params.remember_token !== undefined) {
            users.remember_token = params.remember_token;
        };
        if(params.created_at !== undefined) {
            users.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            users.updated_at = params.updated_at;
        };

        await this.usersModel.update(users);
        return users;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let users = await this.usersModel.get(seqNo);
        if(!users) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.usersModel.delete(users);
        return users;
    }

}