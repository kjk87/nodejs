import { cert, initializeApp, App } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as firebaseConfig from '../../../wowbox-ef072-firebase-adminsdk-vqz4t-a5186bcec5.json';
import { isNonEmptyArray } from './util';

export class FireBase {

    private static instance: FireBase;
    
    constructor() {
        initializeApp({
            credential: cert({
                projectId: firebaseConfig.project_id,
                clientEmail: firebaseConfig.client_email,
                privateKey: firebaseConfig.private_key
            })
        });
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new FireBase();
        }
        
        return this.instance;
    }


    public send(data: any, token: string) {

        getMessaging().send({
            data: data,
            token: token
        }).then((response)=> {

        }).catch((error)=> {

        })
    }

    private sendMulti(data: any, tokens: string[]) {
        getMessaging().sendEachForMulticast({
            data: data,
            tokens: tokens
        }).then((response)=> {

        }).catch((error)=> {
        })
    }

    public sendAll(data: any, tokens: string[]) {
        if(isNonEmptyArray(tokens)) {
            let pushTokens = [];
            for(let i = 0; i < tokens.length; i++) {
                if(i%500 == 0 && i) {
                    pushTokens.push(tokens[i]);
                    this.sendMulti(data, pushTokens);
                    pushTokens = [];
                }
                pushTokens.push(tokens[i]);
            }

            if(isNonEmptyArray(pushTokens)) {
                this.sendMulti(data, pushTokens);
            }
        }
    }
}