export interface IERROR {
	code: number;
	message: string;
	description: string;
}

export class CoreError extends Error {
	public code: number;
	public message: string;
	public data: any;
	

	constructor(public error: IERROR, message?: string, data?: any) {
		super();
		this.code = error.code;
		this.message = message || error.message;
		this.data = data;
	}
}