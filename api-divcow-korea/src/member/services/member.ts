// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { Any, EntityManager } from "typeorm";
import { decrypt, encrypt, getRandomNum, getUUIDv4, now, sendEmail, wordFilter } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { MemberA } from "../entities/member_a";
import { MemberTotal } from "../entities/member_total";
import { MemberTotalModel } from "../models/member_total";
import { MemberAModel } from "../models/member_a";
import { MemberB } from "../entities/member_b";
import { MemberC } from "../entities/member_c";
import { MemberD } from "../entities/member_d";
import { MemberE } from "../entities/member_e";
import { MemberF } from "../entities/member_f";
import { MemberG } from "../entities/member_g";
import { MemberH } from "../entities/member_h";
import { MemberI } from "../entities/member_i";
import { MemberJ } from "../entities/member_j";
import { MemberK } from "../entities/member_k";
import { MemberL } from "../entities/member_l";
import { MemberM } from "../entities/member_m";
import { MemberN } from "../entities/member_n";
import { MemberO } from "../entities/member_o";
import { MemberP } from "../entities/member_p";
import { MemberQ } from "../entities/member_q";
import { MemberR } from "../entities/member_r";
import { MemberS } from "../entities/member_s";
import { MemberT } from "../entities/member_t";
import { MemberU } from "../entities/member_u";
import { MemberV } from "../entities/member_v";
import { MemberW } from "../entities/member_w";
import { MemberX } from "../entities/member_x";
import { MemberY } from "../entities/member_y";
import { MemberZ } from "../entities/member_z";
import { getRefreshToken, getSession, registRefreshToken, setSession } from '../../common/services/session';
import { TermsService } from "../../terms/services/terms";
import { HistoryPoint } from "../../history/entities/histroy_point";
import { FileService } from '../../file/service/file';
import { _axios } from '../../common/services/axios';
import axios from 'axios';
import { CoinService } from '../../coin/services/coin';
import { HistoryService } from "../../history/services/history";
import { MemberDailyTasksModel } from "../models/member_daily_tasks";
import { DailyTasksModel } from "../../daily/models/daily_tasks";
import moment = require("moment-timezone");
import { HistoryTether } from "../../history/entities/histroy_tether";
import { SwapHistory } from "../../swap/entities/swap_history";
import { SwapHistoryModel } from "../../swap/models/swap_history";
import { TokenService } from "../../coin/services/token";
import { HistoryLottery } from "../../history/entities/histroy_lottery";


export interface MemberTotalListFilter extends ListFilter {
    userKey?: string;
    email?: string;
    nickname?: string;
    platformKey?: string;
    recommendeeKey?: string;
    isRewardCoin?: boolean;
    mobileNumber?: string;
    verifiedMobile?: boolean;
    condition?: string;
}

export class MobileLoginParams {

     @IsNotEmpty()
     public device: string;

     @IsNotEmpty()
     public platformKey: string;

     @IsNotEmpty()
     public otp: string;

     @IsNotEmpty()
     public verifyType: string;
 }

export class PlatformLoginParams {

     @IsNotEmpty()
     public device: string;

     @IsNotEmpty()
     public platformKey: string;
 }

export class LoginParams {

     @IsNotEmpty()
     public device: string;

     @IsNotEmpty()
     public userKey: string;
}

export class RefreshKeyParams {

     @IsNotEmpty()
     public device: string;

     @IsNotEmpty()
     public token: string;

     @IsNotEmpty()
     public refreshToken: string;
}

export class WithdrawalCancelParams {
     @IsNotEmpty()
     public platformKey: string;
}

export class UpdateLotteryParams{

     @IsNotEmpty()
     public category: string;

     @IsNotEmpty()
     public type: string;

     @IsNotEmpty()
     public count: number;

     public subject: string;
     public comment: string;
}

const instance = {
     a : MemberA,
     b : MemberB,
     c : MemberC,
     d : MemberD,
     e : MemberE,
     f : MemberF,
     g : MemberG,
     h : MemberH,
     i : MemberI,
     j : MemberJ,
     k : MemberK,
     l : MemberL,
     m : MemberM,
     n : MemberN,
     o : MemberO,
     p : MemberP,
     q : MemberQ,
     r : MemberR,
     s : MemberS,
     t : MemberT,
     u : MemberU,
     v : MemberV,
     w : MemberW,
     x : MemberX,
     y : MemberY,
     z : MemberZ
}

const generateRandomString = (num) => {
     const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
     let result = '';
     const charactersLength = characters.length;
     for (let i = 0; i < num; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
   
     return result;
};

@Service()
export class MemberService extends CoreService {

     @Inject(()=> MemberTotalModel)
     private memberTotalModel: MemberTotalModel;

     @Inject(()=> MemberAModel)
     private memberAModel: MemberAModel;

     @Inject(()=> TermsService)
     private termsService: TermsService;

     @Inject(()=> HistoryService)
     private historyService: HistoryService;
     
     @Inject(()=> FileService)
     private filseService: FileService;
     
     @Inject(()=> CoinService)
     private coinService: CoinService;

     @Inject(()=> TokenService)
     private tokenService: TokenService;

     @Inject(()=> MemberDailyTasksModel)
     private memberDailyTasksModel: MemberDailyTasksModel;

     @Inject(()=> DailyTasksModel)
     private dailyTasksModel: DailyTasksModel;
     
     @Inject(()=> SwapHistoryModel)
     private swapHistoryModel: SwapHistoryModel;

     constructor() {
          super();
     }

     public async join(req: Request, res: Response, params: MemberA){
          // if(params.joinType == 'mobile'){

          //      if(params.platformKey.startsWith('+62')){
          //           params.platformKey = params.platformKey.substring(1)
          //      }
     
          //      if(params.platformKey.startsWith('08')){
          //           params.platformKey = '62'+params.platformKey.substring(1)
          //      }else if(params.platformKey.startsWith('6208')){
          //           params.platformKey = '62'+params.platformKey.substring(3)
          //      }

          //      if(params.verifyType == 'whatsapp'){
          //           await this.verifyWhatsapp(req, res, params.platformKey, 'join', params.otp);
          //      }else{
          //           await this.verifySms(req, res, params.platformKey, 'join', params.otp);
          //      }
          // }

          return await this.create(req, res, params);
     }

     //생성
     @Transaction() //트렌잭션 default REPEATABLE READ
     public async create(req: Request, res: Response, params: MemberA, manager?: EntityManager) {

          // if(params.joinType == 'mobile'){

          //      if(params.platformKey.startsWith('+62')){
          //           params.platformKey = params.platformKey.substring(1)
          //      }
     
          //      if(params.platformKey.startsWith('08')){
          //           params.platformKey = '62'+params.platformKey.substring(1)
          //      }else if(params.platformKey.startsWith('6208')){
          //           params.platformKey = '62'+params.platformKey.substring(3)
          //      }

          // }

          let termsList = params.termsNo.split(',');

          if(params.joinType == 'ios'){
               params.joinType = 'apple';
          }

          let compulsoryTerms = await this.termsService.compulsoryList(params.nation, manager);

          compulsoryTerms.list.forEach(function(terms, idx) {
               if(!termsList.includes(terms.seqNo.toString())){
                    throw new CoreError(ErrorType.E_NEED_COMPULSORY_TERMS, '필수약관 에러')
               }
          });

          let memberTotal: MemberTotal = new MemberTotal();

          const characters ='abcdefghijklmnopqrstuvwxyz';
          const charactersLength = characters.length;

          var isExist = true;
          var userKey = '';
          var st = ''
          do{
               st = characters.charAt(Math.floor(Math.random() * charactersLength));
               userKey = st + generateRandomString(3) + generateRandomString(3) + generateRandomString(3);

               if(!wordFilter(userKey, ['en'])){
                    let saved = await this.memberTotalModel.get(userKey, undefined, undefined, manager)
                    if(!saved){
                         isExist = false
                    }
               }

          }while(isExist);

          // var languages = [params.language]
          // if(params.language != 'en'){
          //      languages[1] = 'en'
          // }

          // if(wordFilter(params.nickname, languages)){
          //      throw new CoreError(ErrorType.E_INCLUDE_CURSING);
          // }

          var isNicknameExist = true;
          var nickname = params.nickname;
          if(nickname.length > 20){
               nickname = nickname.substring(0, 20)
          }
          do{
               
               isNicknameExist = await this.memberTotalModel.nicknameExist(nickname, manager);
               if(isNicknameExist){
                    nickname = nickname + getRandomNum(1, 0, 9);
               }else{
                    params.nickname = nickname;
               }

          }while(isNicknameExist);


          memberTotal.userKey = userKey;
          memberTotal.nation = params.nation;
          memberTotal.memberType = 'user';
          memberTotal.nickname = params.nickname;
          memberTotal.email = params.email;
          memberTotal.status = 'active';
          memberTotal.joinType = params.joinType;
          memberTotal.joinPlatform = params.joinPlatform;
          memberTotal.joinDatetime = now();
          memberTotal.platformKey = params.platformKey;


          let filter:MemberTotalListFilter = {};
          filter.condition = `platform_key = '${memberTotal.platformKey}'`;
          let saved = await this.memberTotalModel.getByFilter(filter, undefined, undefined, manager);
          if(saved){
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }
     
          await this.memberTotalModel.create(memberTotal, MemberTotal, manager);
          
          var type = instance[st]
          var member = new type();

          member.userKey = userKey;
          member.nation = params.nation;
          member.language = params.language;
          member.memberType = 'user';
          member.nickname = params.nickname;
          member.status = 'active';
          member.joinType = params.joinType;
          member.joinPlatform = params.joinPlatform;
          member.joinDatetime = memberTotal.joinDatetime;
          member.email = params.email;
          member.device = params.device;

          if(params.joinType == 'mobile'){
               member.platformKey = encrypt(params.platformKey);
               member.mobileNumber = member.platformKey;
               member.verifiedMobile = true;
          }else{
               member.platformEmail = params.platformEmail;
               member.platformKey = params.platformKey;
          }
          
          member.modDatetime = memberTotal.joinDatetime;
          member.point = 0;

          member.invitePoint = 0;

          member.recommendPoint = 0;

          await this.memberAModel.create(member, type, manager);

          await this.termsService.insertTermsAgree(member.userKey, termsList, manager);

          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'charge';
          historyPoint.category = 'join';
          historyPoint.point = 500;
          historyPoint.subject = 'join';
          historyPoint.comment = 'join';
          historyPoint.regDatetime = now();
          await this.updatePoint(historyPoint, member, manager);

          // let historyBall = new HistoryBall();
          // historyBall.userKey = member.userKey;
          // historyBall.type = 'charge';
          // historyBall.category = 'join';
          // historyBall.ball = 1;
          // historyBall.subject = getLang('id').joinPointSubject;
          // historyBall.comment = getLang('id').joinPointComment;
          // historyBall.regDatetime = now();
          // await this.updateBall(historyBall, member, manager);
          

          // if(process.env.NODE_ENV == 'PROD'){

          //      let wowMallParams = [{
          //           user_id: params.platformKey,
          //           name: params.nickname,
          //           email : params.email,
          //           mileage : 0,
          //           sns_type : ''
          //      }]
     
          //      if(params.joinType == 'apple'){
          //           wowMallParams[0].sns_type = 'A';
          //      }else if(params.joinType == 'google'){
          //           wowMallParams[0].sns_type = 'G';
          //      }else{
          //           wowMallParams[0].sns_type = 'M';
          //      }

          //      let url = 'https://wowboxmall.com/member_gate.php';
          //      _axios('post', url, wowMallParams);

          // }
          

          return member;
     }

     // public async wowMallJoin(member:MemberA){
     //      if(process.env.NODE_ENV == 'PROD'){

     //           let wowMallParams = [{
     //                user_id: member.joinType != 'mobile'? member.platformKey : decrypt(member.platformKey),
     //                name: member.nickname,
     //                email : member.email,
     //                mileage : 0,
     //                sns_type : ''
     //           }]
     
     //           if(member.joinType == 'apple'){
     //                wowMallParams[0].sns_type = 'A';
     //           }else if(member.joinType == 'google'){
     //                wowMallParams[0].sns_type = 'G';
     //           }else{
     //                wowMallParams[0].sns_type = 'M';
     //           }

     //           let url = 'https://wowboxmall.com/member_gate.php';
     //           _axios('post', url, wowMallParams);
     //           // console.log(resp);
     //      }
     //      return true;
     // }

     @Transaction()
     public async inputRecommender(req: Request, res: Response, recommendeeKey:string, member: MemberA, manager?: EntityManager){

          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager);
          member = await this.getMember(member.userKey, manager);

          if(member.recommendeeKey){
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }

          var recommender = await this.getMember(recommendeeKey, manager);
          if(!recommender){
               return false;
          }

          if(recommender.status != 'active'){
               return false;
          }

          memberTotal.recommendeeKey = recommendeeKey;
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);
          member.recommendeeKey = recommendeeKey;
          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);
          
          if(recommender){
               let invitePoint = recommender.invitePoint;

               if(invitePoint != null && invitePoint > 0){
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = member.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'inputRecommend';
                    historyPoint.point = invitePoint;
                    historyPoint.subject = 'join';
                    historyPoint.comment = 'join';
                    historyPoint.regDatetime = now();
                    await this.updatePoint(historyPoint, member, manager);
               } 

               await this.updateRecommender(req, res, recommender, manager);
          }
          return true;
     }

     public async updateRecommender(req: Request, res: Response, recommender: MemberA, manager?: EntityManager){

          let recommendPoint = 100;

          if(recommendPoint != null && recommendPoint > 0){
               try{
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = recommender.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'invite';
                    historyPoint.point = recommendPoint;
                    historyPoint.subject = 'join';
                    historyPoint.comment = 'join';
                    historyPoint.regDatetime = now();
                    await this.updatePoint(historyPoint, recommender, manager);
               }catch(e){
                    console.log('recommendPoint',e);
               }
               
          }

     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async updateProfile(req: Request, res: Response, profile: string, member:MemberA, manager?: EntityManager) {

          member = await this.getMember(member.userKey, manager);

          if(member.profile != profile){
               member.profile = profile
               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);
               
               await this.filseService.makeJson(member.userKey, profile);
          }

          return member;
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async update(req: Request, res: Response, params: MemberA, member:MemberA, manager?: EntityManager) {

          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager)
          member = await this.getMember(member.userKey, manager);

          if(params.nickname){
               if(member.nickname != params.nickname){
                    member.nickname = params.nickname
                    memberTotal.nickname = params.nickname
               }
          }

          if(params.birthday){
               if(member.birthday != params.birthday){
                    member.birthday = params.birthday
               }
          }

          if(params.gender){
               if(member.gender != params.gender){
                    member.gender = params.gender
               }
          }

          if(params.email){
               if(member.email != params.email){
                    member.email = params.email
                    memberTotal.email = params.email
               }
          }

          if(params.profile){
               if(member.profile != params.profile){
                    member.profile = params.profile
               }
          }

          if(params.nation){
               if(member.nation != params.nation){
                    member.nation = params.nation
                    memberTotal.nation = params.nation
               }
          }

          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction('SERIALIZABLE') //트렌잭션 default REPEATABLE READ
     public async updateMobileNumber(req: Request, res: Response, mobileNumber: string, member: MemberA, manager?: EntityManager){

          member = await this.getMember(member.userKey, manager);
          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager);

          if(!mobileNumber){
               throw new CoreError(ErrorType.E_INVALID_ARG);
          }

          mobileNumber = encrypt(mobileNumber);

          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     public async getProfile(userKey:string){
          let st = userKey.substring(0, 1);
          return await this.memberAModel.getProfile(userKey, st);
     }

     public async checkNickname(nickname:string, language:string){
          // if(!language){
          //      language = 'en'
          // }

          // var languages = [language]
          // if(language != 'en'){
          //      languages[1] = 'en'
          // }

          // if(wordFilter(nickname, languages)){
          //      throw new CoreError(ErrorType.E_INCLUDE_CURSING);
          // }

          let filter:MemberTotalListFilter = {};
          filter.nickname = nickname;
          let memberTotal = await this.memberTotalModel.getByFilter(filter);
          
          if(!memberTotal){
               return true;
          }else{
               return false;
          }
     }

     public async loginByPlatform(req: Request, res: Response, params:PlatformLoginParams){
          let filter:MemberTotalListFilter = {};
          filter.platformKey = params.platformKey
          let memberTotal:MemberTotal = await this.memberTotalModel.getByFilter(filter);
          if(!memberTotal || memberTotal.status == 'leave'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          let loginParms = new LoginParams();
          loginParms.userKey = memberTotal.userKey;
          loginParms.device = params.device;
          return await this.login(req, res, loginParms, true);

     }

     public async loginByUserKey(req: Request, res: Response, params:LoginParams){
          return await this.login(req, res, params, false);
     }

     public async login(req: Request, res: Response, params:LoginParams, isPlatform:boolean){
          let st = params.userKey.substring(0, 1);

          let member = await this.memberAModel.get(params.userKey, instance[st]);

          if(!member){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }
          if(!isPlatform && (member.device != params.device)){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(member.status == 'waitingLeave'){
               throw new CoreError(ErrorType.E_EXPIREDEXCEPTION);
          }

          if(member.status == 'stop'){
               throw new CoreError(ErrorType.E_NOTPERMISSION);
          }



          if(member.status == 'active'){

               await this.updateLoginStreakMember(member);
               member.lastLoginDatetime = now();
               
               if(member.device != params.device){
                    member.device = params.device;
               }

               console.log('redis start');
               let token = member.userKey + '-' + getUUIDv4();
               member.token = token;
               let refreshToken = await registRefreshToken(member.userKey);
               member.refreshToken = refreshToken;
               await setSession(req, member, token);
               console.log('redis end');
               await this.memberAModel.update(member, instance[st]);
               return member;
          } else {
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          
     }

     public async getSession(req: Request) {
          return await getSession(req);
     }

     public async reloadSession(req: Request) { 

          let session:MemberA = await getSession(req);

          let st = session.userKey.substring(0, 1);
          
          let member = await this.memberAModel.get(session.userKey, instance[st]);
          
          if(!member) throw new CoreError(ErrorType.E_EXPIRED_SESSION, '가입되지 않은 회원입니다');

          if(member.status != 'active'){
               new CoreError(ErrorType.E_EXPIRED_SESSION);
          }

          await this.updateLoginStreakMember(member);
          member.lastLoginDatetime = now();
          member.token = session.token;
          await this.memberAModel.update(member, instance[st]);
          return await setSession(req, member);
     }

     public async refreshToken(req: Request, res: Response) {

          let decryptedSessionKey: any = req.headers.token;
          let decryptedRefreshKey: any = req.headers.refreshtoken;
  
          let session = null;
          let error;
          try{
              session = await getSession({headers: {token: decryptedSessionKey, device : req.headers.device}});
          }catch(e) {
  
          }
          
          if(session) {
               console.log(session);
              throw new CoreError(ErrorType.E_NOTPERMISSION, '세션 변경 불가');
          }
  
          let userKey = decryptedSessionKey.split('-')[0];
          let st = userKey.substring(0, 1);
  
          let refreshToken = await getRefreshToken(userKey);
  
          if(!refreshToken) {
              throw new CoreError(ErrorType.E_NOTFOUND, '토큰 만료');
          }
          console.log('refresh : '+decryptedRefreshKey);
          console.log('refresh : '+refreshToken);
          if(decryptedRefreshKey != refreshToken) {
              throw new CoreError(ErrorType.E_NOTFOUND, '허용되지 않은 토큰');
          }
  
          let member = await this.memberAModel.get(userKey, instance[st]);
     
          let token = member.userKey + '-' + getUUIDv4();
          
          await setSession(req, member, token);
          res.setHeader('token', token);
          return token;
      }


     public async updatePoint(historyPoint:HistoryPoint, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          switch(historyPoint.type){
               case 'charge':
                    member.point += historyPoint.point;
                    break;
               case 'provide':
                    member.point += historyPoint.point;
                    break;
               case 'used':
                    member.point -= historyPoint.point;
                    break;
               case 'retrieve':
                    member.point -= historyPoint.point;
                    break;
          }

          await this.memberAModel.update(member, instance[st], manager);
          await this.historyService.insertHistoryPoint(historyPoint, member, manager);

          return member;
     }

     public async updateLottery(historyLottery:HistoryLottery, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          switch(historyLottery.type){
               case 'charge':
                    member.lotteryCount += historyLottery.count;
                    break;
               case 'provide':
                    member.lotteryCount += historyLottery.count;
                    break;
               case 'used':
                    member.lotteryCount -= historyLottery.count;
                    break;
               case 'retrieve':
                    member.lotteryCount -= historyLottery.count;
                    break;
          }

          await this.memberAModel.update(member, instance[st], manager);
          await this.historyService.insertHistoryLottery(historyLottery, member, manager);

          return member;
     }
     
     public async updateTether(historyTether:HistoryTether, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          switch(historyTether.type){
               case 'charge':
                    member.tether += historyTether.tether;
                    break;
               case 'provide':
                    member.tether += historyTether.tether;
                    break;
               case 'used':
                    member.tether -= historyTether.tether;
                    break;
               case 'retrieve':
                    member.tether -= historyTether.tether;
                    break;
          }

          await this.memberAModel.update(member, instance[st], manager);
          await this.historyService.insertHistoryTether(historyTether, member, manager);

          return member;
     }




     public async getMember(userKey:string, manager?: EntityManager){
          let st = userKey.substring(0, 1);
          return await this.memberAModel.get(userKey, instance[st], undefined, manager);
     }

     public async updateMember(member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async withdrawalWithVerify(req: Request, res: Response, reason:string, verifyType: string, otp:string, member:MemberA, manager?: EntityManager){

          // if(verifyType == 'whatsapp'){
          //      await this.verifyWhatsapp(req, res, member.mobileNumber, 'withdrawal', otp);
          // }else{
          //      await this.verifySms(req, res, member.mobileNumber, 'withdrawal', otp);
          // }
          
          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager);
          memberTotal.status = 'waitingLeave';
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          member = await this.getMember(member.userKey, manager);
          member.status = 'waitingLeave';
          member.leaveMsg = reason;
          member.leaveRequestDatetime = now();
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async withdrawalCancelWithVerify(req: Request, res: Response, userKey:string, mobileNumber: string, verifyType: string, otp:string, manager?: EntityManager){
          
          // if(verifyType == 'whatsapp'){
          //      await this.verifyWhatsapp(req, res, mobileNumber, 'withdrawalCancel', otp);
          // }else{
          //      await this.verifySms(req, res, mobileNumber, 'withdrawalCancel', otp);
          // }

          let memberTotal = await this.memberTotalModel.get(userKey, undefined, undefined, manager);
          memberTotal.status = 'active';
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          let member = await this.getMember(userKey, manager);
          member.status = 'active';
          member.leaveMsg = null;
          member.leaveRequestDatetime = null;
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async withdrawal(req: Request, res: Response, reason:string, authNumber: string, member:MemberA, manager?: EntityManager){

          // let key = `auth-${authNumber}-withdrawal`;
          // let email = await Redis.getInstance().hGet(key);
          // if(!email) {
          //      throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          // }
          
          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager);
          memberTotal.status = 'waitingLeave';
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          member = await this.getMember(member.userKey, manager);
          member.status = 'waitingLeave';
          member.leaveMsg = reason;
          member.leaveRequestDatetime = now();
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async withdrawalByPlatformKey(req: Request, res: Response, reason:string, platformKey: string, manager?: EntityManager){

          let filter:MemberTotalListFilter = {};
          filter.platformKey = platformKey;
          let memberTotal:MemberTotal = await this.memberTotalModel.getByFilter(filter);
          if(memberTotal != null){
               memberTotal.status = 'waitingLeave';
               await this.memberTotalModel.update(memberTotal, MemberTotal, manager);
     
               let member = await this.getMember(memberTotal.userKey, manager);
               member.status = 'waitingLeave';
               member.leaveMsg = reason;
               member.leaveRequestDatetime = now();
               member.modDatetime = now();
     
               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);
               return true;
          }else{
               return false;
          }
     }

     @Transaction()
     public async withdrawalCancel(req: Request, res: Response, params: WithdrawalCancelParams, manager?: EntityManager){
          
          // let key = `auth-${authNumber}-withdrawalCancel`;
          // let email = await Redis.getInstance().hGet(key);
          // if(!email) {
          //      throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          // }

          let memberTotal = await this.memberTotalModel.getByFilter({platformKey: params.platformKey, status: 'waitingLeave'}, undefined, undefined, manager);
          if(!memberTotal) {
               throw new CoreError(ErrorType.E_NOTFOUND); 
          }
          memberTotal.status = 'active';
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          let member = await this.getMember(memberTotal.userKey, manager);
          member.status = 'active';
          member.leaveMsg = null;
          member.leaveRequestDatetime = null;
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     // @Transaction()
     // public async authWalletEmail(req: Request, res: Response, userKey:string, authNumber: string, authEmail:string, manager?: EntityManager){
     
     //      let key = `auth-${authNumber}-wallet`;
     //      let email = await Redis.getInstance().hGet(key);

     //      if(!email) {
     //           throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
     //      }
     //      if(authEmail != email){
     //           throw new CoreError(ErrorType.E_NOTMATCH_AUTH_EMAIL, 'authEmail is invaild');
     //      }

     //      let memberTotal = await this.memberTotalModel.get(userKey);
     //      await this.memberTotalModel.update(memberTotal, MemberTotal);

     //      let member = await this.getMember(userKey);
     //      member.authEmail = email;
     //      member.email = email;
     //      member.modDatetime = now();

     //      let st = member.userKey.substring(0, 1);
     //      await this.memberAModel.update(member, instance[st], manager);

     //      var walletSignUpRes = await this.buffWalletService.walletSignUp(req, res, member);
     //      if(walletSignUpRes.result == 'SUCCESS'){
     //           return true;
     //      }else{
     //           throw new CoreError(ErrorType.E_ALREADY_EXIST);
     //      }
     // }


     //리스트 & 조인
     public async inviteList(paging: IPaging, member:MemberA) {

          let filter : MemberTotalListFilter = {};
          filter.recommendeeKey = member.userKey;
          
          let order : IOrder[] = [
               {
                    column: 'join_datetime',
                    dir: 'DESC'
               }
          ]

          return await this.memberTotalModel.list(filter, order, paging);
     }

     @Transaction()
     public async makeInviteUrl(req: Request, res: Response, member:MemberA, manager?: EntityManager){
          var express = require('express');
          var app = express();
          var client_id = '8kRMnc_kxAz_e3b6Wcyh';//개발자센터에서 발급받은 Client ID
          var client_secret = 'haoPpkY7g0'; //개발자센터에서 발급받은 Client Secret


          let params = encodeURI(`https://www.wowboxapp.com/index.html?recommendKey=${member.userKey}`);
          let url = `https://openapi.naver.com/v1/util/shorturl?url=${params}`
          let resp: any = {};
          try {
               resp = await axios({
               url: url,
               method: 'get',
               responseEncoding: 'utf-8',
               headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
               });

               if(resp.data.code == '200'){
                    console.log('resp.data:',resp.data);
                    let inviteUrl = resp.data.result.url
                    member = await this.getMember(member.userKey, manager);
                    member.inviteUrl = inviteUrl;
                    let st = member.userKey.substring(0, 1);
                    await this.memberAModel.update(member, instance[st], manager);
                    return inviteUrl;
               }else{
                    throw new CoreError(ErrorType.E_INTERNAL_SERVER, resp.data.message);     
               }
          } catch(e) {
               console.log('e:',e)
               throw new CoreError(ErrorType.E_INTERNAL_SERVER, e);
          }
     }

     public async getInviteInfo(userKey:string){
          let member = await this.getMember(userKey);
          let result = {
               invitePoint : 0,
               inviteTicket : 0,
               inviteBall : 0

          };
          result.invitePoint = member.invitePoint;
          return result;
     }

     public async checkEnableAttendance(req: Request, res: Response, member: MemberA){
          member = await this.getMember(member.userKey);
          if (member.attendanceCount && member.attendanceCount > 0 && member.attendanceDate) {
               // Get only the date part of the attendance date
               let attendanceDate = new Date(member.attendanceDate);
               attendanceDate.setHours(0, 0, 0, 0);
               attendanceDate.setDate(attendanceDate.getDate() + 1);
               
               // Get only the date part of the current date
               let currentDate = new Date();
               currentDate.setHours(0, 0, 0, 0);
               console.log('attendanceDate : ',attendanceDate);
               console.log('currentDate : ',currentDate);
               
               if (currentDate.getTime() >= attendanceDate.getTime()) {
                    return true;
               }else{
                    return false;
               }
          }else{
               return true;
          }
     }

     @Transaction()
     public async attendance(req: Request, res: Response, member: MemberA, manager?: EntityManager) {
          member = await this.getMember(member.userKey, manager);
          if (member.attendanceCount && member.attendanceCount > 0 && member.attendanceDate) {
               // Get only the date part of the attendance date
               let attendanceDate = new Date(member.attendanceDate);
               attendanceDate.setHours(0, 0, 0, 0);
               attendanceDate.setDate(attendanceDate.getDate() + 1);
               
               // Get only the date part of the current date
               let currentDate = new Date();
               currentDate.setHours(0, 0, 0, 0);
               
               if (currentDate.getTime() >= attendanceDate.getTime()) {
                    member.attendanceCount += 1;
                    member.attendanceDate = now();
               } else {
                    throw new CoreError(ErrorType.E_TIME_LIMIT);
               }
          } else {
               member.attendanceCount += 1;
               member.attendanceDate = now();
          }

          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);

          // var attendancePoint = 0;
          var lotteryCount = 1;
          if (member.attendanceCount >= 28) {
               member.attendanceCount = 0;
               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);
               // attendancePoint = Math.floor(Math.random() * 41) + 10;
               lotteryCount = 5;
          } else {
               // attendancePoint = Math.floor(Math.random() * 5) + 1;
               lotteryCount = 1;
          }
          let historyLottery = new HistoryLottery();
          historyLottery.userKey = member.userKey;
          historyLottery.type = 'charge';
          historyLottery.category = 'attendance';
          historyLottery.count = lotteryCount;
          historyLottery.subject = 'attendance';
          historyLottery.comment = 'attendance';
          historyLottery.regDatetime = now();
          await this.updateLottery(historyLottery, member, manager);

          return lotteryCount;
     }

     
     @Transaction()
     public async confirmDivc(req: Request, res: Response, mobileNumber:string, wallet: string, manager?: EntityManager){

          if(!mobileNumber){
               throw new CoreError(ErrorType.E_INVALID_ARG, 'mobileNumber is null')
          }

          if(!wallet){
               throw new CoreError(ErrorType.E_INVALID_ARG, 'wallet is null')
          }

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          let filter:MemberTotalListFilter = {};
          filter.mobileNumber = encrypt(mobileNumber);
          filter.verifiedMobile = true;
          let memberTotal = await this.memberTotalModel.getByFilter(filter, undefined, undefined, manager);
          if(!memberTotal){
               return 'not authorization'
          }

          this.memberTotalModel.update(memberTotal, MemberTotal, manager);
          var member = await this.getMember(memberTotal.userKey);
          member.wallet = wallet;
          this.updateMember(member, manager);
          

          await this.coinService.sendDivc(req, res, wallet, '0.1');
          await this.coinService.sendToken(req, res, 'WOW', wallet, '1', 'receive');
          
          return 'success'
     }

     public async checkJoinedMobile(req: Request, res: Response, mobileNumber:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }



          let filter:MemberTotalListFilter = {};
          filter.mobileNumber = encrypt(mobileNumber)
          // filter.condition = `mobile_number = '${encrypt(mobileNumber)}' or platform_key = '${encrypt(mobileNumber)}'`;
          let memberTotal = await this.memberTotalModel.getByFilter(filter);
          if(!memberTotal){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(memberTotal.platformKey != encrypt(mobileNumber)){
               if(memberTotal.joinType == 'apple'){
                    throw new CoreError(ErrorType.E_APPLE_MEMBER_PLATFORM);
               }else if(memberTotal.joinType == 'google'){
                    throw new CoreError(ErrorType.E_GOOGLE_MEMBER_PLATFORM);
               }
          }

          return true;
     }

     public async checkJoinedMobileNumber(req: Request, res: Response, mobileNumber:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          let filter:MemberTotalListFilter = {};
          // filter.platformKey = encrypt(mobileNumber)
          filter.condition = `mobile_number = '${encrypt(mobileNumber)}' or platform_key = '${encrypt(mobileNumber)}'`;
          let memberTotal = await this.memberTotalModel.getByFilter(filter);
          if(!memberTotal){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }
          return true;
     }

     public async checkJoinedPlatformKey(req: Request, res: Response, platformKey:string){


          let filter:MemberTotalListFilter = {};
          filter.platformKey = platformKey;

          console.log(11111);
          let memberTotal = await this.memberTotalModel.getByFilter(filter);
          if(!memberTotal){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          console.log(22222);
          return {message: 'OK'};
     }

     public async getTokenBalance(tokenName:string, member:MemberA, manager?: EntityManager){

          member = await this.getMember(member.userKey);

          if(!member.wallet){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          let balance = await this.coinService.getTokenBalance(tokenName, member.wallet);
          return balance.toFixed(4);
     }

     public async updateLoginStreakMember(user: MemberA) {

          let today = now('YYYY-MM-DD 00:00:00');

          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>updateLoginStreakMember')

          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!user.lastLoginDatetime', !user.lastLoginDatetime)
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>user.lastLoginDatetime < today', user.lastLoginDatetime < today)

          if(!user.lastLoginDatetime || user.lastLoginDatetime < today) {

              let cap = await this.dailyTasksModel.getCount();
              let lastClaimedDailyTask = (await this.memberDailyTasksModel.dailyTasks(user.userKey))[0];
  

              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111', user.lastLoginDatetime > moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00'))
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>22222', lastClaimedDailyTask)
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333', user.loginStreak <= cap)

              if(
                  user.lastLoginDatetime > moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')
                  && lastClaimedDailyTask && lastClaimedDailyTask.created_at > moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')
                  && lastClaimedDailyTask.created_at < today
                  && user.loginStreak <= cap
              ) {
                  user.loginStreak = user.loginStreak + 1;
              } else {
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>false', user.loginStreak)
                    user.loginStreak = 1;
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>false', user.loginStreak)
                    await this.memberDailyTasksModel.resetDailyTasks(user.userKey);
              }
  
          //     await this.memberAModel.update(user);
          }
  
      }

     @Transaction()
     public async swapCoin(req: Request, res: Response, type:string, address:string, amount: number, member:MemberA, manager?: EntityManager){
        member = await this.getMember(member.userKey, manager);
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
            case 'usdt':
                
                if(amount < 10){
                    throw new CoreError(ErrorType.E_NOTPERMISSION);
                }

                if(amount > member.tether){
                    throw new CoreError(ErrorType.E_LACK_COST);
                }

                coin = amount

                let historyTether = new HistoryTether();
                historyTether.userKey = member.userKey;
                historyTether.type = 'used';
                historyTether.category = 'Exchange';
                historyTether.tether = amount;
                historyTether.subject = 'Tether Exchange';
                historyTether.comment = 'Tether Exchange';
                historyTether.regDatetime = now();
                await this.updateTether(historyTether, member, manager);

                await this.tokenService.sendToken('USDT', address, coin);
                break;
            case 'div':

                let usePoint = amount*divRate;
            
                if(amount < 10){
                    throw new CoreError(ErrorType.E_NOTPERMISSION);
                }

                if(usePoint > member.point){
                    throw new CoreError(ErrorType.E_LACK_COST);
                }

                coin = amount;

                let historyPoint = new HistoryPoint();
                historyPoint.userKey = member.userKey;
                historyPoint.type = 'used';
                historyPoint.category = 'Exchange';
                historyPoint.point = usePoint;
                historyPoint.subject = 'DVIC Exchange';
                historyPoint.comment = 'DVIC Exchange';
                historyPoint.regDatetime = now();
                await this.updatePoint(historyPoint, member, manager);

                await this.tokenService.sendToken('DIVC', address, coin);
                
                break;
        }
        

        let swapHistory = new SwapHistory();
        swapHistory.userKey = member.userKey;
        swapHistory.status = 'complete';
        swapHistory.type = type;
        swapHistory.address = address;
        swapHistory.amount = coin;
        swapHistory.updated_at = now();
        swapHistory.created_at = now();
        await this.swapHistoryModel.create(swapHistory, undefined, manager);

        return swapHistory;
    }

     @Transaction()
     public async updateLotteryCount(req: Request, res: Response, params, member: MemberA, manager?: EntityManager) {
          let dateStr = now();
          let today = moment(dateStr).format('YYYY-MM-DD');
          let type = params.category;
          // switch(type){
          //      case 'numberBaseball':
          //           break;
          //      case 'pattern':
          //           break;
          // }

          let todayRewardCount = await Redis.getInstance().hGet(member.userKey+'_'+type+'_'+today);

          if(!todayRewardCount){
               todayRewardCount = 0;
           }

          if(todayRewardCount < 3){

               let historyLottery = new HistoryLottery();
               historyLottery.userKey = member.userKey;
               historyLottery.type = params.type;
               historyLottery.category = params.category;
               historyLottery.count = params.count;
               historyLottery.subject = params.subject;
               historyLottery.comment = params.comment;
               historyLottery.regDatetime = now();
               await this.updateLottery(historyLottery, member, manager);


               todayRewardCount++;
               await Redis.getInstance().hSet(member.userKey+'_'+type+'_'+today, todayRewardCount, 1 * 24 * 60 * 60);

               return ErrorType.E_SUCCESS;
          }else{
               throw new CoreError(ErrorType.E_ALREADY_LIMIT);
          }
          
     }
}