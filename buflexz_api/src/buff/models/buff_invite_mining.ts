import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { BuffInviteMining } from "../entities/buff_invite_mining";

export class BuffInviteMiningModel extends CoreModel<BuffInviteMining> {

    constructor() {
        super(BUFLEXZ_DATASOURCE, BuffInviteMining)
    }

    public async setFilter(builder: SelectQueryBuilder<BuffInviteMining> | UpdateQueryBuilder<BuffInviteMining> | DeleteQueryBuilder<BuffInviteMining>, filter: any, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere(`seq_no = :seqNo`, filter);
            }
            if(filter.userKey) {
                builder.andWhere(`user_key = :userKey`, filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<BuffInviteMining>, filter: any, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getSumCoin(userKey:string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT ifnull(SUM(coin), 0) as sum_total FROM buff_invite_mining
            WHERE user_key = ?
        `, [userKey]))[0].sum_total
    }
}