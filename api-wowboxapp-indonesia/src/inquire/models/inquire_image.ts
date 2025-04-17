import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { InquireImage } from "../entities/inquire_image";
import { InquireImageFilter } from "../service/inquire";


@Service()
export class InquireImageModel extends CoreModel<InquireImage> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, InquireImage);
    }

    public async setFilter(builder: SelectQueryBuilder<InquireImage> | UpdateQueryBuilder<InquireImage> | DeleteQueryBuilder<InquireImage>, filter: InquireImageFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.inquireSeqNo) {
                builder.andWhere('inquire_seq_no = :inquireSeqNo', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<InquireImage>, filter: InquireImageFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}