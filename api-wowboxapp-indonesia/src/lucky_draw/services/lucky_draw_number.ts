// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now, shuffle } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import { LuckyDrawNumberModel } from "../models/lucky_draw_number";
import { LuckyDrawNumber } from "../entities/lucky_draw_number";


export interface LuckyDrawNumberFilter extends ListFilter {
    seqNo?: number;
    winNumber?: number;
}


@Service()
export class LuckyDrawNumberService extends CoreService {

    @Inject(()=> LuckyDrawNumberModel)
     private luckyDrawNumberModel: LuckyDrawNumberModel;

     public async remainCount(luckyDrawSeqNo:number){
        return await this.luckyDrawNumberModel.remainCount(luckyDrawSeqNo);
     }

     public async deleteNumber(luckyDrawSeqNo:number, winNumbers:string){
        let winNumberList = winNumbers.split(',');

        for(let winNumber of winNumberList){
            let key = process.env.REDIS_PREFIX + 'luckyDraw' + luckyDrawSeqNo + winNumber;
            console.log('key : ',key);
            await Redis.getInstance().del(key)
            console.log('value : ',await Redis.getInstance().hGet(key))
        }

        return true;
        
     }

     public async selectNumber(luckyDrawSeqNo:number){
        let remainCount = await this.remainCount(luckyDrawSeqNo);

        let selectNumber : LuckyDrawNumber;

        if(remainCount <= 100){
            let numberList = await this.luckyDrawNumberModel.getRemainNumberList(luckyDrawSeqNo);
            shuffle(numberList);

            for(let data of numberList) {
                let luckyDrawNumber = new LuckyDrawNumber();
                luckyDrawNumber.mappingRawObject(data);
                if(data.used == 0){
                    luckyDrawNumber.used = false;
                }else{
                    luckyDrawNumber.used = true;
                }
                let key = process.env.REDIS_PREFIX + 'luckyDraw' + luckyDrawSeqNo + luckyDrawNumber.winNumber;
                console.log('value1 : ',await Redis.getInstance().hGet(key));
                if(!await Redis.getInstance().hGet(key)) {
                    console.log('value2 : ',await Redis.getInstance().hGet(key));
                    await Redis.getInstance().hSet(key, luckyDrawNumber.winNumber, 1 * 1 * 5 * 60);
                    selectNumber = luckyDrawNumber;
                    break;
                }
           }
        }else{
            while(true) {
                let offset = Math.floor(Math.random()*remainCount)
                let data = await this.luckyDrawNumberModel.getRandomNumber(luckyDrawSeqNo, offset);
                if(!data){
                    throw new CoreError(ErrorType.E_NOTFOUND);
                }
                console.log('', data);
                let luckyDrawNumber = new LuckyDrawNumber();
                luckyDrawNumber.mappingRawObject(data);
                if(data.used == 0){
                    luckyDrawNumber.used = false;
                }else{
                    luckyDrawNumber.used = true;
                }
                
                let key = process.env.REDIS_PREFIX + 'luckyDraw' + luckyDrawSeqNo + luckyDrawNumber.winNumber;

                if(!await Redis.getInstance().hGet(key)) {
                    await Redis.getInstance().hSet(key, luckyDrawNumber.winNumber, 1 * 1 * 5 * 60);
                    selectNumber = luckyDrawNumber;
                    break;
                }
            }
        }

        if(!selectNumber){
            throw new CoreError(ErrorType.E_NOTFOUND);
        }

        return selectNumber;
     }
}