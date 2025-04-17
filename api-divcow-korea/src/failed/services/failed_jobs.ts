import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { FailedJobsModel } from "../models/failed_jobs";
import { IsNotEmpty } from "../../common/services/decorators";
import { FailedJobs } from "../entities/failed_jobs";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class FailedJobsCreateParams {
    public id?: number;
    public uuid?: string;
    public connection?: string;
    public queue?: string;
    public payload?: string;
    public exception?: string;
    public failed_at?: string;
}

export class FailedJobsUpdateParams {
    public id?: number;
    public uuid?: string;
    public connection?: string;
    public queue?: string;
    public payload?: string;
    public exception?: string;
    public failed_at?: string;
}

export interface FailedJobsListFilter extends ListFilter {
    id?: number;
    uuid?: string;
    connection?: string;
    queue?: string;
    payload?: string;
    exception?: string;
    failed_at?: string;
}

@Service()
export class FailedJobsService extends CoreService {

    @Inject(()=> FailedJobsModel)
    private failedJobsModel: FailedJobsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: FailedJobsCreateParams) {
        let failedJobs = new FailedJobs();

        failedJobs.id = params.id;
        failedJobs.uuid = params.uuid;
        failedJobs.connection = params.connection;
        failedJobs.queue = params.queue;
        failedJobs.payload = params.payload;
        failedJobs.exception = params.exception;
        failedJobs.failed_at = params.failed_at;

        await this.failedJobsModel.create(failedJobs);
        return failedJobs;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let failedJobs = await this.failedJobsModel.get(seqNo);
        if(!failedJobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return failedJobs;
    }

    public async list(req: Request, res: Response, filter: FailedJobsListFilter, order: IOrder[], paging: IPaging) {
        return await this.failedJobsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: FailedJobsUpdateParams) {
        let failedJobs = await this.failedJobsModel.get(seqNo);
        if(!failedJobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            failedJobs.id = params.id;
        };
        if(params.uuid !== undefined) {
            failedJobs.uuid = params.uuid;
        };
        if(params.connection !== undefined) {
            failedJobs.connection = params.connection;
        };
        if(params.queue !== undefined) {
            failedJobs.queue = params.queue;
        };
        if(params.payload !== undefined) {
            failedJobs.payload = params.payload;
        };
        if(params.exception !== undefined) {
            failedJobs.exception = params.exception;
        };
        if(params.failed_at !== undefined) {
            failedJobs.failed_at = params.failed_at;
        };

        await this.failedJobsModel.update(failedJobs);
        return failedJobs;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let failedJobs = await this.failedJobsModel.get(seqNo);
        if(!failedJobs) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.failedJobsModel.delete(failedJobs);
        return failedJobs;
    }

}