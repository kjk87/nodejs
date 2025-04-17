import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { decrypt, encrypt, now, safeNumber } from "../../common/services/util";
import { _axios } from "../../common/services/axios";
import { IsNotEmpty } from "../../common/services/decorators";
import * as crypto from 'crypto';
import * as FormData  from 'form-data';
import { BuffCoinInfo } from "../../buff/entities/buff_coin_info";
import { BuffCoinInfoModel } from "../../buff/models/buff_coin_info";
import { MemberA } from "../../member/entities/member_a";

export class UpdateCoinParams {
    @IsNotEmpty()
    public memberSeqNo: number;

    @IsNotEmpty()
    public isIncrease: boolean;

    @IsNotEmpty()
    public amount: number;

    @IsNotEmpty()
    public type: string;
}

export class ExchangeBuffCoinToPointParams {
    @IsNotEmpty()
    public exchangeCoin: number;
}

@Service()
export class BuffWalletService extends CoreService {

    @Inject(()=> BuffCoinInfoModel)
    private buffCoinInfoModel: BuffCoinInfoModel;

    private STORE_TYPE = process.env.NODE_ENV;
    private PROD_URL = 'https://user-api.glockup.buffwallet.net/';
    // private DEV_URL = 'http://175.126.82.89:11080/';

    public async walletSignUp(req: Request, res: Response, member:MemberA) {

        let jsonObject: any = {};

        jsonObject.type = member.joinType;
        jsonObject.id = member.authEmail;
        jsonObject.password = member.userKey;
        jsonObject.key = member.userKey;
        jsonObject.name = member.nickname;
        jsonObject.hp = '01000000000';
        jsonObject.reqTime = new Date().getTime();

        let params = {
            data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
        }

        let url = '';
        // if(this.STORE_TYPE == 'PROD') {
            url = this.PROD_URL + 'user/bunny/signUp';
        // } else {
        //     url = this.DEV_URL + 'user/bunny/signUp';
        // }

        let resp = await _axios('post', url, params);
        return JSON.parse(decrypt(JSON.stringify(resp.data), this.STORE_TYPE));

    }

    public async walletSync(req: Request, res: Response, password: string, user) {
        
        let jsonObject = {
            id: user.loginId,
            password: password,
            key: user.seqNo,
            name: user.nickname,
            hp: user.mobileNumber,
            reqTime: new Date().getTime() 
        }

        let params = {
            data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
        }

        let url = '';
        // if(this.STORE_TYPE == 'PROD') {
            url = this.PROD_URL + 'user/bunny/sync';
        // } else {
        //     url = this.DEV_URL + 'user/bunny/sync';
        // }

        let resp = await _axios('post', url, params);
        return JSON.parse(decrypt(JSON.stringify(resp.data), this.STORE_TYPE));

    }

    public async walletBalance(req: Request, res: Response, member:MemberA) {
        let jsonObject = {
            id: member.authEmail,
            key: member.userKey,
            reqTime: new Date().getTime()
        }

        let params = {
            data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
        }



        let url = '';
        // if(this.STORE_TYPE == 'PROD') {
            url = this.PROD_URL + 'user/bunny/balance';
        // } else {
        //     url = this.DEV_URL + 'user/bunny/balance';
        // }


        let resp = await _axios('post', url, params);
        return JSON.parse(decrypt(JSON.stringify(resp.data), this.STORE_TYPE));

    }

    public async duplicateUser(req: Request, res: Response, email:string) {

        let jsonObject = {
            id: email,
            reqTime: new Date().getTime()
        }

        let params = {
            data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
        }


        let url = '';
        // if(this.STORE_TYPE == 'PROD') {
            url = this.PROD_URL + 'user/bunny/duplicateUser';
        // } else {
        //     url = this.DEV_URL + 'user/bunny/duplicateUser';
        // }
        console.log('url : ',url);
        let resp = await _axios('post', url, params);
            return JSON.parse(decrypt(JSON.stringify(resp.data), this.STORE_TYPE));

    }

    // public async updateCoin(req: Request, res: Response, params: UpdateCoinParams, user) {

    //     let token = req.headers['adminToken'];
    //     if(this.ADMIN_TOKEN != token) {
    //         throw new CoreError(E_NOTPERMISSION, '잘못된 접근입니다')
    //     }

    //     params.amount = safeNumber(params.amount.toFixed(4));

    //     let member = await this.memberModel.get(params.memberSeqNo);
        
    //     let jsonObject = {
    //         id: member.loginId,
    //         key: member.seqNo,
    //         type: params.type, //(PAYMENT: 상품 결제, SIGNUP: 회원가입, EVENT: 이벤트, POINT: 포인트 전환, TOKEN: 토큰 변환, GIFT : 기프트카드 결제, LUCKYBOL : 럭키볼 전환)
    //         amount: params.amount,
    //         isIncrease: params.isIncrease,
    //         reqTime: new Date().getTime()
    //     }

    //     let _params = {
    //         data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
    //     }


    //         let url = '';
    //         if(this.STORE_TYPE == 'PROD') {
    //             url = this.PROD_URL + 'user/bunny/buff';
    //         } else {
    //             url = this.DEV_URL + 'user/bunny/buff';
    //         }

    //         let res = await _axios('post', url, _params);
    //         let data = JSON.parse(decrypt(JSON.stringify(res.data), this.STORE_TYPE));

    //         if(data.result == 'SUCCESS') {
    //             let buffCoinHistory: BuffCoinHistory = new BuffCoinHistory();
    //             buffCoinHistory.memberSeqNo = user.seqNo;
    //             if(params.isIncrease) {
    //                 buffCoinHistory.type = 'increase';
    //             } else {
    //                 buffCoinHistory.type = 'decrease';
    //             }

    //             buffCoinHistory.coin = params.amount;
    //             if(params.type == 'PAYMENT') {
    //                 buffCoinHistory.subject = '상품 결제';
    //             } else if(params.type == 'SIGNUP') {
    //                 buffCoinHistory.subject = '회원가입';
    //             } else if(params.type == 'EVENT') {
    //                 buffCoinHistory.subject = '이벤트';
    //             } else if(params.type == 'POINT') {
    //                 buffCoinHistory.subject = '포인트';
    //             } else if(params.type == 'TOKEN') {
    //                 buffCoinHistory.subject = '토큰 변환';
    //             }

    //             buffCoinHistory.regDatetime = now();
    //             await this.buffCoinHistoryModel.create(buffCoinHistory);
    //         }

    //         return data;


        
    // }

    public async getBuffCoinInfo(){
        let buffCoinInfo: BuffCoinInfo = await this.buffCoinInfoModel.get(1);
        return buffCoinInfo;
    }


    public async buffCoinBalance(req: Request, res: Response, member:MemberA) {
        
        let walletBalance = await this.walletBalance(req, res, member);

        let balance: number = safeNumber(walletBalance.balances.BUFF.balance);
        let buffCoinInfo = await this.getBuffCoinInfo();

        let usdt = balance * buffCoinInfo.usdt;

        return {
            buff: balance.toFixed(4),
            usdt: buffCoinInfo.usdt,
            totalUsdt: usdt.toFixed(4),
            krw: 0,
            totalKrw: 0
        }
    }

    public async updateCoin(type:string, isIncrease:boolean, amount:number, member:MemberA){
        let jsonObject: any = {};

        jsonObject.id = member.authEmail;
        jsonObject.key = member.userKey;
        jsonObject.type = type;//(PAYMENT: 상품 결제, SIGNUP: 회원가입, EVENT: 이벤트, POINT: 포인트 전환, TOKEN: 토큰 변환, GIFT : 기프트카드 결제, LUCKYBOL : 럭키볼 전환)
        jsonObject.amount = Number(amount.toFixed(4));
        jsonObject.isIncrease = isIncrease;
        jsonObject.reqTime = new Date().getTime();
        console.log(JSON.stringify(jsonObject));
        let params = {
            data: encrypt(JSON.stringify(jsonObject), this.STORE_TYPE)
        }

        let url = this.PROD_URL + 'user/bunny/buff';

        let resp = await _axios('post', url, params);
        let data = JSON.parse(decrypt(JSON.stringify(resp.data), this.STORE_TYPE));
        if(!data && data.result == 'SUCCESS'){//성공
            
        }else{//실패

        }
    }
}