import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel, IOrder, IPaging } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxPurchaseItem } from "../entities/luckybox_purchase_item";
import { LuckyboxPurchaseItemListFilter } from "../services/luckybox_purchase_item";
import { safeNumber } from "../../common/services/util";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxPurchaseItemModel extends CoreModel<LuckyboxPurchaseItem> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxPurchaseItem);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxPurchaseItem> | UpdateQueryBuilder<LuckyboxPurchaseItem> | DeleteQueryBuilder<LuckyboxPurchaseItem>, filter: LuckyboxPurchaseItemListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                if(Array.isArray(filter.seqNo)) {
                    builder.andWhere('entity.seq_no  in(:seqNo)', filter);
                } else {
                    builder.andWhere('entity.seq_no = :seqNo', filter);
                }
            }
            if(filter.luckyboxSeqNo) {
                builder.andWhere('luckybox_seq_no = :luckyboxSeqNo', filter);
            }
            if(filter.luckyboxPurchaseSeqNo) {
                if(Array.isArray(filter.luckyboxPurchaseSeqNo)) {
                    builder.andWhere('luckybox_purchase_seq_no in(:luckyboxPurchaseSeqNo)', filter);
                } else {
                    builder.andWhere('luckybox_purchase_seq_no = :luckyboxPurchaseSeqNo', filter);
                }
                
            }
            if(filter.luckyboxPayResponseTranSeq) {
                builder.andWhere('luckybox_pay_response_tran_seq = :luckyboxPayResponseTranSeq', filter);
            }
            if(filter.userKey) {
                builder.andWhere('entity.user_key = :userKey', filter);
            }
            if(filter.tempMember) {
                builder.andWhere('temp_member = :tempMember', filter);
            }
            if(filter.luckyboxTitle) {
                builder.andWhere('luckybox_title = :luckyboxTitle', filter);
            }
            if(filter.paymentMethod) {
                builder.andWhere('payment_method = :paymentMethod', filter);
            }
            if(filter.price) {
                builder.andWhere('price = :price', filter);
            }
            if(filter.status) {
                if(Array.isArray(filter.status)) {
                    builder.andWhere('entity.status in(:status)', filter);
                } else {
                    builder.andWhere('entity.status = :status', filter);
                }     
            }
            if(filter.isOpen !== undefined) {
                builder.andWhere('is_open = :isOpen', filter);
            }
            if(filter.deliveryStatus) {
                if(Array.isArray(filter.deliveryStatus)) {
                    builder.andWhere('entity.deliveryStatus in(:deliveryStatus)', filter);
                } else {
                    builder.andWhere('entity.deliveryStatus = :deliveryStatus', filter);
                }   
            }
            if(filter.regDatetime) {
                builder.andWhere('reg_datetime = :regDatetime', filter);
            }
            if(filter.paymentDatetime) {
                builder.andWhere('payment_datetime = :paymentDatetime', filter);
            }
            if(filter.openDatetime) {
                builder.andWhere('open_datetime = :openDatetime', filter);
            }
            if(filter.cancelDatetime) {
                builder.andWhere('cancel_datetime = :cancelDatetime', filter);
            }
            if(filter.completeDatetime) {
                builder.andWhere('complete_datetime = :completeDatetime', filter);
            }
            if(filter.exchangeDatetime) {
                builder.andWhere('exchange_datetime = :exchangeDatetime', filter);
            }
            if(filter.productSeqNo) {
                builder.andWhere('product_seq_no = :productSeqNo', filter);
            }
            if(filter.productDeliverySeqNo) {
                builder.andWhere('product_delivery_seq_no = :productDeliverySeqNo', filter);
            }
            if(filter.productType) {
                builder.andWhere('product_type = :productType', filter);
            }
            if(filter.productName) {
                builder.andWhere('product_name = :productName', filter);
            }
            if(filter.productImage) {
                builder.andWhere('product_image = :productImage', filter);
            }
            if(filter.productPrice) {
                builder.andWhere('product_price = :productPrice', filter);
            }
            if(filter.optionName) {
                builder.andWhere('option_name = :optionName', filter);
            }
            if(filter.optionPrice) {
                builder.andWhere('option_price = :optionPrice', filter);
            }
            if(filter.supplyPrice) {
                builder.andWhere('supply_price = :supplyPrice', filter);
            }
            if(filter.supplyPricePaymentFee) {
                builder.andWhere('supply_price_payment_fee = :supplyPricePaymentFee', filter);
            }
            if(filter.deliveryFee) {
                builder.andWhere('delivery_fee = :deliveryFee', filter);
            }
            if(filter.deliveryPayStatus) {
                builder.andWhere('delivery_pay_status = :deliveryPayStatus', filter);
            }
            if(filter.luckyboxDeliveryPurchaseSeqNo) {
                builder.andWhere('luckybox_delivery_purchase_seq_no = :luckyboxDeliveryPurchaseSeqNo', filter);
            }
            if(filter.deliveryPaymentPrice) {
                builder.andWhere('delivery_payment_price = :deliveryPaymentPrice', filter);
            }
            if(filter.turnNo) {
                builder.andWhere('turn_no = :turnNo', filter);
            }
            if(filter.luckyboxDeliverySeqNo) {
                builder.andWhere('luckybox_delivery_seq_no = :luckyboxDeliverySeqNo', filter);
            }
            if(filter['deliveryStatusIsNotNull']) {
                builder.andWhere('entity.delivery_status is not null');
            }
            if(filter.blind !== undefined) {
                builder.andWhere('blind = :blind', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxPurchaseItem>, filter: LuckyboxPurchaseItemListFilter, entity?: any): Promise<void> {
        builder.addSelect(`(select count(1) from luckybox_review lrv where lrv.luckybox_purchase_item_seq_no = entity.seq_no) > 0`, 'entity_isReviewExist');
        builder.addSelect(`(select count(1) from luckybox_reply lr where lr.luckybox_purchase_item_seq_no = entity.seq_no and lr.status = 1)`, 'entity_replyCount');
        builder.addSelect(`(select provide_bol from luckybox lb where entity.luckybox_seq_no = lb.seq_no)`, 'entity_provideBol');
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
    
    public async getCountNotOpenLuckyBoxPurchaseItem(filter, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            select COUNT(*) as _count
            FROM luckybox_purchase_item
            WHERE user_key = ?
            AND status = ?
            AND is_open = ?
        `, [filter.userKey, filter.status, filter.isOpen])
    }

    public async getTotalLuckyPurchaseItemList(order: IOrder[], paging: IPaging, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return manager.query(`
            (
                SELECT 
                    seq_no                              AS seqNo,
                    luckybox_seq_no                     AS luckyboxSeqNo,
                    luckybox_purchase_seq_no            AS luckyboxPurchaseSeqNo,
                    luckybox_pay_response_tran_seq      AS luckyboxPayResponseTranSeq,
                    user_key                            AS userKey,
                    temp_member                         AS tempMember,
                    luckybox_title                      AS luckyboxTitle,
                    payment_method                      AS paymentMethod,
                    price                               AS price,
                    status                              AS status,
                    is_open                             AS isOpen,
                    delivery_status                     AS deliveryStatus,
                    reg_datetime                        AS regDatetime,
                    payment_datetime                    AS paymentDatetime,
                    open_datetime                       AS openDatetime,
                    cancel_datetime                     AS cancelDatetime,
                    complete_datetime                   AS completeDatetime,
                    exchange_datetime                   AS exchangeDatetime,
                    product_seq_no                      AS productSeqNo,
                    product_delivery_seq_no             AS productDeliverySeqNo,
                    product_type                        AS productType,
                    product_name                        AS productName,
                    product_image                       AS productImage,
                    product_price                       AS productPrice,
                    option_name                         AS optionName,
                    option_price                        AS optionPrice,
                    supply_price                        AS supplyPrice,
                    supply_price_payment_fee            AS supplyPricePaymentFee,
                    delivery_fee                        AS deliveryFee,
                    delivery_pay_status                 AS deliveryPayStatus,
                    luckybox_delivery_purchase_seq_no   AS luckyboxDeliveryPurchaseSeqNo,
                    delivery_payment_price              AS deliveryPaymentPrice,
                    turn_no                             AS turnNo,
                    luckybox_delivery_seq_no            AS luckyboxDeliverySeqNo,
                    (select count(1) from luckybox_reply where luckybox_purchase_item_seq_no = lpi.seq_no and status = 1) as replyCount, 
                    true as isLuckybox 
                FROM 
                       pplus.luckybox_purchase_item lpi 
                WHERE 
                    lpi.seq_no >= 112 and lpi.is_open = true and lpi.status = 2 and lpi.delivery_status is not null
            ) 
            UNION ALL
                (
                    SELECT 
                        *, 
                        (select count(1) from lucky_pick_reply where lucky_pick_purchase_item_seq_no = lpi.seq_no and status = 1) as replyCount, 
                        false as isLuckybox 
                    FROM 
                        pplus.lucky_pick_purchase_item lpi 
                    WHERE 
                        lpi.is_open = true and lpi.status = 2
                )
            ORDER BY openDatetime DESC
            LIMIT ${safeNumber(paging.limit) || 100}
            OFFSET ${safeNumber(paging.page) * safeNumber(paging.limit)}
        `)
    }

    public async getTotalLuckyPurchaseItemListCount(manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();
        return await manager.query(`
            SELECT count(*) as _count
            FROM ((SELECT seq_no FROM pplus.luckybox_purchase_item where seq_no >= 112 and is_open = true and status = 2 and delivery_status is not null)
            UNION (SELECT seq_no FROM pplus.lucky_pick_purchase_item where is_open = true and status = 2)) as lpi
        `)
    }
}