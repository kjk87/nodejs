import { IOrder } from "../core/CoreModel";
import { safeArray } from "./util"; 

export function orderingKey(order): IOrder[] {

    if(!order) return;
    
    order = safeArray(order);

    for(let ord of order) {
        let _key = ORDERING_KEY[ord.column];
        if(_key) ord.column = _key;
        if(!ord.table) ord.table = 'entity';
    }
    
    return order;
}

export const ORDERING_KEY = {
    seqNo: 'seq_no',
    androidArray: 'android_array',
    iosArray: 'ios_array'
}