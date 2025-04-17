import { BaseEntity } from "typeorm";
import { camelCase, underscoreCase } from "../services/util";

export class CoreEntity extends BaseEntity{

    public toObject(): {[key: string]: any} {
		let obj: {[key: string]: any} = {};
		for(let key in this) {
			if(typeof this[key] != 'function') {
				obj[key] = this[key];
			}
		}

		return obj;
    }

	public mappingRawObject(obj: Object) {
		for(let key in obj) {
			if(typeof obj[key] != 'function') {
				this[camelCase(key)] = obj[key];
			}
		}
	}

	/**
	 * 
	 * @description FrontClass 용
	 */
	public mappingRawObjectByClass(obj: any) {
		for(let key in this) {
			if(typeof this[key] != 'function') {
				if(obj[key] !== null && obj[key] !== undefined) this[key] = obj[key];
				let under = underscoreCase(key);
				if(obj[under] !== null && obj[under] !== undefined) this[key] = obj[under];
			}
		}
	}
 
	public static fromObject(obj: Object, cls: any): any {
		if(!obj) {
			return undefined;
		}
		let ins = new cls();
		
		for(let key in obj) {
			// TODO hasOwnProperty is not working
			//console.log(key);
			//if(ins.hasOwnProperty(key)) {
				ins[key] = obj[key];
			//}
		}
		
		return ins;
	}
}