import * as crypto from 'crypto';
import { sha256 } from 'js-sha256';

const SECRET_KEY = "H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkX";
const IV_KEY = "6w9z$C&F)J@NcRfU";

//password 단방향 암호화
export function encryptSHA256Hmac(secretKey: string, encData: string) {
	try {
		return sha256.hmac(secretKey + "xwspqj)(#", encData + "eptigvy@&^(");	
	} catch(e) {
		return undefined;
	}
}

//data 암호화
export function encrypt(encText) {

    let secret_buffer = Buffer.from(SECRET_KEY);
    let iv_buffer = Buffer.from(IV_KEY);

    let cipher = crypto.createCipheriv(process.env.CRYPTO, secret_buffer, iv_buffer);
    let encrypted = cipher.update(encText, 'utf8', 'base64') + cipher.final('base64');
    
    return encrypted;
}

//복호화
export function decrypt(decText) {

    try{
        let secret_buffer = Buffer.from(SECRET_KEY);
        let iv_buffer = Buffer.from(IV_KEY);
    
        let decipher = crypto.createDecipheriv(process.env.CRYPTO, secret_buffer, iv_buffer);
        let decrypt  = Buffer.concat([decipher.update(decText, 'base64'), decipher.final()]) 
        
        let decrypted = decrypt.toString();
    
        return decrypted;
    } catch(e) {
        return ' - '
    }

}