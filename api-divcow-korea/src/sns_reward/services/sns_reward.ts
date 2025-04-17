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
import { MemberA } from "../../member/entities/member_a";
import { SnsRewardModel } from "../models/sns_reward";
import { SnsReward } from "../entities/sns_reward";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { MemberService } from "../../member/services/member";


export interface SnsRewardFilter extends ListFilter {
    userKey?: string;
}


@Service()
export class SnsRewardService extends CoreService {

    @Inject(()=> SnsRewardModel)
    private snsRewardModel: SnsRewardModel;
    
    @Inject(()=> MemberService)
    private memberService: MemberService;

    public async get(req: Request, res: Response, member: MemberA) {
        return await this.snsRewardModel.get(member.userKey);
    }

    @Transaction()
    public async save(req: Request, res: Response, type:string, member: MemberA, manager?: EntityManager) {
        let dateStr = now();
        
        
        let snsReward = await this.snsRewardModel.get(member.userKey, undefined, manager);
        var giveReward = false;

        if(!snsReward){
            snsReward = new SnsReward();
            snsReward.userKey = member.userKey;
            snsReward.youtube = (type == 'youtube' ? true : false);
            snsReward.telegram = (type == 'telegram' ? true : false);
            snsReward.discord = (type == 'discord' ? true : false);
            snsReward.x = (type == 'x' ? true : false);
            snsReward.instagram = (type == 'instagram' ? true : false);
            if(snsReward.youtube || snsReward.telegram || snsReward.discord || snsReward.x || snsReward.instagram){
                snsReward = await this.snsRewardModel.create(snsReward, undefined, manager);
                giveReward = true;
            }else{
                throw new CoreError(ErrorType.E_INVALID_ARG);
            }
            
        }else{

            switch(type){
                case 'youtube':
                    if(snsReward.youtube){
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }else{
                        snsReward.youtube = true;
                        giveReward = true;
                    }
                    break;
                case 'telegram':
                    if(snsReward.telegram){
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }else{
                        snsReward.telegram = true;
                        giveReward = true;
                    }
                    break;
                case 'discord':
                    if(snsReward.discord){
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }else{
                        snsReward.discord = true;
                        giveReward = true;
                    }
                    break;
                case 'x':
                    if(snsReward.x){
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }else{
                        snsReward.x = true;
                        giveReward = true;
                    }
                    break;
                case 'instagram':
                    if(snsReward.instagram){
                        throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }else{
                        snsReward.instagram = true;
                        giveReward = true;
                    }
                    break;
            }

            snsReward = await this.snsRewardModel.update(snsReward, undefined, manager);
        }

        if(giveReward){
            let historyPoint = new HistoryPoint();
            historyPoint.userKey = member.userKey;
            historyPoint.type = 'charge';
            historyPoint.category = 'snsReward';
            historyPoint.point = 100;
            historyPoint.subject = type;
            historyPoint.comment = type,' reward';
            historyPoint.regDatetime = now();
            await this.memberService.updatePoint(historyPoint, member, manager);
        }

        return snsReward;
    }

}