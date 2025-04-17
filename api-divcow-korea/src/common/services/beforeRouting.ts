import { Middleware } from "routing-controllers";
import { NODE_ENV } from "./type";

@Middleware({type: 'before'})
export class BeforeRoutingMiddleWare {

    use(req, res, next) {
        console.log(`[${req.method}]`, req.originalUrl);
        console.log(`[body]`, req.body, '\r\n');
        next();
    }
}