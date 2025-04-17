
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { IsNotEmpty } from './decorators';
import * as awsconfig from '../../../awsconfig.json';

export class SQSParams {

    @IsNotEmpty()
    userKey: string;
    
    @IsNotEmpty()
    itemSeqNo: number;

    @IsNotEmpty()
    type: 'randomBox' | 'randomPick'
}

export async function SQSsendMessage(msg: SQSParams) {

    let client = new SQSClient({
        region: awsconfig.region,
        credentials: {
            accessKeyId: awsconfig.accessSqsKeyId,
            secretAccessKey: awsconfig.secretSqsAccessKey,
        }
    });


    let url = '';;
    let groupId = '';

    if(msg.type == 'randomBox') {

        url = process.env.SQS_LUCKYBOX_URL;
        groupId = 'luckybox' + msg.itemSeqNo;

    } else if(msg.type == 'randomPick') {

        url = process.env.SQS_LUCKYPICK_URL;
        groupId = 'luckypick' + msg.itemSeqNo;
        
    }
    
    let command = new SendMessageCommand({
        QueueUrl: url,
        MessageBody: JSON.stringify(msg),
        MessageGroupId: groupId,
      });

      try{
        await client.send(command);
      } catch(e) {
        console.log('sqs error >>>>', e);
      }
      
}