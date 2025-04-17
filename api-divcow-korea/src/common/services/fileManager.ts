import * as fs from 'fs';
import { CoreError } from '../core/CoreError';
import { E_NOTFOUND } from './errorType';


export class FileManager {

    private LocS_FileName = null;
    private LocS_DirName = null;
    private static ins;


    public static async getIntance() {
        if(!this.ins) {
            this.ins = new FileManager();
        }

        return this.ins;
    }

    public async setAutoFile(inLogPath: string, inFileName: string) {
        let dir = '';
        let path = inLogPath.split('/');
            for(let p of path) {
                dir += '/' + p;
                if(!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
            
        this.LocS_DirName = dir;
        this.LocS_FileName = inFileName + '.log';

        return dir;
    }

    public async writeFileln(contents: string) {    


        if(!this.LocS_DirName || !this.LocS_FileName || !fs.existsSync(this.LocS_DirName)) throw new CoreError(E_NOTFOUND, 'fileName, fileDir not Found');

        let fullPath = this.LocS_DirName + '/' + this.LocS_FileName;

        if(fs.existsSync(fullPath)) {
            fs.appendFileSync(fullPath, contents);
        } else {
            fs.writeFileSync(fullPath, contents);
        }
    }
}