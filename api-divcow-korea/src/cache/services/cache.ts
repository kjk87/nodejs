import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { CacheModel } from "../models/cache";
import { IsNotEmpty } from "../../common/services/decorators";
import { Cache } from "../entities/cache";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class CacheCreateParams {
    public key?: string;
    public value?: string;
    public expiration?: number;
}

export class CacheUpdateParams {
    public key?: string;
    public value?: string;
    public expiration?: number;
}

export interface CacheListFilter extends ListFilter {
    key?: string;
    value?: string;
    expiration?: number;
}

@Service()
export class CacheService extends CoreService {

    @Inject(()=> CacheModel)
    private cacheModel: CacheModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: CacheCreateParams) {
        let cache = new Cache();

        cache.key = params.key;
        cache.value = params.value;
        cache.expiration = params.expiration;

        await this.cacheModel.create(cache);
        return cache;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let cache = await this.cacheModel.get(seqNo);
        if(!cache) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return cache;
    }

    public async list(req: Request, res: Response, filter: CacheListFilter, order: IOrder[], paging: IPaging) {
        return await this.cacheModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: CacheUpdateParams) {
        let cache = await this.cacheModel.get(seqNo);
        if(!cache) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.key !== undefined) {
            cache.key = params.key;
        };
        if(params.value !== undefined) {
            cache.value = params.value;
        };
        if(params.expiration !== undefined) {
            cache.expiration = params.expiration;
        };

        await this.cacheModel.update(cache);
        return cache;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let cache = await this.cacheModel.get(seqNo);
        if(!cache) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.cacheModel.delete(cache);
        return cache;
    }

}