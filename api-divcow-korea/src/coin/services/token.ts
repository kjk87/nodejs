import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { _axios } from "../../common/services/axios";

@Service()
export class TokenService extends CoreService {


    public async sendToken(token:string, address:string, quantity:number){
        let apiKey =  process.env.TOKEN_API_KEY;

        let params = new URLSearchParams();
        params.append('token', token);
        params.append('quantity', quantity.toString());
        params.append('to', address);

        let header = {
            "x-api-key": apiKey
        };

        // let url = 'https://devnet-admin.divchain.org/api/token';
        let url = 'https://mainnet-admin.divchain.org/api/token';
        let resp = await _axios('post', url, params, header);
        console.log(resp);
        return resp;
    }

    public async getVestingList(address:string){
        let apiKey =  process.env.TOKEN_API_KEY;

        let header = {
            "x-api-key": apiKey
        };

        // let url = `https://devnet-admin.divchain.org/api/vestings?recipient=${address}`;
        let url = `https://mainnet-admin.divchain.org/api/vestings?recipient=${address}`;
        let resp = await _axios('get', url, undefined, header);
        console.log(resp);
        return {list : resp};
    }

}