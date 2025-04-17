import { NODE_ENV } from './type';
import { CoreError } from '../core/CoreError';
import * as ErrorType from './errorType';
import * as awsconfig from '../../../awsconfig.json';
import { ListObjectsV2Command, S3 } from '@aws-sdk/client-s3';

export async function uploadFile(buffer, key, contentType) {
    var acl: 'private' | 'public-read' = process.env.NODE_ENV == 'PROD' ? 'private' : 'public-read';
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
            ACL: 'private',
            Bucket: awsconfig.bucket,
            Body: buffer,
            ContentType: contentType,
        }, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}