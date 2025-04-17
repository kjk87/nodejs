import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import moment = require("moment-timezone");
import { TetherRankingModel } from "../models/tether_ranking";
import { TetherRankingJoin } from "../entities/tether_ranking";


export interface TetherRankingListFilter extends ListFilter {
    id?: number;
    userKey?: number;
}

@Service()
export class TetherRankingService extends CoreService {

    @Inject(()=> TetherRankingModel)
    private tetherRankingModel: TetherRankingModel;

    constructor() {
        super();
    }


    public async ranking(req: Request, res: Response) {
        let filter:TetherRankingListFilter = {}
        filter.joinColumn = [
            {
                joinTable: 'memberTotal'
            }
        ]
        let paging : IPaging = { page: 1, limit: 100 }
        let order: IOrder[] = [
            {
                column: 'tether',
                dir: 'DESC'
           }
        ]

        return (await this.tetherRankingModel.list(filter, order, paging, TetherRankingJoin)).list;
    }

}