import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { TASKS_TYPE } from "../../common/services/type";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { TelegramUserTasksModel } from "../../telegram/models/telegram_user_tasks";
import { TelegramUserTasks } from "../../telegram/entities/telegram_user_tasks";
import { now } from "../../common/services/util";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";

@Service()
export class OfferWallService extends CoreService {

    constructor() {
        super();
    }

}