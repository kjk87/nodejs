import moment = require("moment-timezone");
import { Inject, Service } from "typedi";
import { BenefitCalculateService } from "../../benefit/services/benefit_calculate";
import { BuffCoinInfoService } from "../../buff/services/buff_coin_info";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { EventService } from "../../event/services/event";
import { HistoryBenefitService } from "../../history/services/history_benefit";
import { Lottery } from "../../lottery/entities/lottery";
import { LotteryModel } from "../../lottery/models/lottery";
import { LotteryService } from "../../lottery/services/lottery";
import { LotteryJoinService } from "../../lottery/services/lottery_join";
import { LotteryJoinUserService } from "../../lottery/services/lottery_join_user";
import { LotteryWinService } from "../../lottery/services/lottery_win";
import { LotteryWinConditionService } from "../../lottery/services/lottery_win_condition";
import { LuckyDrawService } from "../../lucky/services/lucky_draw";
import { LuckyDrawWinService } from "../../lucky/services/lucky_draw_win";
import { LuckyboxPurchaseService } from "../../luckybox/services/luckybox_purchase";
import { LuckyboxPurchaseItemService } from "../../luckybox/services/luckybox_purhcase_item";
import { MemberWithdrawService } from "../../member/services/member_withdraw";
import { PartnerService } from "../../partner/services/partner";
import { ProfitPartnerService } from "../../profit/services/profit_partner";
import { StatisticsService } from "../../statistics/services/statistics";
import { scheduleLog } from "./log";

@Service()
export class BatchService {

    @Inject(()=> LotteryService)
    private lotteryService: LotteryService;

    @Inject(()=> LotteryModel)
    private lotteryModel: LotteryModel;

    @Inject(()=> LotteryWinService)
    private lotteryWinService: LotteryWinService;

    @Inject(()=> LotteryWinConditionService)
    private lotteryWinConditionService: LotteryWinConditionService;

    @Inject(()=> LotteryJoinService)
    private lotteryJoinService: LotteryJoinService;

    @Inject(()=> LotteryJoinUserService)
    private lotteryJoinUserService: LotteryJoinUserService;

    @Inject(()=> LuckyDrawService)
    private luckyDrawService: LuckyDrawService;

    @Inject(()=> PartnerService)
    private partnerService: PartnerService;

    @Inject(()=> ProfitPartnerService)
    private profitPartnerService: ProfitPartnerService;

    @Inject(()=> MemberWithdrawService)
    private memberWithdrawService: MemberWithdrawService;

    @Inject(()=> StatisticsService)
    private statisticsService: StatisticsService;

    @Inject(()=> BuffCoinInfoService)
    private buffCoinInfoService: BuffCoinInfoService;

    @Inject(()=> LuckyDrawWinService)
    private luckyDrawWinService: LuckyDrawWinService;

    @Inject(()=> HistoryBenefitService)
    private historyBenefitService: HistoryBenefitService;

    @Inject(()=> BenefitCalculateService)
    private benefitCalculateService: BenefitCalculateService;

    @Inject(()=> LuckyboxPurchaseItemService)
    private luckyboxPurchaseItemService: LuckyboxPurchaseItemService;

    @Inject(()=> LuckyboxPurchaseService)
    private luckyboxPurchaseService: LuckyboxPurchaseService;

    @Inject(()=> EventService)
    private eventService: EventService;




    /**
     * @처리목록 로또 종료처리, 다음회차 활성화, 회차 신규생성, 신규 참여 테이블 생성, 참여수 집계
     * @처리시간 매주 토 20:30
     * @트랜잭션여부 true
     */
    public async changeActiveLottery(lotteryRound?: number) {

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 회차 종료처리, 다음회차 활성화, 회차 신규생성, 신규 참여 테이블 생성, 참여수 집계 schedulerJob START ===================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.lotteryService.expireLottery(lotteryRound, qr.manager);
            await this.lotteryService.activeLottery(qr.manager);
            await this.lotteryService.saveNewLottery(qr.manager); //회차와 join_user 테이블 동시 생성
            

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 회차 종료처리, 다음회차 활성화, 회차 신규생성, 신규 참여 테이블 생성, 참여수 집계 schedulerJob END ===================\r\n');

    }

    /**
     * @처리목록 당첨번호 저장
     * @처리시간 매주 일 01:15
     * @트랜잭션여부 false
     */
    public async setLottoWinNumber(lotteryRound?: number) {

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 당첨번호 저장 schedulerJob START ==========================================');

        try{

            await this.lotteryService.setLottoWinNumber(lotteryRound);

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 당첨번호 저장 expire schedulerJob END ==========================================\r\n');

    }

    /**
     * @처리목록 1등당첨
     * @처리시간 매주 일 01:18
     * @트랜잭션여부 true
     */
    public async winLottoFirst(lotteryRound?: number) {

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 1등 당첨 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction('READ COMMITTED');

        try{

            await this.lotteryWinService.insertWinner(1, lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 1등 당첨 schedulerJob END ==========================================\r\n');

    }

    /**
     * @처리목록 2등당첨
     * @처리시간 매주 일 02:48
     * @트랜잭션여부 true
     */
     public async winLottoSecond(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 2등 당첨 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction('READ COMMITTED');

        try{

            await this.lotteryWinService.insertWinner(2, lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();
        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 2등 당첨 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 3등당첨
     * @처리시간 매주 일 01:28
     * @트랜잭션여부 true
     */
    public async winLottoThird(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 3등 당첨 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction('READ COMMITTED');

        try{

            await this.lotteryWinService.insertWinner(3, lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 3등 당첨 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 4등당첨
     * @처리시간 매주 일 01:48
     * @트랜잭션여부 true
     */
    public async winLottoForth(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 4등 당첨 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction('READ COMMITTED');

        try{

            await this.lotteryWinService.insertWinner(4, lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 4등 당첨 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 5등당첨
     * @처리시간 매주 일 02:18
     * @트랜잭션여부 true
     */
    public async winLottoFifth(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 5등 당첨 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction('READ COMMITTED');

        try{

            await this.lotteryWinService.insertWinner(5, lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();
        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 로또 5등 당첨 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 추첨완료된 로또 당첨 정보 정산
     * @처리시간 매주 일 02:58
     * @트랜잭션여부 true
     */
    public async setLottoWinCondition(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 추첨완료된 로또 당첨 정보 정산 schedulerJob START ==========================================');

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();

        try{

            await this.lotteryWinConditionService.setLottoWinCondition(lotteryRound, qr.manager);

            await qr.commitTransaction();

        } catch(e) {
            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {

            await qr.release();

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 추첨완료된 로또 당첨 정보 정산 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 지난 참여목록 삭제
     * @처리시간 매주 일 04:00
     * @트랜잭션여부 false
     */
    public async deleteLotteryJoin(lotteryRound?: number) {
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 지난 참여목록 삭제 schedulerJob START ==========================================');

        try{

            await this.lotteryJoinService.deleteLotteryJoin(lotteryRound);

        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);

        }

        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 지난 참여목록 삭제 schedulerJob END ==========================================\r\n');
    }

    /**
     * @처리목록 럭키드로우 당첨자 선정
     * @처리시간 매시 0분기준 10분간격 
     * @트렌잭션여부 true
     */
    public async announceLuckyDraw() {
        

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.luckyDrawService.announceLuckyDraw(qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();


        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 발표시간 지난 럭키드로우 종료
     * @처리시간 매시 0분기준 10분간격
     * @트렌잭션여부 false
     */
    public async finishLuckyDrawStatus() {
        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();

        try{
            await this.luckyDrawService.finishLuckyDrawStatus(qr.manager);
        } catch(e) {
            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 파트너 수익 정산 (일별)
     * @처리시간 매일 00:05
     * @트렌잭션여부 true
     */
    public async calculatePartnerCommission(day?) {
    
        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.partnerService.calculatePartnerCommission(day, qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 파트너 수익 정산 (월별)
     * @처리시간 매일 01:00
     * @트렌잭션여부 true
     */
    public async calculateProfitPartner(day?) {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.profitPartnerService.calculateProfitPartner(day, qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 14일 지난 탈퇴신청 탈퇴처리
     * @처리시간 매일 00:10
     * @트렌잭션여부 true
     */
    public async withdrawMember() {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await this.memberWithdrawService.withdrawMember(qr);

    }

    /**
     * @처리목록 대시보드 통계
     * @처리시간 매일 00:20
     * @트렌잭션여부 true
     */
    public async calcStatistics(startDatetime?: string) {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.statisticsService.calcStatistics(startDatetime, qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 버프코인 가격 새로고침
     * @처리시간 매분
     */
    public async buffCoinRefresh() {
        try {
            await this.buffCoinInfoService.getCoinValue();
        } catch(e) {
            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
        }
        
    }

    /**
     * @처리목록 럭키드로우 당첨자 메일 보내기
     * @처리시간 매시 2분기준 10분간격
     */
    public async sendMailToLuckyDrawWinner() {
        await this.luckyDrawWinService.sendMailToLuckyDrawWinner();
    }

    /**
     * @처리목록 배당 수익 정산 (일별)
     * @처리시간 매일 01:05
     * @트렌잭션여부 true
     */
    public async calculateBenefitDay(day?) {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.historyBenefitService.calculateBenefitDay(day, qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }
    
    /**
     * @처리목록 배당 수익 정산 (월별)
     * @처리시간 매일 02:00
     * @트렌잭션여부 true
     */
    public async calculateBenefitMonth(day?) {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.benefitCalculateService.calculateBenefitMonth(day, qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        }
    }

    /**
     * @처리목록 7일경과 럭키박스 캐시백 교환
     * @처리시간 매일 00:01
     * @트렌잭션여부 true
     */
    public async exchangeCash() {

        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{

            await this.luckyboxPurchaseItemService.exchangeCash(qr.manager);
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        } 
    }


    /**
     * @처리목록 이벤트 당첨자 발표
     * @처리시간 
     * @트렌잭션여부 true
     */
    public async announceEventWin() {
    
        let qr = DUCKCOIN_DATASOURCE.createQueryRunner();
        await qr.startTransaction();
        try{
            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 이벤트 당첨자 발표 시작 schedulerJob START ==========================================');
            await this.eventService.announceEventWin();
            await qr.commitTransaction();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
            await qr.rollbackTransaction();

        } finally {
            await qr.release();
        } 
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 이벤트 당첨자 발표 종료 schedulerJob END ==========================================');

    }

    /**
     * @처리목록 발표시간 지난 이벤트 종료
     * @처리시간 
     * @트렌잭션여부 false
     */
    public async completeEventByWinAnnounceDatetime() {
        try{
            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 이벤트 완료 시작 schedulerJob START ==========================================');
            await this.eventService.completeEventByWinAnnounceDatetime();
        } catch(e) {

            scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][ERROR]');
            scheduleLog(e.message);
        }
        scheduleLog('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] 이벤트 완료 종료 schedulerJob END ==========================================');

    }

}