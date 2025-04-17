import * as express from 'express';
import { useExpressServer, useContainer as routingUseContainer, Action } from 'routing-controllers';
import "reflect-metadata"
import { Container } from 'typedi';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ErrorHandler } from './common/services/errorHandler';
import * as qs from 'qs';
import { databaseInitialized } from './DataSourceManager';
import { isNonEmptyArray, safeNumber } from './common/services/util';
import { NODE_ENV } from './common/services/type';
import { BeforeRoutingMiddleWare } from './common/services/beforeRouting';
import { CoreError } from './common/core/CoreError';
import { E_ACCESS_DENY, E_NOTFOUND } from './common/services/errorType';
import { SQSService } from './common/services/sqs';
import { Redis } from './common/services/redis';

class App { 
 
    public app: express.Application;
    public connected: boolean = false;
	public isDisableKeepAlive: boolean = false;

    constructor(){

        this.app = express();
        routingUseContainer(Container);

		this.app.use(cookieParser()); 

		const session = require('express-session');
		const MemoryStore = require('memorystore')(session);

		let sessionObj = {
			httpOnly: true,
			secure: true,
			secret: '1q2w3e4r!',
			resave: false,
			saveUninitialized: false,
			store: new MemoryStore(),
			cookie: {
				httpOnly: true,
				secure: false
			},
		}

		this.app.use(session(sessionObj));

		//return 값 null 제거
		this.app.set('json replacer',  (k, v) => {
			return v ? v : v === 0 || v === false ? v : undefined
		});

		//cors해제
		this.app.use(cors());

		// array 최대수 제한 해제
		this.app.set('query parser', (str) => {
			return qs.parse(str, {allowPrototypes: true, arrayLimit: 1000});
		});

		//urlencoed 허용
		var bodyParser = require('body-parser');
		this.app.use(bodyParser.json({
			limit: "50mb"
		})); 
		this.app.use(bodyParser.urlencoded({ 
			extended: true,
			limit: "50mb"
		}));

		this.app.post("/callbacks/sign_in_with_apple/divcow", (request, response) => {
			const redirect = `intent://callback?${new URLSearchParams(
			  request.body
			).toString()}#Intent;package=${
			  process.env.ANDROID_PACKAGE_IDENTIFIER_DIVCOW
			};scheme=signinwithapple;end`;
		  
			console.log(`Redirecting to ${redirect}`);
		  
			response.redirect(307, redirect);
		});

		this.app.post("/callbacks/sign_in_with_apple/divigo", (request, response) => {
			const redirect = `intent://callback?${new URLSearchParams(
			  request.body
			).toString()}#Intent;package=${
			  process.env.ANDROID_PACKAGE_IDENTIFIER_DIVIGO
			};scheme=signinwithapple;end`;
		  
			console.log(`Redirecting to ${redirect}`);
		  
			response.redirect(307, redirect);
		});

		//formdata 허용
		let formData = require('express-form-data');
		let formDataParse = formData.parse();
		this.app.use((req: express.Request, res: express.Response, next: Function) => {

			if(req.method.toLocaleLowerCase() == 'post' && req.path.startsWith('/api/file/')) {
				next(null);
			} else {
				formDataParse(req, res, () => {
					next.apply(this, arguments);
				});
			}

		});

		this.app.get('/health', function (req, res) {
			res.json({code: 200, result: 'SUCCESS'});
		})

		//연결종료 신호
		this.app.use((req, res, next) => {
			if (this.isDisableKeepAlive) {
				res.set("Connection", "close")
			}
			next()
		});
 
        useExpressServer(this.app, {
			routePrefix: '/api',
			classTransformer: true,
			development: true,
			controllers: [__dirname + '/**/routes/*.ts'],
			defaultErrorHandler: false,
			middlewares: [ErrorHandler, BeforeRoutingMiddleWare],
			authorizationChecker: async (action: Action, roles: any[]) => {

				console.log(1111111111111111);
				if(action.request.headers.authorization) {
					console.log(22222222222222222222);
					return true;
				} else if(action.request.headers.token) {
					console.log(3333333333333333333333);
					let user = await Redis.getInstance().hGet(process.env.REDIS_PREFIX + action.request.headers.token);
					if(user) {
						return true;
					} else {
						return false;
					}
					
				} else {
					console.log(444444444444444444444);
					return false;
				}
				
			},
			currentUserChecker: async (action: Action) => {
				
				if(action.request.headers.authorization) { //웹
					let token = action.request.headers.authorization.replace('Bearer ', '');

					let arr = token.split('|');
					let user = await Redis.getInstance().hGet(arr[1]);

					if(user) {
						if(user.telegram_id && user.telegram_id == arr[0]) {
							return user;
						}
					}
				} else if(action.request.headers.token) { //앱
					let token = action.request.headers.token;
					let arr = token.split('-');
					let user = await Redis.getInstance().hGet(process.env.REDIS_PREFIX + token);
					if(user) {
						if(user.userKey && user.userKey == arr[0]){
							return user;
						}
					}
				}
				
				return null;
			}
       	});

	   	databaseInitialized();

    }

}



export default App;
