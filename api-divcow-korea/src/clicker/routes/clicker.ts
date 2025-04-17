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
import { MemberA } from "../../member/entities/member_a";

@Authorized()
@JsonController('/clicker')
export class MissionsController extends CoreController {

    @Inject(()=> MissionsService)
    private missionsService: MissionsService;

    @Inject(()=> TelegramUsersService)
    private telegramUsersService: TelegramUsersService;

    @Inject(()=> ReferralTasksService)
    private referralTasksService: ReferralTasksService;

    @Inject(()=> TasksService)
    private tasksService: TasksService;
    
    @Inject(()=> DailyTasksService)
    private dailyTasksService: DailyTasksService;


    @Inject(()=> MissionLevelsService)
    private missionLevelsService: MissionLevelsService;

    constructor() {
        super();
    }

    @Get('/tasks')
    public async tasks(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.tasksService.tasks(req, res, user);
    }

    @Post('/tasks/:taskId(\\d+)')
    public async tasksStore(@Req() req: Request, @Res() res: Response, @Param('taskId') taskId: number, @CurrentUser() user: TelegramUsers) {
        return await this.tasksService.tasksStore(req, res, taskId, user);
    }

    @Post('/tasks/:taskId(\\d+)/claim')
    public async tasksClaim(@Req() req: Request, @Res() res: Response, @Param('taskId') taskId: number, @CurrentUser() user: TelegramUsers) {
        return await this.tasksService.tasksClaim(req, res, taskId, user);
    }

    @Get('/referral-tasks')
    public async referralTasks(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.referralTasksService.referralTask(req, res, user);
    }

    @Post('/referral-tasks/:taskId(\\d+)/complete')
    public async referralTasksComplete(@Req() req: Request, @Res() res: Response, @Param('taskId') taskId: number, @CurrentUser() user: TelegramUsers) {
        return await this.referralTasksService.referralTaskComplete(req, res, taskId, user);
    }

    @Get('/leaderboard')
    public async leaderboard(@Req() req: Request, @Res() res: Response, @QueryParam('level_id') level_id: number) {
        return await this.telegramUsersService.listLeaderboard(req, res, level_id);
    }

    @Get('/missions')
    public async missions(@Req() req: Request, @Res() res: Response, @QueryParam('type') type: number, @CurrentUser() user: TelegramUsers) {
        return await this.missionsService.missions(req, res, type, user);
    }

    @Post('/mission-levels/:missionLevelsId(\\d+)')
    public async missionLevelsStore(@Req() req: Request, @Res() res: Response, @Param('missionLevelsId') missionLevelsId: number, @CurrentUser() user: TelegramUsers) {
        return await this.missionLevelsService.missionLevelsStore(req, res, missionLevelsId, user);
    }

    @Get('/sync')
    public async sync(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.sync(req, res, user);
    }

    @Post('/buy-booster')
    public async buyBooster(@Req() req: Request, @Res() res: Response, @BodyParam('booster_type') booster_type: string, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.buyBooster(req, res, booster_type, user);
    }

    @Post('/use-daily-booster')
    public async useDailyBooster(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.useDailyBooster(req, res, user);
    }

    @Get('/daily-tasks')
    public async dailyTasks(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.dailyTasksService.dailyTasks(req, res, user);
    }
    
    @Get('/app-daily-tasks')
    public async appDailyTasks(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return await this.dailyTasksService.appDailyTasks(req, res, member);
    }
    
    @Post('/claim-daily-task')
    public async claimDailyTaskReward(@Req() req: Request, @Res() res: Response, @CurrentUser() user: TelegramUsers) {
        return await this.dailyTasksService.claimDailyTaskReward(req, res, user);
    }
    
    @Post('/app-claim-daily-task')
    public async appClaimDailyTaskReward(@Req() req: Request, @Res() res: Response, @CurrentUser() member: MemberA) {
        return await this.dailyTasksService.appClaimDailyTaskReward(req, res, member);
    }

    @Post('/tap')
    public async tap(@Req() req: Request, @Res() res: Response, @BodyParam('count') count: number, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.tap(req, res, count, user);
    }
    
    @Post('/updateLevel')
    public async updateLevel(@Req() req: Request, @Res() res: Response, @BodyParam('level_id') level_id: number, @BodyParam('max_energy') max_energy: number, @BodyParam('earn_per_tap') earn_per_tap: number, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.updateLevel(req, res, level_id, max_energy, earn_per_tap, user);
    }
    
    @Get('/referred-users')
    public async referredUsers(@Req() req: Request, @Res() res: Response, @QueryParam('paging') paging: IPaging, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.referredUsers(req, res, paging, user);
    }

    @Post('/swap')
    public async swap(@Req() req: Request, @Res() res: Response, @BodyParam('type') type: string, @BodyParam('address') address: string, @CurrentUser() user: TelegramUsers) {
        return await this.telegramUsersService.swap(req, res, type, address, user);
    }

//     @Put('/:seqNo(\\d+)')
//     public async update(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number, @Body() params: MissionsUpdateParams) {
//         return await this.missionsService.update(req, res, seqNo, params);
//     }

//     @Delete('/:seqNo(\\d+)')
//     public async delete(@Req() req: Request, @Res() res: Response, @Param('seqNo') seqNo: number) {
//         return await this.missionsService.delete(req, res, seqNo);
//     }

}