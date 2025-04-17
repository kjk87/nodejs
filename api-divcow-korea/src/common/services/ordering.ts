import { IOrder } from "../core/CoreModel";
import { safeArray, underscoreCase } from "./util"; 

export function orderingKey(order): IOrder[] {

    if(!order) return;
    
    order = safeArray(order);

    for(let ord of order) {
        ord.column = underscoreCase(ord.column);
        if(!ord.table) ord.table = 'entity';
    }
    
    return order;
}