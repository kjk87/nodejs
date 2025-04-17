import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { TelegramUsersModel } from "../models/telegram_users";
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { TelegramUsers } from "../entities/telegram_users";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { EntityManager } from "typeorm";
import { now } from "../../common/services/util";
import { DailyTasksModel } from "../../daily/models/daily_tasks";
import { TelegramUserDailyTasksModel } from "../models/telegram_user_daily_tasks";
import moment = require("moment-timezone");
import { CurrentUser } from "routing-controllers";
import { LevelsModel } from "../../levels/models/levels";
import { MissionTypesModel } from "../../mission/models/mission_types";
import { CONFIG } from "../../common/services/config";
import { CoinService } from "../../coin/services/coin";
import { SwapHistoryModel } from "../../swap/models/swap_history";
import { SwapHistory } from "../../swap/entities/swap_history";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";
import { TonHistoryCreateParams, TonHistoryService } from "../../ton/services/ton_history";
import { TetherHistoryCreateParams, TetherHistoryService } from "../../tether/services/tether_history";

export class TelegramUsersCreateParams {
    public id?: number;
    public telegram_id?: number;
    public first_name?: string;
    public last_name?: string;
    public username?: string;
    public ton_wallet?: string;
    public balance?: number;
    public earn_per_tap?: number;
    public available_energy?: number;
    public max_energy?: number;
    public multi_tap_level?: number;
    public energy_limit_level?: number;
    public booster_pack_2x?: boolean;
    public booster_pack_3x?: boolean;
    public booster_pack_7x?: boolean;
    public booster_pack_active_until?: string;
    public login_streak?: number;
    public daily_booster_uses?: number;
    public last_daily_booster_use?: string;
    public production_per_hour?: number;
    public referred_by?: number;
    public level_id?: number;
    public remember_token?: string;
    public last_tap_date?: string;
    public last_login_date?: string;
    public created_at?: string;
    public updated_at?: string;
}

export class TelegramUsersUpdateParams {
    public id?: number;
    public telegram_id?: number;
    public first_name?: string;
    public last_name?: string;
    public username?: string;
    public ton_wallet?: string;
    public balance?: number;
    public earn_per_tap?: number;
    public available_energy?: number;
    public max_energy?: number;
    public multi_tap_level?: number;
    public energy_limit_level?: number;
    public booster_pack_2x?: boolean;
    public booster_pack_3x?: boolean;
    public booster_pack_7x?: boolean;
    public booster_pack_active_until?: string;
    public login_streak?: number;
    public daily_booster_uses?: number;
    public last_daily_booster_use?: string;
    public production_per_hour?: number;
    public referred_by?: number;
    public level_id?: number;
    public remember_token?: string;
    public last_tap_date?: string;
    public last_login_date?: string;
    public created_at?: string;
    public updated_at?: string;
}

export interface TelegramUsersListFilter extends ListFilter {
    id?: number;
    telegram_id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    ton_wallet?: string;
    balance?: number;
    earn_per_tap?: number;
    available_energy?: number;
    max_energy?: number;
    multi_tap_level?: number;
    energy_limit_level?: number;
    booster_pack_2x?: boolean;
    booster_pack_3x?: boolean;
    booster_pack_7x?: boolean;
    booster_pack_active_until?: string;
    login_streak?: number;
    daily_booster_uses?: number;
    last_daily_booster_use?: string;
    production_per_hour?: number;
    referred_by?: number;
    level_id?: number;
    remember_token?: string;
    last_tap_date?: string;
    last_login_date?: string;
    created_at?: string;
    updated_at?: string;
}

@Service()
export class TelegramUsersService extends CoreService {

    @Inject(()=> TelegramUsersModel)
    private telegramUsersModel: TelegramUsersModel;

    @Inject(()=> DailyTasksModel)
    private dailyTasksModel: DailyTasksModel;

    @Inject(()=> TelegramUserDailyTasksModel)
    private telegramUserDailyTasksModel: TelegramUserDailyTasksModel;

    @Inject(()=> LevelsModel)
    private levelsModel: LevelsModel;

    @Inject(()=> MissionTypesModel)
    private missionTypesModel: MissionTypesModel;

    @Inject(()=> CoinService)
    private coinService: CoinService;

    @Inject(()=> SwapHistoryModel)
    private swapHistoryModel: SwapHistoryModel;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;

    @Inject(()=> TonHistoryService)
    private tonHistoryService: TonHistoryService;
    
    @Inject(()=> TetherHistoryService)
    private tetherHistoryService: TetherHistoryService;

    constructor() {
        super();
    }

    public async listLeaderboard(req: Request, res: Response, level_id:number, ){
        
        let paging : IPaging = { page: 1, limit: 100 }
        let order: IOrder[] = [
            {
                column: 'balance',
                dir: 'DESC'
           }
        ]
        return (await this.telegramUsersModel.list(undefined, order, paging)).list;
    }

    public async updateBalance(user:TelegramUsers, balance: number, manager?: EntityManager){
        user = await this.telegramUsersModel.get(user.id, undefined, undefined, manager);
        user.balance = user.balance + balance;
        await this.telegramUsersModel.update(user, undefined, manager);
        return user;
    }

    @Transaction()
    public async buyBooster(req: Request, res: Response, booster_type: string, user:TelegramUsers, manager?: EntityManager){
        let cost = this.getBoosterCost(user, booster_type);
        user = await this.telegramUsersModel.get(user.id, undefined, undefined, manager);
        if(user.balance < cost){
            res.status(400);
            return {success: false, message:"Not enough coins to buy this booster.", required_coins : cost, current_balance : user.balance};
        }

        user.balance = user.balance -cost;
        switch(booster_type){
            case 'multi_tap':
                user.multi_tap_level++;
                user.earn_per_tap++;
                break;
            case 'energy_limit':
                user.energy_limit_level++;
                user.max_energy += 500;
                break;
        }

        await this.telegramUsersModel.update(user, undefined, manager);
        return {success: true,
                message:"Booster purchased successfully",
                balance : user.balance,
                earn_per_tap : user.earn_per_tap,
                max_energy : user.max_energy,
                multi_tap_level : user.multi_tap_level,
                energy_limit_level : user.energy_limit_level,
                next_multi_tap_cost : this.getBoosterCost(user, 'multi_tap'),
                next_energy_limit_cost : this.getBoosterCost(user, 'energy_limit')
            };
    }

    public getBoosterCost(user:TelegramUsers, booster_type: string){
        let boosterLevel = booster_type == 'multi_tap' ? user.multi_tap_level : user.energy_limit_level;
        return 1000 * (2 ** (boosterLevel - 1));
    }

    public canUseDailyBooster(user:TelegramUsers){
        let dateStr = now();
        if(!user.last_daily_booster_use){
            return true;
        }
        let add1Day = moment(user.last_daily_booster_use).add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
        if(add1Day <= dateStr){
            return true;
        }

        let add1Hour = moment(user.last_daily_booster_use).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss')

        return user.daily_booster_uses < 6 && add1Hour <= dateStr;
    }

    @Transaction()
    public async useDailyBooster(req: Request, res: Response, user:TelegramUsers, manager?: EntityManager){
        let dateStr = now();
        user = await this.telegramUsersModel.get(user.id);
        if(!this.canUseDailyBooster(user)){
            res.status(400);
            return {success: false,
                message:"Cannot use daily booster at this time",
                daily_booster_uses : user.daily_booster_uses,
                next_available_at : user.last_daily_booster_use ? moment(user.last_daily_booster_use).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss') : null
            };
        }

        if(!user.last_daily_booster_use){
            user.daily_booster_uses = 0;
        }

        let add1Day = moment(user.last_daily_booster_use).add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
        if(add1Day <= dateStr){
            user.daily_booster_uses = 0;
        }
        user.daily_booster_uses++;
        user.last_daily_booster_use = dateStr;
        user.available_energy = user.max_energy;
        await this.telegramUsersModel.update(user, undefined, manager);
        return {success: true,
            message:"Daily booster used successfully",
            current_energy : user.max_energy,
            daily_booster_uses : user.daily_booster_uses,
            next_available_at : moment(user.last_daily_booster_use).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
        };
    }

    @Transaction()
    public async tap(req: Request, res: Response, count: number, user: TelegramUsers, manager?: EntityManager) {
        user = await this.telegramUsersModel.get(user.id);

        let taps = Math.min(count, user.available_energy);
        let multiplier = 1;
        if(user.booster_pack_7x){
            multiplier = 7;
        }
        if(user.booster_pack_3x){
            multiplier = 3;
        }
        if(user.booster_pack_2x){
            multiplier = 2;
        }
        let earned = taps * user.earn_per_tap * multiplier;
        user.balance += earned;
        user.available_energy -= taps;
        user.last_tap_date = now();
        await this.telegramUsersModel.update(user, undefined, manager);


        return {success: true,
            message:"",
            earned : earned,
            balance : user.balance,
            available_energy : user.available_energy
        };
    }

    @Transaction()
    public async updateLevel(req: Request, res: Response, level_id: number, max_energy: number, earn_per_tap: number, user: TelegramUsers, manager?: EntityManager) {
        user = await this.telegramUsersModel.get(user.id);
        user.level_id = level_id;
        user.max_energy = max_energy;
        user.earn_per_tap = earn_per_tap;
        await this.telegramUsersModel.update(user, undefined, manager);


        return {success: true};
    }


    public async referredUsers(req: Request, res: Response, paging: IPaging, user: TelegramUsers) {
        let order : IOrder[] = [
            {
                column : 'id',
                dir : 'DESC'
            }
        ]
        let list = await this.telegramUsersModel.list({referred_by: user.telegram_id}, order, paging);

        return list;

    }

    public async list(req: Request, res: Response, filter: TelegramUsersListFilter, order: IOrder[], paging: IPaging) {
        return await this.telegramUsersModel.list(filter, order, paging);
    }

    public async updateLoginStreak(user: TelegramUsers, manager?: EntityManager) {

        let today = now('YYYY-MM-DD 00:00:00');

        if(user.last_login_date < today) {
            let cap = await this.dailyTasksModel.getCount(undefined, undefined, manager);
            let lastClaimedDailyTask = (await this.telegramUserDailyTasksModel.dailyTasks(user.id, manager))[0];

            if(
                user.last_login_date > moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')
                && lastClaimedDailyTask && lastClaimedDailyTask.created_at > moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')
                && lastClaimedDailyTask.created_at < today
                && user.login_streak !== cap
            ) {
                user.login_streak = Math.min(user.login_streak + 1, cap);
            } else {
                user.login_streak = 1;
                await this.telegramUserDailyTasksModel.resetDailyTasks(user.id, manager);
            }

            await this.telegramUsersModel.update(user, undefined, manager);
        }

    }

    @Transaction()
    public async sync(req: Request, res: Response, user: TelegramUsers, manager?: EntityManager) {

        user = await this.telegramUsersModel.get(user.id, undefined, undefined, manager);

        // let passiveEarnings = this.calcPassiveEarning(user);
        // await this.updateLoginStreak(user, manager);
        this.checkAndResetDailyBooster(user);
        let restoredEnergy = this.restoreEnergy(user);
        let canUseDailyBooster = this.canUseDailyBooster(user);
        let totalDailyRewards = 0;
        let dailyTaskList = await this.dailyTasksModel.all(undefined, undefined, undefined, manager);
        for(let dailyTask of dailyTaskList.list) {
            totalDailyRewards += dailyTask.reward_coins;
        }

        user['level'] = await this.levelsModel.get(user.level_id, undefined, undefined, manager);

        let levels = (await this.levelsModel.all(undefined, undefined, undefined, manager)).list;
        let maxLevel = 0;
        for(let level of levels) {
            if(maxLevel < level.level) {
                maxLevel = level.level;
            }
        }
        let missionTypes = (await this.missionTypesModel.all(undefined, undefined, undefined, manager)).list;
        let totalReferals = await this.telegramUsersModel.getCount({referred_by: user.telegram_id}, undefined, manager);

        user.last_login_date = now();
        await this.telegramUsersModel.update(user, undefined, manager);

        let result = {
            user: user,
            restored_energy: restoredEnergy,
            boosters: {
                multi_tap: {
                    level: user.multi_tap_level,
                    cost: this.getBoosterCost(user, 'multi_tap'),
                    increase_by: 1
                },
                energy_limit: {
                    level: user.energy_limit_level,
                    cost: this.getBoosterCost(user, 'energy_limit'),
                    increase_by: 500
                }
            },
            daily_booster: {
                can_use: canUseDailyBooster,
                uses_today: user.daily_booster_uses,
                next_available_at: canUseDailyBooster ? now() : user.last_daily_booster_use ? moment(user.last_daily_booster_use).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss') : null
            },
            total_daily_rewards: totalDailyRewards,
            levels: levels,
            max_level: maxLevel,
            levelUp: CONFIG.clicker.levelUp,
            referral: CONFIG.clicker.referral,
            mission_types: missionTypes,
            // passive_earnings: passiveEarnings,
            passive_earnings: 0,
            total_referals: totalReferals
        }

        return result;
    }

    public calcPassiveEarning(user: TelegramUsers) {

        let passiveEarnings = 0;

        if(user.last_login_date && user.production_per_hour) {

            let threeHours = 3 * 60 * 60;
            let secondsPassed = Math.floor(moment().diff(moment(user.last_login_date)) / 1000);
            if(secondsPassed > threeHours) secondsPassed = threeHours;
            let productionInSeconds = user.production_per_hour / 3600;
            passiveEarnings = productionInSeconds * secondsPassed;

            user.balance = user.balance + passiveEarnings;
        }

        return passiveEarnings;
    }

    public checkAndResetDailyBooster(user: TelegramUsers) {

        let date = now();

        if(!user.last_daily_booster_use || moment(user.last_daily_booster_use).add(1, 'days').format('YYYY-MM-DD HH:mm:ss') <= date) {
            user.daily_booster_uses = 0;
            user.last_daily_booster_use = null;
        }
    }

    public restoreEnergy(user: TelegramUsers) {

        if(user.max_energy === user.available_energy) {
            return 0;
        }

        let date = now();
        let secondsPassed = Math.abs(Math.floor(moment(user.last_tap_date).diff(moment()) / 1000));
        let maxEnergy = user.max_energy;
        let energyToRestore = Math.min(secondsPassed, maxEnergy);

        user.available_energy = Math.round(Math.min(user.available_energy + energyToRestore, maxEnergy));
        user.last_tap_date = date;

        return energyToRestore;
    }

    @Transaction()
    public async swap(req: Request, res: Response, type:string, address:string, user:TelegramUsers, manager?: EntityManager){
        user = await this.telegramUsersModel.get(user.id);
        if(!type){
            type = 'div';
        }

        if(!address){
            res.status(400);
            return {success: false,
                message:"address is null"
            };
        }

        let divRate = 100000
        let coin = 0

        switch(type){
            case 'ton':
                if(user.ton < 1){
                    res.status(400);
                    return {success: false,
                        message:"TON is lack"
                    };
                }
                coin = user.ton
                user.ton = 0;

                let tonHistory = new TonHistoryCreateParams();
                tonHistory.telegram_user_id = user.id;
                tonHistory.type = 'used';
                tonHistory.subject = 'TON Exchange';
                tonHistory.comment = 'TON Exchange';
                tonHistory.amount = coin;
                await this.tonHistoryService.create(tonHistory, manager);
                break;
            case 'usdt':
                if(user.tether < 30){
                    res.status(400);
                    return {success: false,
                        message:"USDT is lack"
                    };
                }
                coin = user.tether
                user.tether = 0;
                let tetherHistory = new TetherHistoryCreateParams();
                tetherHistory.telegram_user_id = user.id;
                tetherHistory.type = 'used';
                tetherHistory.subject = 'Tether Exchange';
                tetherHistory.comment = 'Tether Exchange';
                tetherHistory.amount = coin;
                await this.tetherHistoryService.create(tetherHistory, manager);
                break;
            case 'div':
                if(user.balance < 1000000){
                    res.status(400);
                    return {success: false,
                        message:"balance is lack"
                    };
                }
                coin = Math.floor(user.balance/divRate);
                let usePoint = coin*divRate;
                user.balance = user.balance - usePoint;

                let pointHistory = new PointHistoryCreateParams();
                pointHistory.telegram_user_id = user.id;
                pointHistory.type = 'used';
                pointHistory.subject = 'DIVCOW Token Exchange';
                pointHistory.comment = 'DIVCOW Token Exchange';
                pointHistory.amount = usePoint;
                await this.pointHistoryService.create(pointHistory, manager);
                
                break;
        }
        
        await this.telegramUsersModel.update(user, undefined, manager);

        let swapHistory = new SwapHistory();
        swapHistory.telegram_user_id = user.id;
        swapHistory.status = 'pending';
        swapHistory.type = type;
        swapHistory.address = address;
        swapHistory.amount = coin;
        swapHistory.updated_at = now();
        swapHistory.created_at = now();
        await this.swapHistoryModel.create(swapHistory, undefined, manager);

        // await this.coinService.sendDivc(req, res, address, String(coin));
        return {success: true,
            message : type == 'div' ? 'DIVCOW exchange has been requested.' : 'USDT exchange has been requested.',
            balance : user.balance,
            tether : user.tether,
            ton : user.ton
        };
    }

    @Transaction()
    public async pointSwap(req: Request, res: Response, telegram_id: number, amount: number, manager?: EntityManager){
        let user = await this.telegramUsersModel.getByFilter({telegram_id: telegram_id});
        if(!user){
            throw new CoreError(ErrorType.E_NOTFOUND, 'not found');
        }
        user.balance += amount;
        await this.telegramUsersModel.update(user, undefined, manager);
        return true;
    }

}