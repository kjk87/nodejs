import {Request} from 'express';
import moment = require("moment");
import { FileManager } from "./fileManager";

export enum LogType {
    ERROR = 'error',
    ACCESS = 'access'
}

export enum LogAction {
    REQUEST = 'request',
    CORE = 'core',
    SOURCE = 'source',
    JOIN_MEMBER = 'join_memer',
    JOIN_MEMBER_FAIL = 'join_member_fail',
    CHANGE_PASSWORD = 'change_password',
    CHANGE_PASSWORD_FAIL = 'change_password_fail',
    CHANGE_MOBILE = 'change_mobile',
    CHANGE_MOBILE_FAIL = 'change_mobile_fail',
    LEAVE = 'leave',
    LEAVE_FAIL = 'leave_fail',
    CANCEL_LEAVE = 'cancel_leave',
    LOGIN = 'login',
    LOGIN_CHECK = 'login_check',
    LOGIN_FAIL = 'login_fail',
    SESSION = 'session_fail',
    CERT = 'cert',
    FIND_INFO = 'find_info',
    FIND_INFO_FAIL = 'find_info_fail',
    CHANGE_INFO = 'change_info',
    CHANGE_INFO_FAIL = 'change_info_fail',
    REFRESH_SESSION_KEY = 'represh_session_key',
    REFRESH_SESSION_KEY_FAIL = 'represh_session_key_fail',
    REGIST_DEVICE = 'regist_device',
    REGIST_DEVICE_FAIL = 'regist_device_fail',
    EXIST_DEVICE = 'exgist_device',
    EXSIT_DEVICE_FAIL = 'exgist_device_fail',
    BUY_GIFTISHOW = 'buy_giftishow',
    BUY_GIFTISHOW_FAIL = 'buy_giftishow_fail',
    CANCEL_GIFTISHOW = 'cancel_giftishow',
    CANCEL_GIFTISHOW_FAIL = 'cancel_giftishow_fail',
    LUCKYBOX = 'luckybox',
    PAYMENT_LUCKYBOX = 'payment_luckybox',
    PAYMENT_LUCKYBOX_FAIL = 'payment_luckybox_fail',
    CANCEL_LUCKYBOX = 'cancel_luckybox',
    CANCEL_LUCKYBOX_FAIL = 'cancel_luckybox_fail',
    LUCKYPICK = 'luckypick',
    PAYMENT_LUCKYPICK = 'payment_luckypick',
    PAYMENT_LUCKYPICK_FAIL = 'payment_luckypick_fail',
    CANCEL_LUCKYPICK = 'cancel_luckypick',
    CANCEL_LUCKYPICK_FAIL = 'cancel_luckypick_fail',
    LUCKYBOL = 'luckybol',
    PAYMENT_LUCKYBOL = 'payment_luckybol',
    PAYMENT_LUCKYBOL_FAIL = 'payment_luckybol_fail',
    PURCHASE = 'purchase',
    PAYMENT_PURCHASE = 'payment_purchase',
    PAYMENT_PURCHASE_FAIL = 'payment_purchase_fail',
    CANCEL_PURCHASE = 'cancel_purchase',
    CANCEL_PURCHASE_FAIL = 'cancel_purchase_fail',
    CREATE_PURCHASE = 'create_purchase',
    CREATE_PURCHASE_FAIL = 'create_purchase',
    REAPPAY = 'reappay',
    REAPPAY_FAIL = 'reappay_fail',
    BOL = 'bol',
    POINT = 'point',
    BUFF = 'buff',
    AXIOS = 'axios',
    EVENT = 'event'
}

export async function Log(request: Request, type: LogType, action: LogAction = LogAction.SOURCE, data?: any) {
    
    if(process.env.NODE_ENV == 'LOCAL') return;

    let log = `
[method]: ${request.method}
[url]: ${request.originalUrl}
[header]: ${JSON.stringify({
    forwarded: request.headers.forwarded, 
    host: request.headers.host, 
    content_type: request.headers["content-type"], 
    user_agent: request.headers["user-agent"], 
    sessionkey: request.headers.sessionkey,
    refreshkey: request.headers.refreshkey
})}
[body]: ${JSON.stringify(request.body)}
[data]: ${JSON.stringify(data)}`

    // let hour = safeNumber(moment().format('HH'));
    // let name = hour%2 == 0 ? hour : hour-1;

    FileManager.getIntance().then((file)=> {
        // file.setAutoFile(`/var/www/${type}_log/`+ moment().format('YYYYMMDD'), `${action}`);
        file.setAutoFile(`/var/www/${type}_log/`+ moment().format('YYYYMM'), `${action}`); //가독성 이슈로 월단위로 임시
        file.writeFileln('=============================[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']===================================' + log + '\r\n\r\n');
    });
}

export async function scheduleLog(message: string) {
    
    console.log(message);

    if(process.env.NODE_ENV == 'LOCAL') return;

    FileManager.getIntance().then((file)=> {
        file.setAutoFile(`/var/www/schedule_log/`+ moment().format('YYYYMM'), `schedule`); 
        file.writeFileln(message + '\r\n');
    });
}


export async function errorLog(obj: any) {

    if(process.env.NODE_ENV == 'LOCAL') return;

    FileManager.getIntance().then((file)=> {
        file.setAutoFile(`/var/www/error_log/`+ moment().format('YYYYMM'), `error`); 
        file.writeFileln('=============================[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']===================================' + '\r\n');
        file.writeFileln(JSON.stringify(obj) + '\r\n\r\n');
    });
}