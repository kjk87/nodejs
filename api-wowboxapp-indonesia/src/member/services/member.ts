import { HistoryCommission } from './../../history/entities/histroy_commission';
// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { Any, EntityManager } from "typeorm";
import { authMail, decrypt, encrypt, getLang, getRandomNum, getUUIDv4, now, sendEmail, wordFilter } from "../../common/services/util";
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
import { HistoryService } from "../../history/services/history";
import { HistoryBall } from "../../history/entities/histroy_ball";
import { LotteryJoinCreateParams, LotteryJoinService } from "../../lottery/services/lottery_join";
import { LANGUAGE } from "../../language";
import { PartnerService } from "../../partner/services/partner";
import { Partner } from "../../partner/entities/partner";
import { HistoryCommissionType } from '../../common/services/type';
import { FileService } from '../../file/service/file';
import { BuffWalletService } from '../../buffWallet/services/buff_wallet';
import { _axios } from '../../common/services/axios';
import axios from 'axios';
import { HistoryCash } from '../../history/entities/histroy_cash';
import { CoinService } from '../../coin/services/coin';


export interface MemberTotalListFilter extends ListFilter {
    userKey?: string;
    email?: string;
    nickname?: string;
    platformKey?: string;
    recommendeeKey?: string;
    isAuthEmail?: boolean;
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

     @Inject(()=> LotteryJoinService)
     private lotteryJoinService: LotteryJoinService;

     @Inject(()=> PartnerService)
     private partnerService: PartnerService;
     
     @Inject(()=> FileService)
     private filseService: FileService;
     
     @Inject(()=> CoinService)
     private coinService: CoinService;

     constructor() {
          super();
     }

     //생성
     @Transaction() //트렌잭션 default REPEATABLE READ
     public async create(req: Request, res: Response, params: MemberA, manager?: EntityManager) {

          if(params.joinType == 'mobile'){

               if(params.platformKey.startsWith('+62')){
                    params.platformKey = params.platformKey.substring(1)
               }
     
               if(params.platformKey.startsWith('08')){
                    params.platformKey = '62'+params.platformKey.substring(1)
               }else if(params.platformKey.startsWith('6208')){
                    params.platformKey = '62'+params.platformKey.substring(3)
               }

               // if(params.verifyType == 'whatsapp'){
               //      await this.verifyWhatsapp(req, res, params.platformKey, 'join', params.otp);
               // }else{
               //      await this.verifySms(req, res, params.platformKey, 'join', params.otp);
               // }

          }

          if(params.mobileNumber){
               if(params.mobileNumber.startsWith('+62')){
                    params.mobileNumber = params.mobileNumber.substring(1)
               }
     
               if(params.mobileNumber.startsWith('08')){
                    params.mobileNumber = '62'+params.mobileNumber.substring(1)
               }else if(params.mobileNumber.startsWith('6208')){
                    params.mobileNumber = '62'+params.mobileNumber.substring(3)
               }
          }

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
          memberTotal.isAuthEmail = false;
          if(params.joinType == 'mobile'){
               memberTotal.platformKey = encrypt(params.platformKey);
               memberTotal.mobileNumber = memberTotal.platformKey;
               memberTotal.verifiedMobile = true;
          }else{
               memberTotal.platformKey = params.platformKey;
               if(params.mobileNumber){
                    memberTotal.mobileNumber = encrypt(params.mobileNumber);
                    memberTotal.verifiedMobile = true;
               }
          }

          let filter:MemberTotalListFilter = {};
          filter.condition = `mobile_number = '${memberTotal.mobileNumber}' or platform_key = '${memberTotal.platformKey}'`;
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
               if(params.mobileNumber){
                    member.mobileNumber = encrypt(params.mobileNumber);
                    member.verifiedMobile = true;
               }
          }
          
          member.modDatetime = memberTotal.joinDatetime;
          member.isAuthEmail = false;
          member.point = 0;
          member.ball = 0;
          member.candy = 0;
          member.marketingReceiving = false;

          member.invitePoint = 0;
          member.inviteTicket = 0;
          member.inviteBall = 2;
          member.inviteCash = 0;

          member.recommendPoint = 0;
          member.recommendTicket = 0;
          member.recommendBall = 3;
          member.recommendBuff = 0;
          member.recommendCash = 0;
          member.recommendWowbox = 0;

          await this.memberAModel.create(member, type, manager);

          await this.termsService.insertTermsAgree(member.userKey, termsList, manager);

          // let histroyCash = new HistoryCash();
          // histroyCash.userKey = member.userKey;
          // histroyCash.type = 'charge';
          // histroyCash.category = 'join';
          // histroyCash.cash = 1000;
          // histroyCash.subject = getLang('id').joinCashSubject;
          // histroyCash.comment = getLang('id').joinCashComment;
          // histroyCash.regDatetime = now();
          // await this.updateCash(histroyCash, member, manager);

          // let historyPoint = new HistoryPoint();
          // historyPoint.userKey = member.userKey;
          // historyPoint.type = 'charge';
          // historyPoint.category = 'join';
          // historyPoint.point = 1000;
          // historyPoint.subject = getLang('id').joinPointSubject;
          // historyPoint.comment = getLang('id').joinPointComment;
          // historyPoint.regDatetime = now();
          // await this.updatePoint(historyPoint, member, manager);

          let historyBall = new HistoryBall();
          historyBall.userKey = member.userKey;
          historyBall.type = 'charge';
          historyBall.category = 'join';
          historyBall.ball = 1;
          historyBall.subject = getLang('id').joinPointSubject;
          historyBall.comment = getLang('id').joinPointComment;
          historyBall.regDatetime = now();
          await this.updateBall(historyBall, member, manager);
          

          if(process.env.NODE_ENV == 'PROD'){

               let wowMallParams = [{
                    user_id: params.platformKey,
                    name: params.nickname,
                    email : params.email,
                    mileage : 0,
                    sns_type : ''
               }]
     
               if(params.joinType == 'apple'){
                    wowMallParams[0].sns_type = 'A';
               }else if(params.joinType == 'google'){
                    wowMallParams[0].sns_type = 'G';
               }else{
                    wowMallParams[0].sns_type = 'M';
               }

               let url = 'https://wowboxmall.com/member_gate.php';
               _axios('post', url, wowMallParams);
               // console.log(resp);
          }
          

          return member;
     }

     public async wowMallJoin(member:MemberA){
          if(process.env.NODE_ENV == 'PROD'){

               let wowMallParams = [{
                    user_id: member.joinType != 'mobile'? member.platformKey : decrypt(member.platformKey),
                    name: member.nickname,
                    email : member.email,
                    mileage : 0,
                    sns_type : ''
               }]
     
               if(member.joinType == 'apple'){
                    wowMallParams[0].sns_type = 'A';
               }else if(member.joinType == 'google'){
                    wowMallParams[0].sns_type = 'G';
               }else{
                    wowMallParams[0].sns_type = 'M';
               }

               let url = 'https://wowboxmall.com/member_gate.php';
               _axios('post', url, wowMallParams);
               // console.log(resp);
          }
          return true;
     }

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

          memberTotal.recommendeeKey = recommendeeKey;
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);
          member.recommendeeKey = recommendeeKey;
          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);
          
          if(recommender){
               let invitePoint = recommender.invitePoint;
               let inviteTicket = recommender.inviteTicket;
               let inviteBall = recommender.inviteBall;
               let inviteCash = recommender.inviteCash;

               if(invitePoint != null && invitePoint > 0){
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = member.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'inputRecommend';
                    historyPoint.point = invitePoint;
                    historyPoint.subject = getLang('id').joinRecommendPointSubject;
                    historyPoint.comment = getLang('id').joinRecommendPointContents;
                    historyPoint.regDatetime = now();
                    await this.updatePoint(historyPoint, member, manager);
               }

               if(inviteBall != null && inviteBall > 0){
                    let historyBall = new HistoryBall();
                    historyBall.userKey = member.userKey;
                    historyBall.type = 'charge';
                    historyBall.category = 'inputRecommend';
                    historyBall.ball = inviteBall;
                    historyBall.subject = getLang('id').joinRecommendBallSubject;
                    historyBall.comment = getLang('id').joinRecommendBallContents;
                    historyBall.regDatetime = now();
                    await this.updateBall(historyBall, member, manager);
               }

               if(inviteTicket != null && inviteTicket > 0){
                    let param = new LotteryJoinCreateParams();
                    param.count = inviteTicket;
                    param.joinType = 'inputRecommend';
                    param.userKey = member.userKey;
                    await this.lotteryJoinService.lotteryJoin(param, member, manager);
               }

               if(inviteCash != null && inviteCash > 0){
                    let histroyCash = new HistoryCash();
                    histroyCash.userKey = member.userKey;
                    histroyCash.type = 'charge';
                    histroyCash.category = 'inputRecommend';
                    histroyCash.cash = inviteCash;
                    histroyCash.subject = getLang('id').inputRecommenderCashSubject;
                    histroyCash.comment = getLang('id').inputRecommenderCashComment.replace('##', inviteCash);
                    histroyCash.regDatetime = now();
                    await this.updateCash(histroyCash, member, manager);
               }
               

               await this.updateRecommender(req, res, recommender, manager);
          }
          return true;
     }

     public async updateRecommender(req: Request, res: Response, recommender: MemberA, manager?: EntityManager){

          let recommendPoint = recommender.recommendPoint;
          let recommendTicket = recommender.recommendTicket;
          let recommendBall = recommender.recommendBall;
          let recommendBuff = recommender.recommendBuff;
          let recommendCash = recommender.recommendCash;

          if(recommendPoint != null && recommendPoint > 0){
               try{
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = recommender.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'invite';
                    historyPoint.point = recommendPoint;
                    historyPoint.subject = getLang(recommender.language).invitePointSubject;
                    historyPoint.comment = getLang(recommender.language).invitePointComment;
                    historyPoint.regDatetime = now();
                    await this.updatePoint(historyPoint, recommender, manager);
               }catch(e){
                    console.log('recommendPoint',e);
               }
               
          }

          if(recommendTicket != null && recommendTicket > 0){
               try{
                    await this.lotteryJoinService.inviteLotteryJoin(recommender, recommendTicket, manager);
               }catch(e){
                    console.log('recommendTicket',e);
               }
               
          }

          if(recommendBall != null && recommendBall > 0){
               try{
                    let historyBall = new HistoryBall();
                    historyBall.userKey = recommender.userKey;
                    historyBall.type = 'charge';
                    historyBall.category = 'invite';
                    historyBall.ball = recommendBall;
                    historyBall.subject = getLang(recommender.language).inviteLuckyballSubject;
                    historyBall.comment = getLang(recommender.language).inviteLuckyballComment;
                    historyBall.regDatetime = now();
                    await this.updateBall(historyBall, recommender, manager);
               }catch(e){
                    console.log('recommendBall',e);
               }
               
          }

          // if(recommendBuff != null && recommendBuff > 0 && recommender.authEmail && recommender.isAuthEmail){
          //      try{
          //           await this.buffWalletService.updateCoin('EVENT', true, recommendBuff, recommender);
          //      }catch(e){
          //           console.log('recommendBuff',e);
          //      }
               
          // }

          if(recommendCash != null && recommendCash > 0){
               try{
                    let histroyCash = new HistoryCash();
                    histroyCash.userKey = recommender.userKey;
                    histroyCash.type = 'charge';
                    histroyCash.category = 'invite';
                    histroyCash.cash = recommendCash;
                    histroyCash.subject = getLang('id').inviteRpSubject;
                    histroyCash.comment = getLang('id').inviteRpComment;
                    histroyCash.regDatetime = now();
                    await this.updateCash(histroyCash, recommender, manager);
               }catch(e){
                    console.log('recommendCash',e);
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

               // var languages = [params.language]
               // if(params.language != 'id'){
               //      languages[1] = 'en'
               // }

               // if(wordFilter(params.nickname, languages)){
               //      throw new CoreError(ErrorType.E_INCLUDE_CURSING);
               // }

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

          member.mobileNumber = mobileNumber;
          memberTotal.mobileNumber = mobileNumber;

          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async updateVerifiedMobileNumber(req: Request, res: Response, mobileNumber: string, verifyType: string, otp:string, member: MemberA, manager?: EntityManager){

          if(!mobileNumber){
               throw new CoreError(ErrorType.E_INVALID_ARG);
          }

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber = '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          let filter:MemberTotalListFilter = {};
          filter.mobileNumber = encrypt(mobileNumber);
          filter.verifiedMobile = true;
          let dupleUser = await this.memberTotalModel.getByFilter(filter, undefined, undefined, manager)
          if(dupleUser){
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }

          if(verifyType == 'whatsapp'){
               await this.verifyWhatsapp(req, res, mobileNumber, 'update_mobile', otp);
          }else{
               await this.verifySms(req, res, mobileNumber, 'update_mobile', otp);
          }

          member = await this.getMember(member.userKey, manager);
          let memberTotal = await this.memberTotalModel.get(member.userKey, undefined, undefined, manager);


          mobileNumber = encrypt(mobileNumber);

          memberTotal.mobileNumber = mobileNumber;
          memberTotal.verifiedMobile = true;

          member.mobileNumber = mobileNumber;
          member.verifiedMobile = true;

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

     public async loginByMobile(req: Request, res: Response, params:MobileLoginParams){

          if(params.platformKey.startsWith('+62')){
               params.platformKey = params.platformKey.substring(1)
          }

          if(params.platformKey.startsWith('08')){
               params.platformKey = '62'+params.platformKey.substring(1)
          }else if(params.platformKey.startsWith('6208')){
               params.platformKey = '62'+params.platformKey.substring(3)
          }

          if(params.verifyType == 'whatsapp'){
               await this.verifyWhatsapp(req, res, params.platformKey, 'login', params.otp);
          }else{
               await this.verifySms(req, res, params.platformKey, 'login', params.otp);
          }

          

          let filter:MemberTotalListFilter = {};
          filter.platformKey = encrypt(params.platformKey);
          let memberTotal:MemberTotal = await this.memberTotalModel.getByFilter(filter);
          if(!memberTotal || memberTotal.status == 'leave'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          let loginParms = new LoginParams();
          loginParms.userKey = memberTotal.userKey;
          loginParms.device = params.device;
          return await this.login(req, res, loginParms, true);
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
          if(!member || member.status == 'leave'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(!isPlatform && (member.device != params.device)){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(member.status == 'active'){
               // member.lastLoginDatetime = now();
               if(member.device != params.device){
                    member.device = params.device;
                    await this.memberAModel.update(member, instance[st]);
               }

               console.log('redis start');
               let token = member.userKey + '-' + getUUIDv4();
               member.token = token;
               let refreshToken = await registRefreshToken(member.userKey);
               member.refreshToken = refreshToken;
               await setSession(req, member, token);
               console.log('redis end');
          }

          return member;
     }

     public async getSession(req: Request) {
          return await getSession(req);
     }

     public async reloadSession(req: Request) { 

          let session:MemberA = await getSession(req);

          let st = session.userKey.substring(0, 1);
          
          let member = await this.memberAModel.get(session.userKey, instance[st]);
          
          if(!member) throw new CoreError(ErrorType.E_NOTFOUND, '가입되지 않은 회원입니다');
          member.token = session.token;
  
          return await setSession(req, member);
     }

     public async refreshToken(req: Request, res: Response, params: RefreshKeyParams) {

          let decryptedSessionKey = params.token;
          let decryptedRefreshKey = params.refreshToken;
  
          let session = null;
          let error;
          try{
              session = await getSession({headers: {token: decryptedSessionKey, device : params.device}});
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

     public async updateCash(historyCash:HistoryCash, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          switch(historyCash.type){
               case 'charge':
                    member.cash += historyCash.cash;
                    break;
               case 'provide':
                    member.cash += historyCash.cash;
                    break;
               case 'used':
                    member.cash -= historyCash.cash;
                    break;
               case 'retrieve':
                    member.cash -= historyCash.cash;
                    break;
          }

          await this.memberAModel.update(member, instance[st], manager);
          await this.historyService.insertHistoryCash(historyCash, member, manager);

          return member;
     }


     public async updateBall(historyBall:HistoryBall, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          switch(historyBall.type){
               case 'charge':
                    member.ball += historyBall.ball;
                    break;
               case 'provide':
                    member.ball += historyBall.ball;
                    break;
               case 'used':
                    member.ball -= historyBall.ball;
                    break;
               case 'retrieve':
                    member.ball -= historyBall.ball;
                    break;
          }

          await this.memberAModel.update(member, instance[st], manager);
          await this.historyService.insertHistoryBall(historyBall, member, manager);

          return null;
     }

     @Transaction('SERIALIZABLE')
     public async exchangePointToBall(req: Request, res: Response, ball:number, member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);

          if(!ball){
               throw new CoreError(ErrorType.E_INVALID_ARG, 'ball is null');
          }

          member = await this.memberAModel.get(member.userKey, instance[st], null, manager);
          if(member.point < ball*1000){
               throw new CoreError(ErrorType.E_LACK_COST, '포인트가 부족합니다.');
          }

          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'used';
          historyPoint.category = 'exchange';
          historyPoint.point = ball*1000;
          historyPoint.subject = getLang('id').exchangeLuckyballSubject;
          historyPoint.comment = getLang('id').exchangeLuckyballComment;
          historyPoint.regDatetime = now();
          await this.updatePoint(historyPoint, member, manager);

          let historyBall = new HistoryBall();
          historyBall.userKey = member.userKey;
          historyBall.type = 'charge';
          historyBall.category = 'exchange';
          historyBall.ball = ball;
          historyBall.subject = getLang('id').exchangeLuckyballSubject;
          historyBall.comment = getLang('id').exchangeLuckyballComment;
          historyBall.regDatetime = now();
          await this.updateBall(historyBall, member, manager);

          if(member.recommendeeKey){
               let partner:Partner = await this.partnerService.getOne(member.recommendeeKey);
               if(partner && partner.status == 'active'){

                    let historyCommission = new HistoryCommission();
                    historyCommission.type = HistoryCommissionType.ball;
                    historyCommission.category = 'exchangeBall';
                    historyCommission.userKey = member.userKey;
                    historyCommission.nickname = member.nickname;
                    historyCommission.partner = partner.userKey;
                    historyCommission.partnerType = partner.type;
                    historyCommission.parents = partner.parents;
                    historyCommission.commission = ball * partner.ballCommission;
                    historyCommission.regDatetime = now();

                    await this.historyService.insertHistoryCommission(historyCommission, partner, manager);
               }
          }

          return true;
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

          if(verifyType == 'whatsapp'){
               await this.verifyWhatsapp(req, res, member.mobileNumber, 'withdrawal', otp);
          }else{
               await this.verifySms(req, res, member.mobileNumber, 'withdrawal', otp);
          }
          
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
          
          if(verifyType == 'whatsapp'){
               await this.verifyWhatsapp(req, res, mobileNumber, 'withdrawalCancel', otp);
          }else{
               await this.verifySms(req, res, mobileNumber, 'withdrawalCancel', otp);
          }

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

          let key = `auth-${authNumber}-withdrawal`;
          let email = await Redis.getInstance().hGet(key);
          if(!email) {
               throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          }
          
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
     public async withdrawalCancel(req: Request, res: Response, userKey:string, authNumber: string, manager?: EntityManager){
          
          let key = `auth-${authNumber}-withdrawalCancel`;
          let email = await Redis.getInstance().hGet(key);
          if(!email) {
               throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          }

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
     //      memberTotal.isAuthEmail = true;
     //      await this.memberTotalModel.update(memberTotal, MemberTotal);

     //      let member = await this.getMember(userKey);
     //      member.authEmail = email;
     //      member.email = email;
     //      member.isAuthEmail = true;
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

     public async sendEmailForAuth(type:string, email: string, language:string){



          var title = '';
          var contents = '';
          language = 'en';

          let randNum:number;

          while(true) {
               randNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
               let key = `auth-${randNum}-${type}`;
               if(!await Redis.getInstance().hGet(key)){
                    await Redis.getInstance().hSet(key, email, 1 * 24 * 60 * 60);
                    break;
               }
          }

          switch(type){
               case 'withdrawal':
                    title = getLang('id').authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
               case 'withdrawalCancel':
                    title = getLang('id').authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
               case 'emailAuth':

                    let filter:MemberTotalListFilter = {};
                    filter.email = email;
                    filter.isAuthEmail = true;
                    let memberTotal = await this.memberTotalModel.getByFilter(filter);
                    if(memberTotal){
                         throw new CoreError(ErrorType.E_ALREADY_EXIST);
                    }

                    title = getLang('id').authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
          }
          

          sendEmail(email, 'no_reply@wowboxapp.com', title, contents);

          return randNum.toString();
     }

     @Transaction()
     public async updateMarketingReciving(req: Request, res: Response, marketingReceiving:boolean, member:MemberA, manager?: EntityManager){
          
          if(!marketingReceiving){
               throw new CoreError(ErrorType.E_INVALID_ARG, 'marketingReceiving is null');
          }
          

          member = await this.getMember(member.userKey, manager);
          
          member.marketingReceiving = marketingReceiving;
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

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
          result.inviteTicket = member.inviteTicket;
          result.inviteBall = member.inviteBall;
          return result;
     }

     @Transaction()
     public async attendance(req: Request, res: Response, member:MemberA, manager?: EntityManager){
          member = await this.getMember(member.userKey, manager);
          if(member.attendanceCount && member.attendanceCount > 0 && member.attendanceDate){
               let attendanceDate = new Date(member.attendanceDate);
               attendanceDate.setDate(attendanceDate.getDate() + 1);
               let currentTime = new Date().getTime();
               if(currentTime > attendanceDate.getTime()){
                    member.attendanceCount += 1;
                    member.attendanceDate = now();
               }else{
                    throw new CoreError(ErrorType.E_TIME_LIMIT);
               }
          }else{
               member.attendanceCount += 1;
               member.attendanceDate = now();
          }

          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);

          var attendancePoint = 0
          if(member.attendanceCount >= 7){
               member.attendanceCount = 0;
               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);
               attendancePoint = 50;
          }else{
               attendancePoint = member.attendanceCount * 5
          }
          let historyPoint = new HistoryPoint();
          historyPoint.userKey = member.userKey;
          historyPoint.type = 'charge';
          historyPoint.category = 'attendance';
          historyPoint.point = attendancePoint;
          historyPoint.subject = getLang('id').attendancePointSubject;
          historyPoint.comment = getLang('id').attendancePointComment;
          historyPoint.regDatetime = now();
          await this.updatePoint(historyPoint, member, manager);

          return attendancePoint;

          // if(member.attendanceCount == 30){
          //      member.attendanceCount = 0;
          //      let st = member.userKey.substring(0, 1);
          //      await this.memberAModel.update(member, instance[st], manager);
     
          //      // let attendanceCash = Math.floor(Math.random() * 21) + 10
          //      let attendanceCash = 1000
          //      let histroyCash = new HistoryCash();
          //      histroyCash.userKey = member.userKey;
          //      histroyCash.type = 'charge';
          //      histroyCash.category = 'attendance';
          //      histroyCash.cash = attendanceCash;
          //      histroyCash.subject = getLang('id').attendanceCashSubject;
          //      histroyCash.comment = getLang('id').attendanceCashComment;
          //      histroyCash.regDatetime = now();
          //      member = await this.updateCash(histroyCash, member, manager);
                    
          //      return attendanceCash;
               
          // }else{

          //      let st = member.userKey.substring(0, 1);
          //      await this.memberAModel.update(member, instance[st], manager);

          //      var attendancePoint = Math.floor(Math.random() * 21) + 10
          //      let historyPoint = new HistoryPoint();
          //      historyPoint.userKey = member.userKey;
          //      historyPoint.type = 'charge';
          //      historyPoint.category = 'attendance';
          //      historyPoint.point = attendancePoint;
          //      historyPoint.subject = getLang('id').attendancePointSubject;
          //      historyPoint.comment = getLang('id').attendancePointComment;
          //      historyPoint.regDatetime = now();
          //      await this.updatePoint(historyPoint, member, manager);

          //      return attendancePoint;
          // }
     }

     @Transaction()
     public async rewardBall(req: Request, res: Response, user_id:string, ball:number, subject:string, comment:string, manager?: EntityManager){

          let filter : MemberTotalListFilter = {};
          filter.platformKey = user_id;
          let memberTotal: MemberTotal = await this.memberTotalModel.getByFilter(filter, undefined, undefined, manager);

          let historyBall = new HistoryBall();
          historyBall.userKey = memberTotal.userKey;
          historyBall.type = 'charge';
          historyBall.category = 'wowboxmallReward';
          historyBall.ball = ball;
          historyBall.subject = subject;
          historyBall.comment = comment;
          historyBall.regDatetime = now();
          let member = new MemberA();
          member.userKey = memberTotal.userKey;
          await this.updateBall(historyBall, member, manager);
          return true;
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

          if(memberTotal.isRewardCoin){
               return 'already'
          }

          memberTotal.isRewardCoin = true;
          this.memberTotalModel.update(memberTotal, MemberTotal, manager);
          var member = await this.getMember(memberTotal.userKey);
          member.wallet = wallet;

          let historyBall = new HistoryBall();
          historyBall.userKey = memberTotal.userKey;
          historyBall.type = 'charge';
          historyBall.category = 'wallet';
          historyBall.ball = 3;
          historyBall.subject = getLang('id').walletMakeBallSubject;
          historyBall.comment = getLang('id').walletMakeBallContents;
          historyBall.regDatetime = now();
          await this.historyService.insertHistoryBall(historyBall, member, manager);

          member.ball += historyBall.ball;
          this.updateMember(member, manager);
          

          await this.coinService.sendDivc(req, res, wallet, '0.1');
          await this.coinService.sendToken(req, res, 'BUFF', wallet, '1', 'receive');
          
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

     public async sendWhatsappTest(req: Request, res: Response, mobileNumber:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          const randomNo = Math.floor(Math.random() * 899999) + 100000;

          let params = {
               msisdn: mobileNumber,
               otp: String(randomNo),
               challenge : 'test',
               time_limit : 300,
               lang_code : 'id',
               template_name : "wowboxofficial"
          };

          let header = {
               "APP-ID": '52f0b5f9-ed26-46b1-82f2-b03774998ca3',
               'API-Key': '3FeGILBdOgU4XJcO9SG8xr4/ZvsuuZmo'
          };

          let url = 'https://api.verihubs.com/v1/whatsapp/otp/send';
          let resp = await _axios('post', url, params, header);
          console.log(resp);
          return resp;
     
     }

     public async sendWhatsapp(req: Request, res: Response, mobileNumber:string, type:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          if(type == 'join'){
               let filter:MemberTotalListFilter = {};
               filter.platformKey = encrypt(mobileNumber)
               let memberTotal = await this.memberTotalModel.getByFilter(filter);
               if(memberTotal){
                    throw new CoreError(ErrorType.E_ALREADY_EXIST);
               }
          }else if(type == 'login'){
               let filter:MemberTotalListFilter = {};
               filter.platformKey = encrypt(mobileNumber)
               let memberTotal = await this.memberTotalModel.getByFilter(filter);
               if(!memberTotal){
                    throw new CoreError(ErrorType.E_NOTFOUND);
               }
          }else if(type == 'update_mobile'){
               let filter:MemberTotalListFilter = {};
               filter.mobileNumber = encrypt(mobileNumber);
               filter.verifiedMobile = true;
               let dupleUser = await this.memberTotalModel.getByFilter(filter)
               if(dupleUser){
                    throw new CoreError(ErrorType.E_ALREADY_EXIST);
               }
          }

          if(process.env.NODE_ENV == 'PROD'){
               const randomNo = Math.floor(Math.random() * 899999) + 100000;

               let params = {
                    msisdn: mobileNumber,
                    otp: String(randomNo),
                    challenge : type,
                    time_limit : 300,
                    lang_code : 'id',
                    template_name : "wowboxofficial"
               };

               let header = {
                    "APP-ID": '52f0b5f9-ed26-46b1-82f2-b03774998ca3',
                    'API-Key': '3FeGILBdOgU4XJcO9SG8xr4/ZvsuuZmo'
               };

               let url = 'https://api.verihubs.com/v1/whatsapp/otp/send';
               let resp = await _axios('post', url, params, header);
               console.log(resp);
          }
          
          return 'success';
     
     }

     public async verifyWhatsapp(req: Request, res: Response, mobileNumber:string, type:string, otp:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          if(process.env.NODE_ENV == 'PROD'){
               let params = {
                    msisdn: mobileNumber,
                    otp: otp,
                    challenge : type
               };
     
               let header = {
                    "APP-ID": '52f0b5f9-ed26-46b1-82f2-b03774998ca3',
                    'API-Key': '3FeGILBdOgU4XJcO9SG8xr4/ZvsuuZmo'
               };
     
               let url = 'https://api.verihubs.com/v1/whatsapp/otp/verify';
               try{
                    let resp = await _axios('post', url, params, header);
                    console.log(resp);
                    return resp;
               }catch(e){
                    throw new CoreError(ErrorType.E_VERYFY_FAIL)
               }
          }else{
               if(otp == '111111'){
                    return true;
               }else{
                    throw new CoreError(ErrorType.E_VERYFY_FAIL)
               }
          }
          
          
     }

     public async sendSms(req: Request, res: Response, mobileNumber:string, type:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          if(type == 'join'){
               let filter:MemberTotalListFilter = {};
               filter.platformKey = encrypt(mobileNumber)
               let memberTotal = await this.memberTotalModel.getByFilter(filter);
               if(memberTotal){
                    throw new CoreError(ErrorType.E_ALREADY_EXIST);
               }
          }else if(type == 'login'){
               let filter:MemberTotalListFilter = {};
               filter.platformKey = encrypt(mobileNumber)
               let memberTotal = await this.memberTotalModel.getByFilter(filter);
               if(!memberTotal){
                    throw new CoreError(ErrorType.E_NOTFOUND);
               }
          }else if(type == 'update_mobile'){
               let filter:MemberTotalListFilter = {};
               filter.mobileNumber = encrypt(mobileNumber);
               filter.verifiedMobile = true;
               let dupleUser = await this.memberTotalModel.getByFilter(filter)
               if(dupleUser){
                    throw new CoreError(ErrorType.E_ALREADY_EXIST);
               }
          }

          if(process.env.NODE_ENV == 'PROD'){
               const randomNo = Math.floor(Math.random() * 899999) + 100000;

               let params = {
                    msisdn: mobileNumber,
                    template: '$OTP adalah kode verifikasi Anda. Demi keamanan, jangan bagikan kode ini.',
                    otp: String(randomNo),
                    time_limit : 300,
                    challenge : type
               };
     
               let header = {
                    "APP-ID": '52f0b5f9-ed26-46b1-82f2-b03774998ca3',
                    'API-Key': '3FeGILBdOgU4XJcO9SG8xr4/ZvsuuZmo'
               };
     
               let url = 'https://api.verihubs.com/v1/otp/send';
               let resp = await _axios('post', url, params, header);
               console.log(resp);
          }
          
          return 'success';
     
     }

     public async verifySms(req: Request, res: Response, mobileNumber:string, type:string, otp:string){

          if(mobileNumber.startsWith('+62')){
               mobileNumber = mobileNumber.substring(1)
          }

          if(mobileNumber.startsWith('08')){
               mobileNumber= '62'+mobileNumber.substring(1)
          }else if(mobileNumber.startsWith('6208')){
               mobileNumber = '62'+mobileNumber.substring(3)
          }

          if(process.env.NODE_ENV == 'PROD'){
               let params = {
                    msisdn: mobileNumber,
                    otp: otp,
                    challenge : type
               };
     
               let header = {
                    "APP-ID": '52f0b5f9-ed26-46b1-82f2-b03774998ca3',
                    'API-Key': '3FeGILBdOgU4XJcO9SG8xr4/ZvsuuZmo'
               };
     
               let url = 'https://api.verihubs.com/v1/otp/verify';
               try{
                    let resp = await _axios('post', url, params, header);
                    console.log(resp);
                    return resp;
               }catch(e){
                    throw new CoreError(ErrorType.E_VERYFY_FAIL)
               }
          }else{
               if(otp == '111111'){
                    return true;
               }else{
                    throw new CoreError(ErrorType.E_VERYFY_FAIL)
               }
          }

          
     
     }

     public async getTokenBalance(tokenName:string, member:MemberA, manager?: EntityManager){

          member = await this.getMember(member.userKey);

          if(!member.wallet){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          return await this.coinService.getTokenBalance(tokenName, member.wallet);
     }
}