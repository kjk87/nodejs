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
import { Redis } from "../../common/services/redis";
import { GamesModel } from "../../games/models/games";
import { PrizeRankingModel } from "../models/prize_ranking";
import { PrizeRankingJoin } from "../entities/prize_ranking";


export interface PrizeRankingListFilter extends ListFilter {
    id?: number;
    userKey?: number;
}

@Service()
export class PrizeRankingService extends CoreService {

    @Inject(()=> PrizeRankingModel)
    private prizeRankingModel: PrizeRankingModel;


    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    constructor() {
        super();
    }


    public async ranking(req: Request, res: Response) {
        let filter:PrizeRankingListFilter = {}
        filter.joinColumn = [
            {
                joinTable: 'memberTotal'
            }
        ]
        let paging : IPaging = { page: 1, limit: 100 }
        let order: IOrder[] = [
            {
                column: 'prize',
                dir: 'DESC'
           }
        ]

        return (await this.prizeRankingModel.list(filter, order, paging, PrizeRankingJoin)).list;
    }

}