import { Product } from './../../product/entities/product';
// import { MemberTotalListFilter } from './member';
import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { EntityManager } from "typeorm";
import { getUUIDv4, now } from "../../common/services/util";
import { Redis } from "../../common/services/redis";
import { getSession, registRefreshToken, setSession } from '../../common/services/session';
import axios from "axios";
import { LuckyboxPurchase } from "../../luckybox/entities/luckybox_purchase";
import { MemberA } from "../../member/entities/member_a";
import { LuckyboxPurchaseService, PaymentParams } from "../../luckybox/services/luckybox_purchase";
import { LuckyboxDeliveryPurchaseService } from "../../luckybox/services/luckybox_delivery_purchase";
import { LuckyboxDeliveryPurchase } from "../../luckybox/entities/luckybox_delivery_purchase";
import { ProductModel } from "../../product/models/product";
import { LuckyboxPurchaseItem } from '../../luckybox/entities/luckybox_purchase_item';
import { NODE_ENV } from '../../common/services/type';
import { Log } from '../../common/services/log';

// const authToken = Buffer.from('xnd_development_Jxexgh2BP6u8jcKBA4gBCbAMAQoJ0fXf31qMLuTKDlRJSE7EFZypUSZDCAP5kpw:').toString('base64');
// const authToken = Buffer.from('xnd_production_0uN0BL3nYJhY0fpfHVFC7PH29VyHdtUhdReXpyGlT5vOizJiCkcM6I58FY2mTF:').toString('base64');
const authToken = process.env.NODE_ENV == NODE_ENV.PROD ? Buffer.from('xnd_production_0uN0BL3nYJhY0fpfHVFC7PH29VyHdtUhdReXpyGlT5vOizJiCkcM6I58FY2mTF:').toString('base64') : process.env.NODE_ENV == NODE_ENV.STAGE ? Buffer.from('xnd_development_Jxexgh2BP6u8jcKBA4gBCbAMAQoJ0fXf31qMLuTKDlRJSE7EFZypUSZDCAP5kpw:').toString('base64') : Buffer.from('xnd_development_Jxexgh2BP6u8jcKBA4gBCbAMAQoJ0fXf31qMLuTKDlRJSE7EFZypUSZDCAP5kpw:').toString('base64');

@Service()
export class XenditService extends CoreService {


    @Inject(()=> LuckyboxPurchaseService)
    private luckyboxPurchaseService: LuckyboxPurchaseService;

    @Inject(()=> ProductModel)
    private productModel: ProductModel;

     @Inject(()=> LuckyboxDeliveryPurchaseService)
     private luckyboxDeliveryPurchaseService: LuckyboxDeliveryPurchaseService;
     constructor() {
          super();
     }

     public async paidCallback(req: Request, res: Response, params: PaymentParams){
        const { body } = req;
        Log(req, 'xendit', body);
        if (body.status === 'PAID') {
            // console.log(`Invoice successfully paid with status ${body.status} and id ${body.id}`)
            console.log(params);
            if(params.external_id.startsWith('box')){
                return await this.luckyboxPurchaseService.paymentLuckyBoxPurchase(req, res, params);
            }else if(params.external_id.startsWith('delivery')){
                return await this.luckyboxDeliveryPurchaseService.paymentLuckyBoxDeliveryPurchase(req, res, params);
            }
        }else if (body.status === 'EXPIRED') {
            if(params.external_id.startsWith('box')){
            
            }else if(params.external_id.startsWith('delivery')){
            
            }
        }
     }

     public async refundCallback(req: Request, res: Response){
        const { body } = req;
        if (body.data.status === 'SUCCEEDED') {
            console.log(body);
        }
    
     }

     public async cretateLuckyboxInvoce(luckyboxPurchase : LuckyboxPurchase, member:MemberA) {


        try {
            const { data, status } = await axios.post('https://api.xendit.co/v2/invoices',
            {
                external_id: luckyboxPurchase.orderNo,
                amount: luckyboxPurchase.pgPrice,
                currency: 'IDR',
                customer: {
                    given_names: member.nickname,
                    surname: member.nickname,
                    email: member.email,
                    //    mobile_number: '+6287774441111',
                },
                customer_notification_preference: {
                    invoice_paid: ['email']
                    //    invoice_paid: ['email', 'whatsapp']
                },
                success_redirect_url: process.env.URL+'xendit/success',
                failure_redirect_url: process.env.URL+'xendit/failure',
                items: [
                    {
                        name: luckyboxPurchase.title,
                        quantity: luckyboxPurchase.quantity,
                        price: luckyboxPurchase.price,
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            })

            if(status == 200){

                const { invoice_url } = data;
                const { id } = data;

                luckyboxPurchase.xenditId = id;
                luckyboxPurchase.invoiceUrl = invoice_url;
            }
           } catch (error) {
               console.log("Request failed")
           }
     }

     public async cretateLuckyboxDeleiveryInvoce(luckyboxDeliveryPurchase : LuckyboxDeliveryPurchase, luckyboxPurchaseItem: LuckyboxPurchaseItem, member:MemberA) {

        let product: Product = await this.productModel.get(luckyboxPurchaseItem.productSeqNo);

        try {
            const { data, status } = await axios.post('https://api.xendit.co/v2/invoices',
            {
                external_id: luckyboxDeliveryPurchase.orderNo,
                amount: luckyboxDeliveryPurchase.pgPrice,
                currency: 'IDR',
                customer: {
                    given_names: member.nickname,
                    surname: member.nickname,
                    email: member.email,
                    //    mobile_number: '+6287774441111',
                },
                customer_notification_preference: {
                    invoice_paid: ['email']
                    //    invoice_paid: ['email', 'whatsapp']
                },
                success_redirect_url: process.env.URL+'xendit/success',
                failure_redirect_url: process.env.URL+'xendit/failure',
                items: [
                    {
                        name: product.name,
                        quantity: 1,
                        price: luckyboxDeliveryPurchase.price,
                        //    category: 'Fast Food'
                    }
                ],
                    //    fees: [
                    //        {
                    //            type: "Shipping",
                    //            value: 10000
                    //        }
                    //    ]
            },
            {
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            })

            
            
            if(status == 200){

                const { invoice_url } = data;
                const { id } = data;

                luckyboxDeliveryPurchase.xenditId = id;
                luckyboxDeliveryPurchase.invoiceUrl = invoice_url;
            }
           } catch (error) {
               console.log("Request failed")
           }
     }
}