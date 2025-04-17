import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { BotUserModel } from "../models/bot_user";
import { BotUser } from "../entities/bot_user";
import { now } from "../../common/services/util";

export interface BotUserListFilter extends ListFilter {
    telegram_id?: number;
}

@Service()
export class BotUserService extends CoreService {

    @Inject(()=> BotUserModel)
    private botUserModel: BotUserModel;

    constructor() {
        super();
    }

    public async create(req: Request, res: Response, telegram_id:number) {
        let botUser = new BotUser();

        botUser.telegram_id = telegram_id;
        await this.botUserModel.create(botUser);
        return botUser;
    }
}