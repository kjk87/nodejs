import { S3, ListObjectsV2Command  } from '@aws-sdk/client-s3';
import { CoreError } from '../core/CoreError';
import * as awsconfig from '../../../awsconfig.json';
import { E_NOTFOUND } from './errorType';
import { NODE_ENV } from './type';




export async function uploadFile(buffer, key, contentType) {
    
    let ACL: 'public-read' | 'private' = process.env.NODE_ENV != NODE_ENV.LOCAL ? 'private' : 'public-read';


    console.log('fileuploadContentType>>>>>>>>>>>>>>>>>>>>>>>', contentType);
    return await new Promise((resolve, reject) => {
        let s3 = new S3({
            region: awsconfig.region,
            credentials: {
                accessKeyId: awsconfig.accessKeyId,
                secretAccessKey: awsconfig.secretAccessKey,
            }
        });
        s3.send(new ListObjectsV2Command({Bucket: awsconfig.bucket}));
        
        s3.putObject({
            Key: key,
            ACL: ACL,
            Bucket: awsconfig.bucket,
            Body: buffer,
            ContentType: contentType,
        }, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}