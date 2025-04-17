import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { JobBatchesModel } from "../models/job_batches";
import { IsNotEmpty } from "../../common/services/decorators";
import { JobBatches } from "../entities/job_batches";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class JobBatchesCreateParams {
    public id?: string;
    public name?: string;
    public total_jobs?: number;
    public pending_jobs?: number;
    public failed_jobs?: number;
    public failed_job_ids?: string;
    public options?: string;
    public cancelled_at?: number;
    public created_at?: number;
    public finished_at?: number;
}

export class JobBatchesUpdateParams {
    public id?: string;
    public name?: string;
    public total_jobs?: number;
    public pending_jobs?: number;
    public failed_jobs?: number;
    public failed_job_ids?: string;
    public options?: string;
    public cancelled_at?: number;
    public created_at?: number;
    public finished_at?: number;
}

export interface JobBatchesListFilter extends ListFilter {
    id?: string;
    name?: string;
    total_jobs?: number;
    pending_jobs?: number;
    failed_jobs?: number;
    failed_job_ids?: string;
    options?: string;
    cancelled_at?: number;
    created_at?: number;
    finished_at?: number;
}

@Service()
export class JobBatchesService extends CoreService {

    @Inject(()=> JobBatchesModel)
    private jobBatchesModel: JobBatchesModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: JobBatchesCreateParams) {
        let jobBatches = new JobBatches();

        jobBatches.id = params.id;
        jobBatches.name = params.name;
        jobBatches.total_jobs = params.total_jobs;
        jobBatches.pending_jobs = params.pending_jobs;
        jobBatches.failed_jobs = params.failed_jobs;
        jobBatches.failed_job_ids = params.failed_job_ids;
        jobBatches.options = params.options;
        jobBatches.cancelled_at = params.cancelled_at;
        jobBatches.created_at = params.created_at;
        jobBatches.finished_at = params.finished_at;

        await this.jobBatchesModel.create(jobBatches);
        return jobBatches;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let jobBatches = await this.jobBatchesModel.get(seqNo);
        if(!jobBatches) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return jobBatches;
    }

    public async list(req: Request, res: Response, filter: JobBatchesListFilter, order: IOrder[], paging: IPaging) {
        return await this.jobBatchesModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: JobBatchesUpdateParams) {
        let jobBatches = await this.jobBatchesModel.get(seqNo);
        if(!jobBatches) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            jobBatches.id = params.id;
        };
        if(params.name !== undefined) {
            jobBatches.name = params.name;
        };
        if(params.total_jobs !== undefined) {
            jobBatches.total_jobs = params.total_jobs;
        };
        if(params.pending_jobs !== undefined) {
            jobBatches.pending_jobs = params.pending_jobs;
        };
        if(params.failed_jobs !== undefined) {
            jobBatches.failed_jobs = params.failed_jobs;
        };
        if(params.failed_job_ids !== undefined) {
            jobBatches.failed_job_ids = params.failed_job_ids;
        };
        if(params.options !== undefined) {
            jobBatches.options = params.options;
        };
        if(params.cancelled_at !== undefined) {
            jobBatches.cancelled_at = params.cancelled_at;
        };
        if(params.created_at !== undefined) {
            jobBatches.created_at = params.created_at;
        };
        if(params.finished_at !== undefined) {
            jobBatches.finished_at = params.finished_at;
        };

        await this.jobBatchesModel.update(jobBatches);
        return jobBatches;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let jobBatches = await this.jobBatchesModel.get(seqNo);
        if(!jobBatches) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.jobBatchesModel.delete(jobBatches);
        return jobBatches;
    }

}