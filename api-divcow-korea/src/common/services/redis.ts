import { NODE_ENV } from './type';



export class Redis {

    private static redis: Redis;
    // private redisClient;
    private ioRedis = require('ioredis');
    private redis = require('redis');
    // private asyncRedis = require('async-redis');



    // private cluster;
    private redis1;
    // private redis2;
    // private redis3;
	//public RedisStore = require('connect-redis')(this.session);
	
    
    constructor() {
        try{

            if(process.env.NODE_ENV == NODE_ENV.LOCAL) {
                this.redis1 = this.redis.createClient({ 
                    host: process.env.REDIS_HOSTNAME1,
                    port: process.env.REDIS_PORT1
                    //password: 'prredis',
                });
            } else {

                this.redis1 = new this.ioRedis({
                    port: process.env.REDIS_PORT1, 
                    host: process.env.REDIS_HOSTNAME1
                    // password: process.env.REDIS_PASSWORD
                });
                // this.redis2 = new this.ioRedis({
                //     port: process.env.REDIS_PORT2, 
                //     host: process.env.REDIS_HOSTNAME2,
                //     password: process.env.REDIS_PASSWORD
                // });
                // this.redis3 = new this.ioRedis({
                //     port: process.env.REDIS_PORT3, 
                //     host: process.env.REDIS_HOSTNAME3,
                //     password: process.env.REDIS_PASSWORD
                // });

                // this.cluster  = new this.ioRedis.Cluster(
                //     [
                //         {
                //             port: process.env.REDIS_PORT1,
                //             host: process.env.REDIS_HOSTNAME1
                //         },
                //         // {
                //         //     port: process.env.REDIS_PORT2,
                //         //     host: process.env.REDIS_HOSTNAME2
                //         // },
                //         // {
                //         //     port: process.env.REDIS_PORT3,
                //         //     host: process.env.REDIS_HOSTNAME3
                //         // }
                //     ],
                //     {
                //         redisOptions: {
                //             password: process.env.REDIS_PASSWORD
                //         }
                //     }
                
                // );
            }

            // this.redisClient = this.asyncRedis.decorate(this.cluster);

            this.redis1.on('connect', ()=> {

            });
    
            this.redis1.on('end', ()=> {

            });
    
            this.redis1.on('ready', ()=> {
                console.log('redis ready');
            });
    
            this.redis1.on('reconnecting', ()=> {

            });
    
            this.redis1.on('error', (err)=> {
               console.log('redis error', err);
            });
    
        }catch(e) {

        }
        
    }

    public static getInstance() {
        if(!this.redis) this.redis = new Redis();

        return this.redis;
    }

    private async set(key: string, value: any, expire: number = 1 * 1 * 60 * 60 ) {
        await this.redis1.set(key, value, 'EX', expire);
        return value;
    }

    private async get(key: string) {
        return await this.redis1.get(key);
    }

    /**
     * 
     * @param key 
     * @param value 오브젝트
     * @param expire 초
     * @returns 
     */
    public async hSet(key: string, value: any, expire: number = 365 * 24 * 60 * 60 ) { // 일 * 시간 * 분 * 초
        try{
            await this.redis1.set(key, JSON.stringify(value), 'EX', expire);

            return value;
            
        }catch(e) {
            console.log('REDIS ERROR >>> ', e)
        }
        
    }

    public async hGet(key: string) {
        try{

            let data = await this.redis1.get(key);
            // console.log('REDIS DATA >>>>', data);
            if(data) {
                return JSON.parse(data);
            }
            
        }catch(e) {
            console.log('REDIS ERROR >>> ', e)
        }
        
    }

    public async getKeys(key: string) {
        let keys= [];

        keys = [...keys, ...await this.redis1.keys(key+ '*')];
        // keys = [...keys, ...await this.redis2.keys(key+ '*')];
        // keys = [...keys, ...await this.redis3.keys(key+ '*')];

        let set = new Set(keys);
        return [...set];
    }

    public async del(key: string) {
        await this.redis1.del(key);
    }

}