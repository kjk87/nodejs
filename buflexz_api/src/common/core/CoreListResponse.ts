export class CoreListResponse<T> {
	public list: T[];
	public total: number;
	constructor(list: T[], total = 0) {
		this.list = list;
		this.total = total;
	}
}