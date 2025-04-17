import axios from "axios";
import { CoreError } from "../core/CoreError";
import { E_INTERNAL_SERVER } from "./errorType";


export async function _axios(method, url, params?, headers?) {

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
    }
    if(res.status == 200) return res.data;
    throw new CoreError(E_INTERNAL_SERVER, res.data);
}
