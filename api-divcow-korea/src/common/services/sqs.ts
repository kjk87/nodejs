
import { SendMessageCommand, SQSClient, ReceiveMessageCommand, DeleteMessageCommand, DeleteMessageBatchCommand } from "@aws-sdk/client-sqs";
import { IsNotEmpty } from './decorators';
import * as awsconfig from '../../../awsconfig.json';
import { Inject } from "typedi";
import { LuckyboxPurchaseItemService } from "../../luckybox/services/luckybox_purhcase_item";
import { errorLog } from "./log";

export class SQSParams {

    @IsNotEmpty()
    userKey: string;
    
    @IsNotEmpty()
    itemSeqNo: number;

    @IsNotEmpty()
    type: string;

}

export class SQSService {
    
    @Inject(()=> LuckyboxPurchaseItemService)
    private luckyboxPurchaseItemService: LuckyboxPurchaseItemService;
    
    private CLIENT = new SQSClient({
        region: awsconfig.region,
        credentials: {
            accessKeyId: awsconfig.sqsAccessKeyId,
            secretAccessKey: awsconfig.sqsSecretAccessKey,
        }
    });


    public async SQSsendMessage(msg: SQSParams) {

        let command = new SendMessageCommand({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(msg),
            MessageGroupId: msg.type
        });
    
        try{
        let result = await this.CLIENT.send(command);
            console.log('sqs result >>>>', result);
        } catch(e) {
            console.log('sqs error >>>>', e);
        }  
    }

    public async SQSReceiveMessage() {
        while(true) {
            await this.receiveMessage();
        }
    }

    private async receiveMessage() {

        try {
            const { Messages } = await this.CLIENT.send(
                new ReceiveMessageCommand({
                    AttributeNames: ['FifoQueue'],
                    MaxNumberOfMessages: 10,
                    MessageAttributeNames: ["All"],
                    QueueUrl: process.env.SQS_URL,
                    WaitTimeSeconds: 20,
                    VisibilityTimeout: 20,
                }),
            );
          
            if (!Messages) {

                return;
            }
        
        
            for(let message of Messages) {
        
                console.log('[SQS MESSAGE] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', message.Body);
        
                let resultCode = await this.luckyboxPurchaseItemService.openLuckybox(message.Body);
    
                if(resultCode === 1) {
                    await this.CLIENT.send(
                        new DeleteMessageCommand({
                            QueueUrl: process.env.SQS_URL,
                            ReceiptHandle: message.ReceiptHandle,
                        }),
                    );
                } else {
    
                }
    
            }
        
            return;
        } catch(e) {
            let message = {
                ...{name: "[SQS ERROR]\n"}, ...e
            }
            errorLog(message);

            await new Promise((resolve, reject)=> {
                setTimeout(() => {
                    resolve(true);
                }, 5000);
            })
        }

    };
} 



    




