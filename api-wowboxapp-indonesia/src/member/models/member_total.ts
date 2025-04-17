import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { MemberTotal } from "../entities/member_total";
import { MemberTotalListFilter } from "../services/member";

@Service()
export class MemberTotalModel extends CoreModel<MemberTotal> {
     constructor() {
        super(BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE, MemberTotal);
    }

    public async setFilter(builder: SelectQueryBuilder<MemberTotal> | UpdateQueryBuilder<MemberTotal> | DeleteQueryBuilder<MemberTotal>, filter: MemberTotalListFilter, entity?: any): Promise<void> {
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
            if(filter.platformKey) {
                builder.andWhere('platform_key = :platformKey', filter);
            }
            if(filter.recommendeeKey) {
                builder.andWhere('recommendee_key = :recommendeeKey', filter);
            }
            if(filter.isAuthEmail) {
                builder.andWhere('is_auth_email = :isAuthEmail', filter);
            }
            if(filter.isRewardCoin) {
                builder.andWhere('is_reward_coin = :isRewardCoin', filter);
            }
            if(filter.mobileNumber) {
                builder.andWhere('mobile_number = :mobileNumber', filter);
            }
            if(filter.verifiedMobile) {
                builder.andWhere('verified_mobile = :verifiedMobile', filter);
            }
            if(filter.condition){
                builder.andWhere(filter.condition)
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<MemberTotal>, filter: MemberTotalListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async nicknameExist(nickname?: string, manager?: EntityManager) {
        manager = manager ? manager : BUFLEXZ_RP_DATASOURCE.createEntityManager();

        return ((await manager.query(`
            SELECT count(*) as count FROM member_total WHERE nickname = ?
        `, [nickname]))[0].count) > 0
    }
}