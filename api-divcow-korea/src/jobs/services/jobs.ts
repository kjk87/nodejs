import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { JobsModel } from "../models/jobs";
import { IsNotEmpty } from "../../common/services/decorators";
import { Jobs } from "../entities/jobs";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class JobsCreateParams {
    public id?: number;
    public queue?: string;
    public payload?: string;
    public attempts?: string;
    public reserved_at?: number;
    public available_at?: number;
    public created_at?: number;
}

export class JobsUpdateParams {
    public id?: number;
    public queue?: string;
    public payload?: string;
    public attempts?: string;
    public reserved_at?: number;
    public available_at?: number;
    public created_at?: number;
}

export interface JobsListFilter extends ListFilter {
    id?: number;
    queue?: string;
    payload?: string;
    attempts?: string;
    reserved_at?: number;
    available_at?: number;
    created_at?: number;
}

@Service()
export class JobsService extends CoreService {

    @Inject(()=> JobsModel)
    private jobsModel: JobsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: JobsCreateParams) {
        let jobs = new Jobs();

        jobs.id = params.id;
        jobs.queue = params.queue;
        jobs.payload = params.payload;
        jobs.attempts = params.attempts;
        jobs.reserved_at = params.reserved_at;
        jobs.available_at = params.available_at;
        jobs.created_at = params.created_at;

        await this.jobsModel.create(jobs);
        return jobs;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let jobs = await this.jobsModel.get(seqNo);
        if(!jobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return jobs;
    }

    public async list(req: Request, res: Response, filter: JobsListFilter, order: IOrder[], paging: IPaging) {
        return await this.jobsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: JobsUpdateParams) {
        let jobs = await this.jobsModel.get(seqNo);
        if(!jobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            jobs.id = params.id;
        };
        if(params.queue !== undefined) {
            jobs.queue = params.queue;
        };
        if(params.payload !== undefined) {
            jobs.payload = params.payload;
        };
        if(params.attempts !== undefined) {
            jobs.attempts = params.attempts;
        };
        if(params.reserved_at !== undefined) {
            jobs.reserved_at = params.reserved_at;
        };
        if(params.available_at !== undefined) {
            jobs.available_at = params.available_at;
        };
        if(params.created_at !== undefined) {
            jobs.created_at = params.created_at;
        };

        await this.jobsModel.update(jobs);
        return jobs;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let jobs = await this.jobsModel.get(seqNo);
        if(!jobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.jobsModel.delete(jobs);
        return jobs;
    }

}