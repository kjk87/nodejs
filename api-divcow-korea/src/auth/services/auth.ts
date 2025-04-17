import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import { TelegramUsersModel } from "../../telegram/models/telegram_users";
import { TelegramUsers } from "../../telegram/entities/telegram_users";
import { CONFIG } from "../../common/services/config";
import { EntityManager } from "typeorm";
import { TelegramUsersService } from "../../telegram/services/telegram_users";
import { getUUIDv4, now } from "../../common/services/util";
import { PersonalAccessTokens } from "../../personal/entities/personal_access_tokens";
import { PersonalAccessTokensModel } from "../../personal/models/personal_access_tokens";
import { Redis } from "../../common/services/redis";
import { PointHistoryModel } from "../../point/models/point_history";
import { PointHistory } from "../../point/entities/point_history";
import { PointHistoryCreateParams, PointHistoryService } from "../../point/services/point_history";
import { TonHistoryCreateParams, TonHistoryService } from "../../ton/services/ton_history";
import { TetherHistoryCreateParams, TetherHistoryService } from "../../tether/services/tether_history";


export class TelegramUserParams {

    @IsNotEmpty()
    public telegram_id: string;
    @IsNotEmpty()
    public first_name: string;
    public last_name?: string;
    public username?: string;
    public referred_by?: string;
    public balance?: number;
}


@Service()
export class AuthService extends CoreService {

    @Inject(()=> TelegramUsersModel)
    private telegramUsersModel: TelegramUsersModel;

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> PersonalAccessTokensModel)
    private personalAccessTokensModel: PersonalAccessTokensModel;

    @Inject(()=> PointHistoryService)
    private pointHistoryService: PointHistoryService;
    
    @Inject(()=> TonHistoryService)
    private tonHistoryService: TonHistoryService;

    @Inject(()=> TetherHistoryService)
    private tetherHistoryService: TetherHistoryService;

    constructor() {
        super();
    }


    @Transaction()
    public async telegramUser(req: Request, res: Response, params: TelegramUserParams, manager?: EntityManager) {

        params.balance = 100000;

        let fl = false;
        let user = await this.telegramUsersModel.getByFilter({telegram_id: params.telegram_id}, undefined, undefined, manager);
        
        if(params.referred_by && params.referred_by != params.telegram_id) {

            let referred_by = await this.telegramUsersModel.getByFilter({telegram_id: params.referred_by}, undefined, undefined, manager);

            if(referred_by && !user) {
                let increase_by = CONFIG.clicker.referral.base.welcome;
                if(increase_by > 0) {
                    referred_by.balance += increase_by;
                    let pointHistory = new PointHistoryCreateParams();
                    pointHistory.telegram_user_id = referred_by.id;
                    pointHistory.type = 'charge';
                    pointHistory.subject = 'Invitation Reward';
                    pointHistory.comment = 'Invitation Reward';
                    pointHistory.amount = increase_by;
                    await this.pointHistoryService.create(pointHistory, manager);
                    
                    if(!referred_by.recommend_count){
                        referred_by.recommend_count = 0;
                    }
                    referred_by.recommend_count += 1;

                    let title = 'Level 10 Achievement Reward';
                    let amout = 0;
                    
                    if(referred_by.recommend_count >= 10 && referred_by.recommend_count < 20){
                        referred_by.referrel_reward = 1;
                        if(referred_by.recommend_count == 10){
                            title = 'Level 1 Achievement Reward';
                            amout = 100000;
                        }
                    }else if(referred_by.recommend_count >= 20 && referred_by.recommend_count < 40){
                        referred_by.referrel_reward = 2;
                        if(referred_by.recommend_count == 20){
                            title = 'Level 2 Achievement Reward';
                            amout = 200000;
                        }
                    }else if(referred_by.recommend_count >= 40 && referred_by.recommend_count < 80){
                        referred_by.referrel_reward = 3;
                        if(referred_by.recommend_count == 40){
                            title = 'Level 3 Achievement Reward';
                            amout = 400000;
                        }
                    }else if(referred_by.recommend_count >= 80 && referred_by.recommend_count < 160){
                        referred_by.referrel_reward = 4;
                        if(referred_by.recommend_count == 80){
                            title = 'Level 4 Achievement Reward';
                            amout = 800000;
                        }
                    }else if(referred_by.recommend_count >= 160 && referred_by.recommend_count < 320){
                        referred_by.referrel_reward = 5;
                        if(referred_by.recommend_count == 160){
                            title = 'Level 5 Achievement Reward';
                            amout = 1600000;
                        }
                    }else if(referred_by.recommend_count >= 320 && referred_by.recommend_count < 640){
                        referred_by.referrel_reward = 6;
                        if(referred_by.recommend_count == 320){
                            title = 'Level 6 Achievement Reward';
                            amout = 3200000;
                        }
                    }else if(referred_by.recommend_count >= 640 && referred_by.recommend_count < 1280){
                        referred_by.referrel_reward = 7;
                        if(referred_by.recommend_count == 640){
                            title = 'Level 7 Achievement Reward';
                            amout = 6400000;
                        }
                    }else if(referred_by.recommend_count >= 1280 && referred_by.recommend_count < 2560){
                        referred_by.referrel_reward = 8;
                        if(referred_by.recommend_count == 1280){
                            title = 'Level 8 Achievement Reward';
                            amout = 12800000;
                        }
                    }else if(referred_by.recommend_count >= 2560 && referred_by.recommend_count < 5000){
                        referred_by.referrel_reward = 9;
                        if(referred_by.recommend_count == 2560){
                            title = 'Level 9 Achievement Reward';
                            amout = 25600000;
                        }
                    }else if(referred_by.recommend_count >= 5000){
                        referred_by.referrel_reward = 10;
                        if(referred_by.recommend_count == 5000){
                            title = 'Level 10 Achievement Reward';
                            amout = 51200000;
                        }
                    }

                    if(amout > 0){
                        let levelUpPointHistory = new PointHistoryCreateParams();
                        levelUpPointHistory.telegram_user_id = referred_by.id;
                        levelUpPointHistory.type = 'charge';
                        levelUpPointHistory.subject = title;
                        levelUpPointHistory.comment = title;
                        levelUpPointHistory.amount = amout;
                        await this.pointHistoryService.create(levelUpPointHistory, manager);
    
                        referred_by.balance += amout;
                    }
                    

                    await this.telegramUsersModel.update(referred_by, undefined, manager);
                }
            } else {
                user.referred_by = undefined;
            }
        }

        if(!user) { 
            fl = true;
            user = TelegramUsers.fromObject(params, TelegramUsers);
            user.created_at = now();
            user.updated_at = now();
            user.login_streak = 1;
            user.tether = 1;
            // user.ton = 0.1;
            await this.telegramUsersModel.create(user, undefined, manager);

            if(user.balance > 0){
                let pointHistory = new PointHistoryCreateParams();
                pointHistory.telegram_user_id = user.id;
                pointHistory.type = 'charge';
                pointHistory.subject = 'Join Reward';
                pointHistory.comment = 'Join Reward';
                pointHistory.amount = user.balance;
                await this.pointHistoryService.create(pointHistory, manager);
            }

            if(user.ton > 0){
                let tonHistory = new TonHistoryCreateParams();
                tonHistory.telegram_user_id = user.id;
                tonHistory.type = 'charge';
                tonHistory.subject = 'Join Reward';
                tonHistory.comment = 'Join Reward';
                tonHistory.amount = user.ton;
                await this.tonHistoryService.create(tonHistory, manager);
            }
            
            if(user.tether > 0){
                let tetherHistory = new TetherHistoryCreateParams();
                tetherHistory.telegram_user_id = user.id;
                tetherHistory.type = 'charge';
                tetherHistory.subject = 'Join Reward';
                tetherHistory.comment = 'Join Reward';
                tetherHistory.amount = user.tether;
                await this.tetherHistoryService.create(tetherHistory, manager);
            }
            
        }

        await this.telegramUsersService.updateLoginStreak(user, manager);

        let token = getUUIDv4();

        await Redis.getInstance().hSet(token, user, 1 * 24 * 60 * 60);
        // let date = now();
        // let personal_access_tokens = new PersonalAccessTokens();

        // personal_access_tokens.tokenable_type = 'App\\Models\\TelegramUser';
        // personal_access_tokens.tokenable_id = user.id;
        // personal_access_tokens.name = String(user.telegram_id);
        // personal_access_tokens.token = token;
        // personal_access_tokens.abilities = '["*"]';
        // personal_access_tokens.last_used_at = date;
        // personal_access_tokens.created_at = date;
        // personal_access_tokens.updated_at = date;

        // await this.personalAccessTokensModel.create(personal_access_tokens, undefined, manager);

        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>token', user.telegram_id + '|' + token)

        return {
            first_login: fl,
            token: user.telegram_id + '|' + token
        };
    }

}