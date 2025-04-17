import { DataSource } from 'typeorm';
import { LOCAL_ORMCONFIG } from '../ormconfig.local';
import { PROD_ORMCONFIG } from '../ormconfig.prod';
import { STAGE_ORMCONFIG } from '../ormconfig.stage';
import { NODE_ENV } from './common/services/type';

let ormconfig = process.env.NODE_ENV == NODE_ENV.PROD ? PROD_ORMCONFIG : process.env.NODE_ENV == NODE_ENV.STAGE ? STAGE_ORMCONFIG : LOCAL_ORMCONFIG;
export const BUFLEXZ_DATASOURCE = new DataSource(ormconfig);

export function databaseInitialized() {
    BUFLEXZ_DATASOURCE.initialize()
    .then(()=> {
        console.log('data source has been initialized !')
    })
    .catch((err) => {
        console.log('data source error >', err);
    });
}