import { ExpressMiddlewareInterface, Interceptor, InterceptorInterface, Action } from "routing-controllers";
import { Request, Response } from "express";
import * as xlsx from 'xlsx';

export class XlsxInterceptor implements InterceptorInterface {
    async intercept(action: Action, content: any) {
        let request: Request = action.request;
        let response: Response = action.response;

        if(request.method != 'GET') {
            return content;
        }

        let wb = xlsx.utils.book_new();
        let ws = xlsx.utils.json_to_sheet(content.data, { header : content.header, skipHeader : false } );

        if(content.cols) {
            ws['!cols'] = content.cols;
        }
        
        xlsx.utils.book_append_sheet(wb, ws);

        response.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.attachment(content.name + '.xlsx');
        
        return xlsx.write(wb, {type: 'buffer'});
    }


}