import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { LevelsModel } from "../models/levels";
import { IsNotEmpty } from "../../common/services/decorators";
import { Levels } from "../entities/levels";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class LevelsCreateParams {
    public id?: number;
    public level?: number;
    public name?: string;
    public from_balance?: number;
    public to_balance?: number;
    public created_at?: string;
    public updated_at?: string;
}

export class LevelsUpdateParams {
    public id?: number;
    public level?: number;
    public name?: string;
    public from_balance?: number;
    public to_balance?: number;
    public created_at?: string;
    public updated_at?: string;
}

export interface LevelsListFilter extends ListFilter {
    id?: number;
    level?: number;
    name?: string;
    from_balance?: number;
    to_balance?: number;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class LevelsService extends CoreService {

    @Inject(()=> LevelsModel)
    private levelsModel: LevelsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: LevelsCreateParams) {
        let levels = new Levels();

        levels.id = params.id;
        levels.level = params.level;
        levels.name = params.name;
        levels.from_balance = params.from_balance;
        levels.to_balance = params.to_balance;
        levels.created_at = params.created_at;
        levels.updated_at = params.updated_at;

        await this.levelsModel.create(levels);
        return levels;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let levels = await this.levelsModel.get(seqNo);
        if(!levels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return levels;
    }

    public async list(req: Request, res: Response, filter: LevelsListFilter, order: IOrder[], paging: IPaging) {
        return await this.levelsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: LevelsUpdateParams) {
        let levels = await this.levelsModel.get(seqNo);
        if(!levels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            levels.id = params.id;
        };
        if(params.level !== undefined) {
            levels.level = params.level;
        };
        if(params.name !== undefined) {
            levels.name = params.name;
        };
        if(params.from_balance !== undefined) {
            levels.from_balance = params.from_balance;
        };
        if(params.to_balance !== undefined) {
            levels.to_balance = params.to_balance;
        };
        if(params.created_at !== undefined) {
            levels.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            levels.updated_at = params.updated_at;
        };

        await this.levelsModel.update(levels);
        return levels;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let levels = await this.levelsModel.get(seqNo);
        if(!levels) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.levelsModel.delete(levels);
        return levels;
    }

}