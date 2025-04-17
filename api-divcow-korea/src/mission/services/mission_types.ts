import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { MissionTypesModel } from "../models/mission_types";
import { IsNotEmpty } from "../../common/services/decorators";
import { MissionTypes } from "../entities/mission_types";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class MissionTypesCreateParams {
    public id?: number;
    public name?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class MissionTypesUpdateParams {
    public id?: number;
    public name?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface MissionTypesListFilter extends ListFilter {
    id?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class MissionTypesService extends CoreService {

    @Inject(()=> MissionTypesModel)
    private missionTypesModel: MissionTypesModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: MissionTypesCreateParams) {
        let missionTypes = new MissionTypes();

        missionTypes.id = params.id;
        missionTypes.name = params.name;
        missionTypes.created_at = params.created_at;
        missionTypes.updated_at = params.updated_at;

        await this.missionTypesModel.create(missionTypes);
        return missionTypes;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let missionTypes = await this.missionTypesModel.get(seqNo);
        if(!missionTypes) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return missionTypes;
    }

    public async list(req: Request, res: Response, filter: MissionTypesListFilter, order: IOrder[], paging: IPaging) {
        return await this.missionTypesModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: MissionTypesUpdateParams) {
        let missionTypes = await this.missionTypesModel.get(seqNo);
        if(!missionTypes) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            missionTypes.id = params.id;
        };
        if(params.name !== undefined) {
            missionTypes.name = params.name;
        };
        if(params.created_at !== undefined) {
            missionTypes.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            missionTypes.updated_at = params.updated_at;
        };

        await this.missionTypesModel.update(missionTypes);
        return missionTypes;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let missionTypes = await this.missionTypesModel.get(seqNo);
        if(!missionTypes) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.missionTypesModel.delete(missionTypes);
        return missionTypes;
    }

}