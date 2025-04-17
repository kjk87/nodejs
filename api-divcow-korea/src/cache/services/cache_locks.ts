import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { CacheLocksModel } from "../models/cache_locks";
import { IsNotEmpty } from "../../common/services/decorators";
import { CacheLocks } from "../entities/cache_locks";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class CacheLocksCreateParams {
    public key?: string;
    public owner?: string;
    public expiration?: number;
}

export class CacheLocksUpdateParams {
    public key?: string;
    public owner?: string;
    public expiration?: number;
}

export interface CacheLocksListFilter extends ListFilter {
    key?: string;
    owner?: string;
    expiration?: number;
}

@Service()
export class CacheLocksService extends CoreService {

    @Inject(()=> CacheLocksModel)
    private cacheLocksModel: CacheLocksModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: CacheLocksCreateParams) {
        let cacheLocks = new CacheLocks();

        cacheLocks.key = params.key;
        cacheLocks.owner = params.owner;
        cacheLocks.expiration = params.expiration;

        await this.cacheLocksModel.create(cacheLocks);
        return cacheLocks;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let cacheLocks = await this.cacheLocksModel.get(seqNo);
        if(!cacheLocks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return cacheLocks;
    }

    public async list(req: Request, res: Response, filter: CacheLocksListFilter, order: IOrder[], paging: IPaging) {
        return await this.cacheLocksModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: CacheLocksUpdateParams) {
        let cacheLocks = await this.cacheLocksModel.get(seqNo);
        if(!cacheLocks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.key !== undefined) {
            cacheLocks.key = params.key;
        };
        if(params.owner !== undefined) {
            cacheLocks.owner = params.owner;
        };
        if(params.expiration !== undefined) {
            cacheLocks.expiration = params.expiration;
        };

        await this.cacheLocksModel.update(cacheLocks);
        return cacheLocks;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let cacheLocks = await this.cacheLocksModel.get(seqNo);
        if(!cacheLocks) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.cacheLocksModel.delete(cacheLocks);
        return cacheLocks;
    }

}