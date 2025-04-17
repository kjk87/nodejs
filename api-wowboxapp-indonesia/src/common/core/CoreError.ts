export interface IERROR {
	code: number;
	message: string;
	description: string;
}

export class CoreError extends Error {
	public code: number;
	public message: string;
	public result: any;
	

	constructor(public error: IERROR, message?: string, result?: any) {
		super();
		this.code = error.code;
		this.message = message || error.message;
		this.result = result;
	}
}