import { SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, EntityManager } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { Device } from "../entities/device";
import { DeviceFilter } from "../services/device";

@Service()
export class DeviceModel extends CoreModel<Device> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, Device);
    }

    public async setFilter(builder: SelectQueryBuilder<Device> | UpdateQueryBuilder<Device> | DeleteQueryBuilder<Device>, filter: DeviceFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.deviceId) {
                builder.andWhere('device_id = :deviceId', filter);
            }
            if(filter.pushId) {
                builder.andWhere('push_id = :pushId', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<Device>, filter: DeviceFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }

    public async updatePushActivate(deviceId: string, pushActivate: boolean, manager?: EntityManager) {
        manager = manager ? manager : DUCKCOIN_DATASOURCE.createEntityManager();

        return await manager.query(`
            update device set push_activate = ? where device_id = ?
        `, [pushActivate, deviceId])
    }
}