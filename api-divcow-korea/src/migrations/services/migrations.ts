import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { MigrationsModel } from "../models/migrations";
import { IsNotEmpty } from "../../common/services/decorators";
import { Migrations } from "../entities/migrations";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class MigrationsCreateParams {
    public id?: number;
    public migration?: string;
    public batch?: number;
}

export class MigrationsUpdateParams {
    public id?: number;
    public migration?: string;
    public batch?: number;
}

export interface MigrationsListFilter extends ListFilter {
    id?: number;
    migration?: string;
    batch?: number;
}

@Service()
export class MigrationsService extends CoreService {

    @Inject(()=> MigrationsModel)
    private migrationsModel: MigrationsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: MigrationsCreateParams) {
        let migrations = new Migrations();

        migrations.id = params.id;
        migrations.migration = params.migration;
        migrations.batch = params.batch;

        await this.migrationsModel.create(migrations);
        return migrations;
    }

    public async get(req: Request, res: Response, seqNo: number) {
        let migrations = await this.migrationsModel.get(seqNo);
        if(!migrations) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }
        return migrations;
    }

    public async list(req: Request, res: Response, filter: MigrationsListFilter, order: IOrder[], paging: IPaging) {
        return await this.migrationsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: MigrationsUpdateParams) {
        let migrations = await this.migrationsModel.get(seqNo);
        if(!migrations) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            migrations.id = params.id;
        };
        if(params.migration !== undefined) {
            migrations.migration = params.migration;
        };
        if(params.batch !== undefined) {
            migrations.batch = params.batch;
        };

        await this.migrationsModel.update(migrations);
        return migrations;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let migrations = await this.migrationsModel.get(seqNo);
        if(!migrations) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.migrationsModel.delete(migrations);
        return migrations;
    }

}