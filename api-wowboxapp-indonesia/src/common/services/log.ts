import {Request} from 'express';
import moment = require("moment");
import { FileManager } from "./fileManager";

export async function Log(request: Request, fileName:string, data?: any) {
    var branch = '';
    if(process.env.NODE_ENV == 'LOCAL') return;

    if(process.env.NODE_ENV == 'PROD'){
        branch = 'prd';
    }else if(process.env.NODE_ENV == 'STAGE'){
        branch = 'stg';
    }else if(process.env.NODE_ENV == 'DEV'){
        branch = 'dev';
    }

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

    // let hour = safeNumber(moment().tz('Asia/Seoul').format('HH'));
    // let name = hour%2 == 0 ? hour : hour-1;

    FileManager.getIntance().then((file)=> {
        // file.setAutoFile(`/var/www/${type}_log/`+ moment().tz('Asia/Seoul').format('YYYYMMDD'), `${action}`);
        file.setAutoFile(`/var/www/indonesia_api/logs/`+branch+`/`+ moment().tz('Asia/Seoul').format('YYYYMM'),fileName); //가독성 이슈로 월단위로 임시
        file.writeFileln('=============================[' + moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') + ']===================================' + log + '\r\n\r\n');
    });
}