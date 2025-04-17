import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { PopupsModel } from "../models/popups";
import { IsNotEmpty } from "../../common/services/decorators";
import { Popups } from "../entities/popups";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

export class PopupsCreateParams {
    public id?: number;
    public title?: string;
    public text?: string;
    public image?: string;
    public button_text?: string;
    public button_link?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class PopupsUpdateParams {
    public id?: number;
    public title?: string;
    public text?: string;
    public image?: string;
    public button_text?: string;
    public button_link?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface PopupsListFilter extends ListFilter {
    id?: number;
    title?: string;
    text?: string;
    image?: string;
    button_text?: string;
    button_link?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class PopupsService extends CoreService {

    @Inject(()=> PopupsModel)
    private popupsModel: PopupsModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, params: PopupsCreateParams) {
        let popups = new Popups();

        popups.id = params.id;
        popups.title = params.title;
        popups.text = params.text;
        popups.image = params.image;
        popups.button_text = params.button_text;
        popups.button_link = params.button_link;
        popups.created_at = params.created_at;
        popups.updated_at = params.updated_at;

        await this.popupsModel.create(popups);
        return popups;
    }

    public async get(req: Request, res: Response) {
        
        let result: any = {};
        let popups = await this.popupsModel.all();

        let length = popups.list.length;
        
        if(length > 0) {
            let ran = Math.floor(Math.random()*length);

            result = popups.list[ran];
        }
        
        return result;
    }

    public async list(req: Request, res: Response, filter: PopupsListFilter, order: IOrder[], paging: IPaging) {
        return await this.popupsModel.list(filter, order, paging);
    }

    public async update(req: Request, res: Response, seqNo: number, params: PopupsUpdateParams) {
        let popups = await this.popupsModel.get(seqNo);
        if(!popups) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found')
        }

        if(params.id !== undefined) {
            popups.id = params.id;
        };
        if(params.title !== undefined) {
            popups.title = params.title;
        };
        if(params.text !== undefined) {
            popups.text = params.text;
        };
        if(params.image !== undefined) {
            popups.image = params.image;
        };
        if(params.button_text !== undefined) {
            popups.button_text = params.button_text;
        };
        if(params.button_link !== undefined) {
            popups.button_link = params.button_link;
        };
        if(params.created_at !== undefined) {
            popups.created_at = params.created_at;
        };
        if(params.updated_at !== undefined) {
            popups.updated_at = params.updated_at;
        };

        await this.popupsModel.update(popups);
        return popups;
    }

    public async delete(req: Request, res: Response, seqNo: number) {
        let popups = await this.popupsModel.get(seqNo);
        if(!popups) {
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }

        await this.popupsModel.delete(popups);
        return popups;
    }

}