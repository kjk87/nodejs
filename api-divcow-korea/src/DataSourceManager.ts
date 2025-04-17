import { DataSource } from 'typeorm';
import { LOCAL_ORMCONFIG } from '../ormconfig.local';
import { PROD_ORMCONFIG } from '../ormconfig.prd';
import { NODE_ENV } from './common/services/type';


let ormconfig = null; 

if(process.env.NODE_ENV == NODE_ENV.PROD) {
    ormconfig = PROD_ORMCONFIG;
} else if(process.env.NODE_ENV == NODE_ENV.LOCAL) {
    ormconfig = LOCAL_ORMCONFIG;
}

export const DUCKCOIN_DATASOURCE = new DataSource(ormconfig);

export function databaseInitialized() {
    DUCKCOIN_DATASOURCE.initialize()
    .then(()=> {
        console.log('data source has been initialized !')
    })
    .catch((err) => {
        console.log('data source error >', err);
    }); 
}