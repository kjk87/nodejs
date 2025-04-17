import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { decrypt, encrypt, getRandomOrderId, now, safeNumber } from "../../common/services/util";
import { _axios } from "../../common/services/axios";
import { IsNotEmpty } from "../../common/services/decorators";
import * as crypto from 'crypto';
import * as FormData  from 'form-data';
import { BuffCoinInfo } from "../../buff/entities/buff_coin_info";
import { BuffCoinInfoModel } from "../../buff/models/buff_coin_info";
import { MemberA } from "../../member/entities/member_a";
import md5 = require("md5");
import { sha256 } from "js-sha256";
import { CoreError } from "../../common/core/CoreError";
import { E_INTERNAL_SERVER } from "../../common/services/errorType";
import * as CryptoJS from "crypto-js";

@Service()
export class VoucherService extends CoreService {

    public async getAccessToken(){

        let url = `${process.env.ULTRA_VOUCHER_URL}/v1/b2b/auth/generate-token`;
        let auth = 'Basic ' + Buffer.from(process.env.ULTRA_VOUCHER_APP_ID + ':' + process.env.ULTRA_VOUCHER_APP_KEY).toString('base64');
        let headers = {
            Authorization : auth
        }
        
        let resp = await _axios('post', url, undefined, headers);
        return resp.data.access_token;
   }

    public async order(){
        let orderNo = getRandomOrderId();
        let data = {
            order_number : orderNo,
            product_code : 'TMZ00600',
            delivery_method : 'WHATSAPP',
            data_customers : [
                {
                    name : 'test',
                    email : '',
                    phone : '6281119963936',
                    quantity : '1'
                }
            ]
        };


        var strData = JSON.stringify(data);
        strData = strData.replace(/(\r\n\s+|\n|\r)/gm,"");
        strData = strData.replace(/(\:\s)/gm,":");
        console.log('strData : ',strData);
        let encoded = CryptoJS.MD5(strData).toString();
        let milliseconds = (new Date()).getTime();
        let reqUrl = '/v2/b2b/order/direct-customer';

        let signatureString = (`post-${encoded.trim()}-${milliseconds}-${reqUrl}`).toLowerCase();
        console.log('signatureString : ',signatureString)
        let hash = CryptoJS.HmacSHA256(signatureString, process.env.ULTRA_VOUCHER_APP_KEY);
        let signature = CryptoJS.enc.Base64.stringify(hash);
        console.log('signature : ',signature)
        let accessToken = await this.getAccessToken();

        let header = {
            Authorization : 'Bearer ' + accessToken,
            'signature': signature,
            'milliseconds' : milliseconds        };

        let url = `${process.env.ULTRA_VOUCHER_URL}${reqUrl}`;

        let resp = await _axios('post', url, data, header);
        console.log(resp);
        return resp;
        // if(resp.status == 'success'){

        // }else{
        //     throw new CoreError(E_INTERNAL_SERVER)
        // }

    }

    // {
    //     "status": "success",
    //     "code": "SSROO1",
    //     "message": "Order successfully created", "data": {
    //     "order_no": "2817183923949", "invoice_no": "SMT-20180903-000002", "receiver_email": "jhon@email.com", "receiver_mobile": "+62871282373744", "order_date": "2018-12-31 14:01:06", "sku": "IDD00100" }
    // }
}