import { Middleware } from "routing-controllers";

@Middleware({type: 'before'})
export class RoutingMiddleware {

    use(req, res, next) {
        if(req.originalUrl != '/') {

            if(req.headers['user-agent'] != 'ELB-HealthChecker/2.0'){
                console.log(`[useragent] `, req.headers['user-agent'])
                console.log(`[${req.method}] `, req.originalUrl);
                console.log(`[body] `, req.body);
            }
            
            next();
        }
    }
} 