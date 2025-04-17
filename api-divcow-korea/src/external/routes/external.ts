import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { MissionsService } from "../../missions/services/missions";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import { ReferralTasksService } from "../../referral/services/referral_tasks";
import { TasksService } from "../../tasks/services/tasks";
import { DailyTasksService } from "../../daily/services/daily_tasks";
import { MissionLevelsService } from "../../mission/services/mission_levels";
import { CoreError } from "../../common/core/CoreError";
import { E_ACCESS_DENY } from "../../common/services/errorType";
import { returnForm } from "../../common/services/util";

@JsonController('/external')
export class ExternalController extends CoreController {

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    constructor() {
        super();
    }


    @Post('/pointSwap')
    public async pointSwap(@Req() req: Request, @Res() res: Response, @BodyParam('telegram_id') telegram_id: number, @BodyParam('amount') amount: number) {

        let apiKey = req.headers.api_key;
        if(process.env.EXTERNAL_API_KEY != apiKey){
            throw new CoreError(E_ACCESS_DENY, 'invaild api key');
        }

        return returnForm(await this.telegramUsersService.pointSwap(req, res, telegram_id, amount));
    }

}