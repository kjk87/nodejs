import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { LuckyDrawNumber } from "../entities/lucky_draw_number";
import { LuckyDrawNumberFilter } from "../services/lucky_draw_number";


@Service()
export class LuckyDrawNumberModel extends CoreModel<LuckyDrawNumber> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, LuckyDrawNumber);
    }

    public async setFilter(builder: SelectQueryBuilder<LuckyDrawNumber> | UpdateQueryBuilder<LuckyDrawNumber> | DeleteQueryBuilder<LuckyDrawNumber>, filter: LuckyDrawNumberFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.winNumber) {
                builder.andWhere('win_number = :winNumber', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<LuckyDrawNumber>, filter: LuckyDrawNumberFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async remainCount(luckyDrawSeqNo:number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT count(*) as count FROM lucky_draw_number_${luckyDrawSeqNo}
            WHERE used = false`))[0].count
    }

    public async getRemainNumberList(luckyDrawSeqNo:number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return await manager.query(`
            SELECT * FROM lucky_draw_number_${luckyDrawSeqNo}
            WHERE used = false`)
    }

    public async getRandomNumber(luckyDrawSeqNo:number, offset:number, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT * FROM lucky_draw_number_${luckyDrawSeqNo}
            WHERE used = false order by seq_no asc limit 1 offset ?`,[offset]))[0];
    }

    public async updateUse(luckyDrawSeqNo:number, seqNos:string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return await manager.query(`
            update lucky_draw_number_${luckyDrawSeqNo} set used = true
            WHERE seq_no in (${seqNos})`)
    }
}