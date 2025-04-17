import axios from "axios";
import { CoreError } from "../core/CoreError";
import { E_INTERNAL_SERVER } from "./errorType";
import { decrypt } from "./util";


export async function _axios(method, url:string, params?, headers?) {

    let header = {
        "Accept": 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        "Accept-Charset": "UTF-8"
    };

    if(headers) {
        header = {...header, ...headers};
    }

    let res: any = {};
    try {
        res = await axios({
            url: url,
            data: params,
            method: method,
            responseEncoding: 'utf-8',
            headers: header
        });
    } catch(e) {
        res.data = e.response ? e.response.data : e.message;
        console.log('res.data',res.data)
        if(url.startsWith('https://user-api.glockup')){
            console.log('res.data : ', decrypt(res.data.data, 'PROD'));
        }else{
            console.log('res.data : ', res.data);
        }
        
    }
    if(res.status == 200 || url.startsWith('https://user-api')){
        return res.data;
    }else{
        throw new CoreError(E_INTERNAL_SERVER, res.data);
    }
    
}
