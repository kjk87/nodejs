import { HistoryCommission } from './../../history/entities/histroy_commission';
// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { Any, EntityManager } from "typeorm";
import { authMail, getLang, getUUIDv4, now, sendEmail, wordFilter } from "../../common/services/util";
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
import { BuffInviteMining } from '../../buff/entities/buff_invite_mining';
import { BuffInviteMiningService } from '../../buff/services/buff_invite_mining';


export interface MemberTotalListFilter extends ListFilter {
    userKey?: string;
    email?: string;
    nickname?: string;
    platformKey?: string;
    recommendeeKey?: string;
    condition?: string;
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
     
     @Inject(()=> BuffWalletService)
     private buffWalletService: BuffWalletService;

     @Inject(()=> BuffInviteMiningService)
     private buffInviteMiningService: BuffInviteMiningService;

     constructor() {
          super();
     }

     //생성
     @Transaction('SERIALIZABLE') //트렌잭션 default REPEATABLE READ
     public async create(req: Request, res: Response, params: MemberA, manager?: EntityManager) {

          let termsList = params.termsNo.split(',');

          if(params.joinType == 'ios'){
               params.joinType = 'apple';
          }

          let compulsoryTerms = await this.termsService.compulsoryList(params.nation);

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
                    let saved = await this.memberTotalModel.get(userKey)
                    if(!saved){
                         isExist = false
                    }
               }

          }while(isExist);

          var languages = [params.language]
          if(params.language != 'en'){
               languages[1] = 'en'
          }

          if(wordFilter(params.nickname, languages)){
               throw new CoreError(ErrorType.E_INCLUDE_CURSING);
          }

          let filter:MemberTotalListFilter = {};
          filter.condition = `nickname = '${params.nickname}' or platform_key = '${params.platformKey}'`;
          let saved = await this.memberTotalModel.getByFilter(filter);
          if(saved){
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }

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
          memberTotal.platformKey = params.platformKey;
          memberTotal.recommendeeKey = params.recommendeeKey;
     

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
          member.recommendeeKey = params.recommendeeKey;
          member.email = params.email;
          member.device = params.device;
          member.platformEmail = params.platformEmail;
          member.platformKey = params.platformKey;
          member.modDatetime = memberTotal.joinDatetime;
          member.isAuthEmail = false;
          member.point = 0;
          member.ball = 0;
          member.candy = 0;
          member.marketingReceiving = false;
          await this.memberAModel.create(member, type, manager);

          await this.termsService.insertTermsAgree(member.userKey, termsList, manager);

          if(params.recommendeeKey){
               //추천인 선물
               let recommender = await this.getMember(params.recommendeeKey);
               if(!recommender){
                    throw new CoreError(ErrorType.E_NOT_FOUND_RECOMMENDER, '추천코드 에러');
               }

               let invitePoint = recommender.invitePoint ? recommender.invitePoint : 200;
               let inviteTicket = recommender.inviteTicket ? recommender.inviteTicket : 300;
               let inviteBall = recommender.inviteBall;

               if(invitePoint != null && invitePoint > 0){
                    let historyPoint = new HistoryPoint();
                    historyPoint.userKey = member.userKey;
                    historyPoint.type = 'charge';
                    historyPoint.category = 'join';
                    historyPoint.point = invitePoint;
                    historyPoint.subject = getLang(member.language).joinRecommendPointSubject;
                    historyPoint.comment = getLang(member.language).joinRecommendPointContents;
                    historyPoint.regDatetime = now();
                    await this.updatePoint(historyPoint, member, manager);
               }

               if(inviteBall != null && inviteBall > 0){
                    let historyBall = new HistoryBall();
                    historyBall.userKey = member.userKey;
                    historyBall.type = 'charge';
                    historyBall.category = 'join';
                    historyBall.ball = inviteBall;
                    historyBall.subject = getLang(member.language).joinRecommendBallSubject;
                    historyBall.comment = getLang(member.language).joinRecommendBallContents;
                    historyBall.regDatetime = now();
                    await this.updateBall(historyBall, member, manager);
               }

               if(inviteTicket != null && inviteTicket > 0){
                    let param = new LotteryJoinCreateParams();
                    param.count = inviteTicket;
                    param.joinType = 'join';
                    param.userKey = member.userKey;
                    this.lotteryJoinService.lotteryJoin(param, member, manager);
               }

               await this.updateRecommender(req, res, recommender, manager);
          }

          return member;
     }

     public async updateRecommender(req: Request, res: Response, recommender: MemberA, manager?: EntityManager){

          let recommendPoint = recommender.recommendPoint;
          let recommendTicket = recommender.recommendTicket;
          let recommendBall = recommender.recommendBall;
          let recommendBuff = recommender.recommendBuff;

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

          if(recommendBuff != null && recommendBuff > 0 && recommender.authEmail && recommender.isAuthEmail){
               try{
                    await this.buffWalletService.updateCoin('EVENT', true, recommendBuff, recommender);
               }catch(e){
                    console.log('recommendBuff',e);
               }
               
          }

          if(!recommender.inviteCount){
               recommender.inviteCount = 0;
          }
          recommender.inviteCount += 1;
          if(recommender.inviteCount > 0 && recommender.inviteCount % 5 == 0){
               let buffCoinInfo = await this.buffWalletService.getBuffCoinInfo();
               let buffCoin = (2 / buffCoinInfo.usdt)
               await this.buffWalletService.updateCoin('EVENT', true, buffCoin, recommender);
               await this.buffInviteMiningService.create(req, res, recommender.userKey, buffCoin, manager);
          }

          let st = recommender.userKey.substring(0, 1);
          await this.memberAModel.update(recommender, instance[st], manager);
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async updateProfile(req: Request, res: Response, profile: string, member:MemberA, manager?: EntityManager) {

          member = await this.getMember(member.userKey);

          if(member.profile != profile){
               member.profile = profile
               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);
               
               await this.filseService.makeHtml(member.userKey, profile);
          }

          return member;
     }

     @Transaction('SERIALIZABLE') //트렌잭션 default REPEATABLE READ
     public async update(req: Request, res: Response, params: MemberA, member:MemberA, manager?: EntityManager) {

          let memberTotal = await this.memberTotalModel.get(member.userKey)
          member = await this.getMember(member.userKey);

          if(params.nickname){

               var languages = [params.language]
               if(params.language != 'en'){
                    languages[1] = 'en'
               }

               if(wordFilter(params.nickname, languages)){
                    throw new CoreError(ErrorType.E_INCLUDE_CURSING);
               }

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

     public async getProfile(userKey:string){
          let st = userKey.substring(0, 1);
          return await this.memberAModel.getProfile(userKey, st);
     }

     public async checkNickname(nickname:string, language:string){
          if(!language){
               language = 'en'
          }

          var languages = [language]
          if(language != 'en'){
               languages[1] = 'en'
          }

          if(wordFilter(nickname, languages)){
               throw new CoreError(ErrorType.E_INCLUDE_CURSING);
          }

          let filter:MemberTotalListFilter = {};
          filter.nickname = nickname;
          let memberTotal = await this.memberTotalModel.getByFilter(filter);
          
          if(!memberTotal){
               return true;
          }else{
               return false;
          }
     }

     @Transaction()
     public async loginByPlatform(req: Request, res: Response, params:PlatformLoginParams, manager?: EntityManager){
          let filter:MemberTotalListFilter = {};
          filter.platformKey = params.platformKey
          let memberTotal:MemberTotal = await this.memberTotalModel.getByFilter(filter)
          if(!memberTotal || memberTotal.status == 'leave'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          let loginParms = new LoginParams();
          loginParms.userKey = memberTotal.userKey;
          loginParms.device = params.device;
          return await this.login(req, res, loginParms, true, manager);

     }

     @Transaction()
     public async loginByUserKey(req: Request, res: Response, params:LoginParams, manager?: EntityManager){
          return await this.login(req, res, params, false, manager);
     }

     public async login(req: Request, res: Response, params:LoginParams, isPlatform:boolean, manager?: EntityManager){
          let st = params.userKey.substring(0, 1);

          let member = await this.memberAModel.get(params.userKey, instance[st]);
          if(!member || member.status == 'leave'){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(!isPlatform && (member.device != params.device)){
               throw new CoreError(ErrorType.E_NOTFOUND);
          }

          if(member.status == 'active'){
               member.device = params.device;
               member.lastLoginDatetime = now();
               await this.memberAModel.update(member, instance[st], manager);
               let token = member.userKey + '-' + getUUIDv4();
          
               member.token = token;
               let refreshToken = await registRefreshToken(member.userKey);
               member.refreshToken = refreshToken;
               await setSession(req, member, token);
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

          return null;
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
          historyPoint.subject = getLang(member.language).exchangeLuckyballSubject;
          historyPoint.comment = getLang(member.language).exchangeLuckyballComment;
          historyPoint.regDatetime = now();
          await this.updatePoint(historyPoint, member, manager);

          let historyBall = new HistoryBall();
          historyBall.userKey = member.userKey;
          historyBall.type = 'charge';
          historyBall.category = 'exchange';
          historyBall.ball = ball;
          historyBall.subject = getLang(member.language).exchangeLuckyballSubject;
          historyBall.comment = getLang(member.language).exchangeLuckyballComment;
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

     public async getMember(userKey:string){
          let st = userKey.substring(0, 1);
          return await this.memberAModel.get(userKey, instance[st]);
     }

     public async updateMember(member:MemberA, manager?: EntityManager){
          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async withdrawal(req: Request, res: Response, reason:string, authNumber: string, member:MemberA, manager?: EntityManager){

          let key = `auth-${authNumber}-withdrawal`;
          let email = await Redis.getInstance().hGet(key);
          if(!email) {
               throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          }
          
          let memberTotal = await this.memberTotalModel.get(member.userKey);
          memberTotal.status = 'waitingLeave';
          await this.memberTotalModel.update(memberTotal, MemberTotal, manager);

          member = await this.getMember(member.userKey);
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

          let memberTotal = await this.memberTotalModel.get(userKey);
          memberTotal.status = 'active';
          await this.memberTotalModel.update(memberTotal, MemberTotal);

          let member = await this.getMember(userKey);
          member.status = 'active';
          member.leaveMsg = null;
          member.leaveRequestDatetime = null;
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          return await this.memberAModel.update(member, instance[st], manager);
     }

     @Transaction()
     public async authWalletEmail(req: Request, res: Response, userKey:string, authNumber: string, authEmail:string, manager?: EntityManager){
     
          let key = `auth-${authNumber}-wallet`;
          let email = await Redis.getInstance().hGet(key);

          if(!email) {
               throw new CoreError(ErrorType.E_NOTMATCH_AUTH_NUMBER, 'authNumber is invaild');
          }
          if(authEmail != email){
               throw new CoreError(ErrorType.E_NOTMATCH_AUTH_EMAIL, 'authEmail is invaild');
          }

          let memberTotal = await this.memberTotalModel.get(userKey);
          memberTotal.isAuthEmail = true;
          await this.memberTotalModel.update(memberTotal, MemberTotal);

          let member = await this.getMember(userKey);
          member.authEmail = email;
          member.isAuthEmail = true;
          member.modDatetime = now();

          let st = member.userKey.substring(0, 1);
          await this.memberAModel.update(member, instance[st], manager);

          var walletSignUpRes = await this.buffWalletService.walletSignUp(req, res, member);
          if(walletSignUpRes.result == 'SUCCESS'){
               return true;
          }else{
               throw new CoreError(ErrorType.E_ALREADY_EXIST);
          }
     }

     public async sendEmailForAuth(type:string, email: string, language:string){

          var title = '';
          var contents = '';
          if(language != 'ko'){
               language = 'en';
          }

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
                    title = getLang(language).authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
               case 'withdrawalCancel':
                    title = getLang(language).authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
               case 'wallet':
                    title = getLang(language).authMailTitle
                    contents = authMail(language, randNum.toString());
                    break;
          }
          

          sendEmail(email, 'no_reply@buflexz.com', title, contents);

          return randNum.toString();
     }

     @Transaction()
     public async updateMarketingReciving(req: Request, res: Response, marketingReceiving:boolean, member:MemberA, manager?: EntityManager){
          
          if(!marketingReceiving){
               throw new CoreError(ErrorType.E_INVALID_ARG, 'marketingReceiving is null');
          }
          

          member = await this.getMember(member.userKey);
          
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


          let params = encodeURI(`https://www.root37.net/buflexzInvite/index.html?recommendKey=${member.userKey}`);
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
                    member = await this.getMember(member.userKey);
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
          member = await this.getMember(member.userKey);
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

          if(member.attendanceCount == 30){
               if(member.isAuthEmail && member.authEmail){
                    member.attendanceCount = 0;
                    let st = member.userKey.substring(0, 1);
                    await this.memberAModel.update(member, instance[st], manager);
     
                    let buffCoinInfo = await this.buffWalletService.getBuffCoinInfo();
                    let buffCoin = (1 / buffCoinInfo.usdt)
                    this.buffWalletService.updateCoin('EVENT', true, buffCoin, member);
                    
                    return buffCoin.toFixed(2);
               }else{
                    throw new CoreError(ErrorType.E_NOTFOUND);
               }
               
          }else{

               let st = member.userKey.substring(0, 1);
               await this.memberAModel.update(member, instance[st], manager);

               let attendancePoint = Math.floor(Math.random() * 5) + 1
               let historyPoint = new HistoryPoint();
               historyPoint.userKey = member.userKey;
               historyPoint.type = 'charge';
               historyPoint.category = 'attendance';
               historyPoint.point = attendancePoint;
               historyPoint.subject = getLang(member.language).attendancePointSubject;
               historyPoint.comment = getLang(member.language).attendancePointComment;
               historyPoint.regDatetime = now();
               await this.updatePoint(historyPoint, member, manager);

               return attendancePoint;
          }
     }
     
}