import { CoreEntity } from "./CoreEntity";
import { CoreListResponse } from "./CoreListResponse";
import { isNonEmptyArray, safeArray } from "../services/util";
import { orderingKey } from "../services/ordering";
import { DataSource, DeleteQueryBuilder, EntityManager, QueryRunner, SaveOptions, SelectQueryBuilder, UpdateQueryBuilder } from "typeorm";


export interface IBetween<T = string> {
	min?: T;
	max?: T;
}

export interface IOrder {
	column: string;
    dir: 'ASC' | 'DESC' | 'asc' | 'desc';
    table?: string;
}

export interface IPaging {
	limit: number;
	page?: number;
	start?: number;
}

export interface IJoin {
	joinTable: string;
	defaultTable?: string;
	join?: 'left' | 'inner';
	joinCondition?: string;
}

export class ListFilter {
	order?: IOrder[];
	paging?: IPaging;
	joinColumn?: IJoin[];
	appType?: string;
}

export class CoreModel<T extends CoreEntity> {
    constructor(
		protected defaultDataSource: DataSource,
		protected defaultEntity?: any, 
		protected defaultAlias = 'entity'
	) {

    }

   	/* select */
	public async get(id: any, entity: any = this.defaultEntity, filter?: any, manager?: EntityManager): Promise<T | undefined> {

        manager = manager ? manager : this.defaultDataSource.createEntityManager();
		
		let builder = manager.createQueryBuilder<T>(entity, this.defaultAlias);

		await this.setJoin(builder, filter, entity);
		
		return await builder.whereInIds(id).getOne();
	}

	public async getByFilter(filter?: any, order?: IOrder[], entity: any = this.defaultEntity, manager?: EntityManager): Promise<T | undefined> {

		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let builder = await manager.createQueryBuilder<T>(entity, this.defaultAlias);

		await this.setJoin(builder, filter, entity);
		
		if(filter) {
			await this.setFilter(builder, filter, entity);
		}
		if(order) {
			this.setOrder(builder, order);
		}

		return await builder.getOne();
	}

	public async getCount(filter?: any, entity: any = this.defaultEntity, manager?: EntityManager): Promise<any> {

		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let builder = await manager.createQueryBuilder<T>(entity, this.defaultAlias);

		await this.setJoin(builder, filter, entity);
		
		if(filter) {
			await this.setFilter(builder, filter, entity);
		}
		
		return await builder.getCount();
	}

	public async list(filter?: any, order?: IOrder[], paging: IPaging = { page: 1, limit: 10 }, entity: any = this.defaultEntity, manager?: EntityManager): Promise<CoreListResponse<any>> {
		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let builder: SelectQueryBuilder<any> = await manager.createQueryBuilder(entity, this.defaultAlias);

		await this.setJoin(builder, filter, entity);
		
		if(filter) {
			await this.setFilter(builder, filter, entity);
		}
		if(order) {
			this.setOrder(builder, order);
		}
		if(paging) {
			this.setPaging(builder, paging);
		}
		
		let result = await builder.getManyAndCount();
	
		return new CoreListResponse(result[0], result[1]);
	}

	public async all(filter?: any, order?: IOrder[], entity: any = this.defaultEntity, manager?: EntityManager): Promise<{list: any[]}> {
		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let builder: SelectQueryBuilder<any> = await manager.createQueryBuilder(entity, this.defaultAlias);

		await this.setJoin(builder, filter, entity);

		if(filter) {
			await this.setFilter(builder, filter, entity);
		}
		if(order) {
			this.setOrder(builder, order);
		}

		let result = await builder.getMany();

		return {list: result};
	}

	public async create(data: T, entity: any = this.defaultEntity, manager?: EntityManager): Promise<T> {
        manager = manager ? manager : this.defaultDataSource.createEntityManager();
		// let repo = manager.getRepository(entity);
		// await repo.insert(data);
		// return data;
		return await manager.save(data);
	}

	public async update(data: T, entity: any = this.defaultEntity, manager?: EntityManager): Promise<T> {
        manager = manager ? manager : this.defaultDataSource.createEntityManager();
		let repo = manager.getRepository(entity);
		await repo.save(data);
		return data;
	}

	public async updatesById(id: any, value: any, entity: any = this.defaultEntity, manager?: EntityManager) {
		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let update = manager.createQueryBuilder<T>(entity, this.defaultAlias).update();

		update.set(value);
		update.whereInIds(id);

		return await update.execute();
	}

	public async updatesByFilter(filter: any, value: any, entity: any = this.defaultEntity, manager?: EntityManager) {

		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let update = manager.createQueryBuilder<T>(entity, this.defaultAlias).update();

		update.set(value);
		await this.setFilter(update, filter, entity);

		return await update.execute();
	}

	public async delete(data: T, manager?: EntityManager): Promise<T> {
		manager = manager ? manager : this.defaultDataSource.createEntityManager();
		return await manager.remove(data);
	}

	public async deletesById(id: any, entity: any = this.defaultEntity, manager?: EntityManager) {
		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let del = manager.createQueryBuilder<T>(entity, this.defaultAlias).delete();

		del.whereInIds(id);

		return await del.execute();
	}

	public async deletesByFilter(filter: any, entity: any = this.defaultEntity, manager?: EntityManager) {

		manager = manager ? manager : this.defaultDataSource.createEntityManager();

		let del = manager.createQueryBuilder<T>(entity, this.defaultAlias).delete();

		await this.setFilter(del, filter, entity);

		return await del.execute();
	}

	public async setJoin(builder: SelectQueryBuilder<T>, filter: any, entity: any = this.defaultEntity) {
		if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
	}

	/* filter */
	public async setFilter(builder: SelectQueryBuilder<T> | UpdateQueryBuilder<T> | DeleteQueryBuilder<T>, filter: any, entity: any = this.defaultEntity) {
		throw Error('setFilter is not implemented');
	}

	protected equalsIn(builder: SelectQueryBuilder<T> | UpdateQueryBuilder<T> | DeleteQueryBuilder<T>, filter: any, name: string, defaultTable?: string) {
		let table = '';
		if(builder instanceof SelectQueryBuilder && defaultTable) {
			table = "`" + defaultTable + "`.";
		}
		if(filter[name]) {
			if(Array.isArray(filter[name])) {
				if(filter[name].length != 0){
					builder.andWhere(`${table}${name} in (:${name})`, filter);
				}		
			}
			else {
				builder.andWhere(`${table}${name} = :${name}`, filter);
			}
		}
	}
	
	/* order */
	protected setOrder(builder: SelectQueryBuilder<any>, order: IOrder[], defaultTable: string = this.defaultAlias) {
		
		order = orderingKey(order)
		for(let i = 0; i < order.length; ++i) {
			let dir: 'ASC' | 'DESC' = this.normalizeDir(order[i].dir);
			if(order[i].column) {
                let table = '';
                if(order[i].table) {
                    table = `\`${order[i].table}\`.`;
                }
                else if(defaultTable) {
                    table = `\`${defaultTable}\`.`;
                }
                
				builder.addOrderBy(`${table}\`${order[i].column}\``, dir);
			}
		}
	}

	protected normalizeDir(dir: string): 'ASC' | 'DESC' {
		return !dir || dir.toUpperCase() == 'ASC' ? 'ASC' : 'DESC';
	}

	/* paging */
	protected setPaging(builder: SelectQueryBuilder<any>, paging: IPaging) {
		if(paging) {
			if(paging.start !== undefined) {
				builder.offset(paging.start);
			}
			else if(paging.page > 0) {
				builder.offset((paging.page - 1) * paging.limit);
			}

			if(paging.limit) {
				builder.limit(paging.limit);
			}
		}
	}

	protected joinColumn(builder: SelectQueryBuilder<T>, join: IJoin[]) {
		
		if(isNonEmptyArray(join)) {
			for(let c of join) {
				c.defaultTable = c.defaultTable ? c.defaultTable : 'entity';
				c.join = c.join ? c.join : 'left';
				if(c.join == 'left') {
					if(c.joinCondition) {
						builder.leftJoinAndSelect(`${c.defaultTable}.${c.joinTable}`, c.joinTable, c.joinCondition);
					} else {
						builder.leftJoinAndSelect(`${c.defaultTable}.${c.joinTable}`, c.joinTable);
					}
					
				} else if(c.join == 'inner') {
					builder.innerJoinAndSelect(`${c.defaultTable}.${c.joinTable}`, c.joinTable);
				}
			}
		}
		
	}
}