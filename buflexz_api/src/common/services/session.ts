import { Request, Response } from 'express'
import { Redis } from './redis';
import * as ErrorType from './errorType';
import { CoreError } from '../core/CoreError';
import { getUUIDv4 } from './util';
import { MemberA } from '../../member/entities/member_a';

export async function setSession(
    req: Request, 
    session: any,
    key = req.headers.token) {

    let data: MemberA = await Redis.getInstance().hSet(process.env.REDIS_PREFIX + key, session, 1 * 6 * 60 * 60);
    
    return data;
}

export async function getSession(req) {

    if(!req.headers.token) {
        throw new CoreError(ErrorType.E_EXPIRED_SESSION, 'token expired');
    }

    if(!req.headers.device) {
        throw new CoreError(ErrorType.E_EXPIRED_SESSION, 'device is null');
    }

    let existSession = await Redis.getInstance().hGet(process.env.REDIS_PREFIX + req.headers.token);
    if(!existSession) {
        throw new CoreError(ErrorType.E_EXPIRED_SESSION, 'token expired');
    }

    if(existSession.device != req.headers.device){
        throw new CoreError(ErrorType.E_EXPIRED_SESSION, 'device is null');
    }

    return existSession;
}

export async function registRefreshToken(userKey: string) {

    let key = 'refresh-token' + userKey;

    let refreshToken = getUUIDv4();

    //임시
    await Redis.getInstance().del(process.env.REDIS_PREFIX + key);
    await Redis.getInstance().hSet(process.env.REDIS_PREFIX + key, {refreshToken: refreshToken}, 15 * 24 * 60 * 60);
    return refreshToken;
}

export async function getRefreshToken(userKey: string) {

    let key = process.env.REDIS_PREFIX + 'refresh-token' + userKey;
    return (await Redis.getInstance().hGet(key)).refreshToken;
}
