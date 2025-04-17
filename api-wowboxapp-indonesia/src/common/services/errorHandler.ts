import { Middleware, ExpressErrorMiddlewareInterface, BadRequestError, UnauthorizedError } from 'routing-controllers';
import { Request, Response } from 'express';
import { CoreError } from '../core/CoreError';
import { Log } from './log';


@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err: any) => any) {
        console.log('error:',error);
        Log(request, 'error', error);
        if(error instanceof BadRequestError) {
            response.status(200);
            response.json({
                code: 400,
                message: 'required ' + error['errors'][0].property
            });
		} else if(error instanceof CoreError) {
            response.status(200);
            response.json({
                    code: error.code,
                    message: error.message,
                    result: error.result
                }); 
        } else if(error instanceof UnauthorizedError) {
            response.status(200);
            response.json({
                code: 401,
                message: 'Authorization is required'
            }); 
        } else {
            response.json({message: error.message}); 
        }
    } 
}



