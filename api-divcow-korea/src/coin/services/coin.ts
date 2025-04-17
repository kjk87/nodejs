import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { _axios } from "../../common/services/axios";

@Service()
export class CoinService extends CoreService {

    public async getDivcBalance(wallet:string){

        let url = `https://scan.divchain.org/api/v2/addresses/${wallet}`;
        
        let resp = await _axios('get', url);

        let decimal = 10 ** 18;
        var balance = resp.coin_balance/decimal;
        return balance;
   }

    public async getTokenBalance(tokenName:string, wallet:string){

        let apiKey =  process.env.COIN_API_KEY;

        let url = `https://scan.divchain.org/api/v2/addresses/${wallet}/token-balances`;

        let resp = await _axios('get', url);
        var balance = 0;
        for(let data of resp){
             let token = data.token;
             if(token.name == tokenName){
                  let decimal = 10 ** token.decimals;
                  balance = data.value/decimal;
                  break;
             }
        }
        
        return balance;
    }

    public async sendDivc(req: Request, res: Response, wallet:string, amount:string){
        let apiKey =  process.env.COIN_API_KEY;

        // let form = new FormData();
        // form.append("to", wallet)
        // form.append("amount", amount)

        let params = new URLSearchParams();
        params.append('to', wallet);
        params.append('amount', amount);

        let header = {
            "x-api-key": apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let url = 'https://token-transfer.divchain.org:8443/sendDivc';
        let resp = await _axios('post', url, params, header);
        console.log(resp);
        return resp;
    }

    public async sendToken(req: Request, res: Response, name:string, wallet:string, amount:string, type:'send' | 'receive'){
        let apiKey =  process.env.COIN_API_KEY;

        var tokenAddress:string
        if(name == 'WOW'){
            tokenAddress = process.env.WOW_TOKEN_ADDRESS
        }else if(name == 'BUFF'){
            tokenAddress = process.env.BUFF_TOKEN_ADDRESS
        }

        let params = new URLSearchParams();
        params.append('amount', amount);

        switch(type){
            case 'send':
                params.append('to', tokenAddress);
                params.append('tokenAddress', wallet);
                break;
            case 'receive':
                params.append('to', wallet);
                params.append('tokenAddress', tokenAddress);
                break;
        }

        let header = {
            "x-api-key": apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let url = 'https://token-transfer.divchain.org:8443/sendErc20';
        let resp = await _axios('post', url, params, header);
        console.log(resp);
        return resp;
    }

}