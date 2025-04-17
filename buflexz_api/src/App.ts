import { E_EXPIRED_SESSION } from './common/services/errorType';
import * as express from 'express';
import { useExpressServer, useContainer as routingUseContainer, Action } from 'routing-controllers';
import "reflect-metadata"
import { Container } from 'typedi';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ErrorHandler } from './common/services/errorHandler';
import * as qs from 'qs';
import { databaseInitialized } from './DataSourceManager';
import { Redis } from './common/services/redis';
import { CoreError } from './common/core/CoreError';
import { getSession } from './common/services/session';
import { RoutingMiddleware } from './common/services/RoutingMiddleware';

class App {

    public app: express.Application;
    public connected: boolean = false;
	public isDisableKeepAlive: boolean = false;

    constructor(){
        this.app = express();
        routingUseContainer(Container);

		this.app.use(cookieParser());

		//return 값 null 제거
		this.app.set('json replacer',  (k, v) => {
			return v ? v : v === 0 || v === false ? v : undefined
		});

		//cors해제
		this.app.use(cors());

		//ejs 연동
		this.app.set('views', __dirname + '/../views');
		this.app.set('view engine', 'ejs');

		// array 최대수 제한 해제
		this.app.set('query parser', (str) => {
			return qs.parse(str, {allowPrototypes: true, arrayLimit: 1000});
		});

		//urlencoed 허용
		var bodyParser = require('body-parser');
		this.app.use(bodyParser.json()); 
		this.app.use(bodyParser.urlencoded({ extended: true }));


		this.app.get('/', function(req, res){
			res.send(true);
		})

		//formdata 허용
		let formData = require('express-form-data');
		let formDataParse = formData.parse();
		this.app.use((req: express.Request, res: express.Response, next: Function) => {
			if(req.method.toLocaleLowerCase() == 'post' && req.path.startsWith('/file/')) {
				next(null);
			 } else {
				formDataParse(req, res, () => {
				   next.apply(this, arguments);
				});
			 }
		});

		//연결종료 신호
		this.app.use((req, res, next) => {
			if (this.isDisableKeepAlive) {
				res.set("Connection", "close")
			}
			next()
		});

        useExpressServer(this.app, {
			// routePrefix: '/api',
			classTransformer: true,
			development: true,
			controllers: [__dirname + '/**/routes/*.ts'],
			defaultErrorHandler: false,
			middlewares: [ErrorHandler, RoutingMiddleware],
			authorizationChecker: async (action: Action, roles: any[]) => {
				//로그인 체크
				let token = action.request.headers.token
				if(!token){
					throw new CoreError(E_EXPIRED_SESSION);
				}

				try{
					getSession(action.request);
					return true;
				}catch(e){
					return false;
				}
			},
			currentUserChecker: async (action: Action) => {
				//session 가져오기
				return await getSession(action.request);
			}
       });

	   databaseInitialized();
    }
}



export default App;
