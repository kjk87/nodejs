import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE } from "../../DataSourceManager";
import { MemberTotalListFilter } from "../services/member";
import { MemberA } from "../entities/member_a";

@Service()
export class MemberAModel extends CoreModel<MemberA> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, MemberA);
    }

    public async setFilter(builder: SelectQueryBuilder<MemberA> | UpdateQueryBuilder<MemberA> | DeleteQueryBuilder<MemberA>, filter: MemberTotalListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.userKey) {
                builder.andWhere('user_key = :userKey', filter);
            }
            if(filter.email) {
                builder.andWhere('email = :email', filter);
            }
            if(filter.nickname) {
                builder.andWhere('nickname = :nickname', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MemberA>, filter: MemberTotalListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async getProfile(userKey?: string, st?:string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

        return (await manager.query(`
            SELECT profile FROM member_${st} WHERE user_key = ?
        `, [userKey]))[0].profile
    }
}