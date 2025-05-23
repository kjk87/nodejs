// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import * as path from 'path';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getRandomNum, getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import moment = require("moment-timezone");
import md5 = require("md5");
import { uploadFile } from "../../common/services/aws";


@Service()
export class FileService extends CoreService {

     constructor() {
          super();
     }

     public async s3Upload(req: Request, res: Response, file: any) {
          if(!file) throw new CoreError(ErrorType.E_INVALID_ARG, '등록 할 파일이 없습니다');
          let parsed = path.parse(file.originalname);
          let fileSubPath = moment().format('YYYY/MM/DD');

          let extension = parsed.ext.substring(1);
          let originName = file.originalname;
          let fileSize = file.size;
          let id = md5(new Date().getTime().toString());
          let filePath = process.env.CDN_PATH + fileSubPath;
          let fileName = new Date().getTime() + '_' + getRandomNum(6, 0, 9) + '.' + extension;
          let url = process.env.CDN_URL + fileSubPath + '/' + fileName;

          try {
               await uploadFile(file.buffer, filePath + '/' + fileName, file.mimetype);
          } catch(e) {
               throw new CoreError(ErrorType.E_INTERNAL_SERVER, '업로드에 실패했습니다')
          }

          return url;
     }

     public async makeHtml(userKey:string, profile:string) {

          let filePath = process.env.CDN_PATH + 'profile/'+userKey;
          let fileName = 'index.html';
          
          let html = `<html><meta http-equiv="refresh" content="0; url=${profile}"></meta></html>`;
          var htmlBuffer = Buffer.from(html, 'utf8');

          try {
               await uploadFile(htmlBuffer, filePath + '/' + fileName, 'html');
          } catch(e) {
               throw new CoreError(ErrorType.E_INTERNAL_SERVER, '업로드에 실패했습니다')
          }
     }
}