import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { LuckyboxPurchaseCancel } from "../entities/luckybox_purchase_cancel";
import { LuckyboxPurchaseCancelListFilter } from "../services/luckybox_purchase_cancel";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

@Service()
export class LuckyboxPurchaseCancelModel extends CoreModel<LuckyboxPurchaseCancel> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyboxPurchaseCancel);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyboxPurchaseCancel> | UpdateQueryBuilder<LuckyboxPurchaseCancel> | DeleteQueryBuilder<LuckyboxPurchaseCancel>, filter: LuckyboxPurchaseCancelListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.luckyboxPurchaseSeqNo) {
                builder.andWhere('luckybox_purchase_seq_no = :luckyboxPurchaseSeqNo', filter);
            }
            if(filter.luckyboxPurchaseItemSeqNo) {
                builder.andWhere('luckybox_purchase_item_seq_no = :luckyboxPurchaseItemSeqNo', filter);
            }
            if(filter.payResponseAmt) {
                builder.andWhere('pay_response_amt = :payResponseAmt', filter);
            }
            if(filter.payResponseApprovalNo) {
                builder.andWhere('pay_response_approval_no = :payResponseApprovalNo', filter);
            }
            if(filter.payResponseApprovalYmdhms) {
                builder.andWhere('pay_response_approval_ymdhms = :payResponseApprovalYmdhms', filter);
            }
            if(filter.payResponseCardId) {
                builder.andWhere('pay_response_card_id = :payResponseCardId', filter);
            }
            if(filter.payResponseCardNm) {
                builder.andWhere('pay_response_card_nm = :payResponseCardNm', filter);
            }
            if(filter.payResponseCertYn) {
                builder.andWhere('pay_response_cert_yn = :payResponseCertYn', filter);
            }
            if(filter.payResponseCode) {
                builder.andWhere('pay_response_code = :payResponseCode', filter);
            }
            if(filter.payResponseInstallment) {
                builder.andWhere('pay_response_installment = :payResponseInstallment', filter);
            }
            if(filter.payResponseMsg) {
                builder.andWhere('pay_response_msg = :payResponseMsg', filter);
            }
            if(filter.payResponseOrderNo) {
                builder.andWhere('pay_response_order_no = :payResponseOrderNo', filter);
            }
            if(filter.payResponsePayDate) {
                builder.andWhere('pay_response_pay_date = :payResponsePayDate', filter);
            }
            if(filter.payResponsePayTime) {
                builder.andWhere('pay_response_pay_time = :payResponsePayTime', filter);
            }
            if(filter.payResponsePayType) {
                builder.andWhere('pay_response_pay_type = :payResponsePayType', filter);
            }
            if(filter.payResponseSellMm) {
                builder.andWhere('pay_response_sell_mm = :payResponseSellMm', filter);
            }
            if(filter.payResponseTestYn) {
                builder.andWhere('pay_response_test_yn = :payResponseTestYn', filter);
            }
            if(filter.payResponseTranSeq) {
                builder.andWhere('pay_response_tran_seq = :payResponseTranSeq', filter);
            }
            if(filter.payResponseZerofeeYn) {
                builder.andWhere('pay_response_zerofee_yn = :payResponseZerofeeYn', filter);
            }
            if(filter.payResponsePartCancelFlag) {
                builder.andWhere('pay_response_part_cancel_flag = :payResponsePartCancelFlag', filter);
            }
            if(filter.payResponseRemainAmt) {
                builder.andWhere('pay_response_remain_amt = :payResponseRemainAmt', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyboxPurchaseCancel>, filter: LuckyboxPurchaseCancelListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}