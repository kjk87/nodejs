import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { PasswordResetTokensModel } from "../models/password_reset_tokens";
import { IsNotEmpty } from "../../common/services/decorators";
import { PasswordResetTokens } from "../entities/password_reset_tokens";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class PasswordResetTokensCreateParams {
    public email?: string;
    public token?: string;
    public created_at?: string;
}

export class PasswordResetTokensUpdateParams {
    public email?: string;
    public token?: string;
    public created_at?: string;
}

export interface PasswordResetTokensListFilter extends ListFilter {
    email?: string;
    token?: string;
    created_at?: string;
}

@Service()
export class PasswordResetTokensService extends CoreService {

    @Inject(()=> PasswordResetTokensModel)
    private passwordResetTokensModel: PasswordResetTokensModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: PasswordResetTokensCreateParams) {
        let passwordResetTokens = new PasswordResetTokens();

        passwordResetTokens.email = params.email;
        passwordResetTokens.token = params.token;
        passwordResetTokens.created_at = params.created_at;

        await this.passwordResetTokensModel.create(passwordResetTokens);
        return passwordResetTokens;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let passwordResetTokens = await this.passwordResetTokensModel.get(seqNo);
        if(!passwordResetTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return passwordResetTokens;
    }

    public async list(req: Request, res: Response, filter: PasswordResetTokensListFilter, order: IOrder[], paging: IPaging) {
        return await this.passwordResetTokensModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: PasswordResetTokensUpdateParams) {
        let passwordResetTokens = await this.passwordResetTokensModel.get(seqNo);
        if(!passwordResetTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.email !== undefined) {
            passwordResetTokens.email = params.email;
        };
        if(params.token !== undefined) {
            passwordResetTokens.token = params.token;
        };
        if(params.created_at !== undefined) {
            passwordResetTokens.created_at = params.created_at;
        };

        await this.passwordResetTokensModel.update(passwordResetTokens);
        return passwordResetTokens;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let passwordResetTokens = await this.passwordResetTokensModel.get(seqNo);
        if(!passwordResetTokens) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.passwordResetTokensModel.delete(passwordResetTokens);
        return passwordResetTokens;
    }

}