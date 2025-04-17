import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { Terms } from "../entities/terms";
import { TermsAgree } from "../entities/terms_agree";
import { TermsAgreeFilter } from "../services/terms";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";


@Service()
export class TermsAgreeModel extends CoreModel<TermsAgree> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, Terms);
    }

    public async setFilter(builder: SelectQueryBuilder<TermsAgree> | UpdateQueryBuilder<TermsAgree> | DeleteQueryBuilder<TermsAgree>, filter: TermsAgreeFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.termsSeqNo) {
                builder.andWhere('terms_seq_no = :termsSeqNo', filter);
            }

        }
    }

    public async setJoin(builder: SelectQueryBuilder<TermsAgree>, filter: TermsAgreeFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}