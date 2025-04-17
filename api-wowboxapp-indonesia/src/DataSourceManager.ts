import { DataSource } from 'typeorm';
import { DEV_ORMCONFIG, DEV_RP_ORMCONFIG } from '../ormconfig.dev';
import { PROD_ORMCONFIG, PROD_RP_ORMCONFIG } from '../ormconfig.prod';
import { STAGE_ORMCONFIG, STAGE_RP_ORMCONFIG } from '../ormconfig.stage';
import { NODE_ENV } from './common/services/type';

let ormconfig = process.env.NODE_ENV == NODE_ENV.PROD ? PROD_ORMCONFIG : process.env.NODE_ENV == NODE_ENV.STAGE ? STAGE_ORMCONFIG : DEV_ORMCONFIG;
export const BUFLEXZ_DATASOURCE = new DataSource(ormconfig);

let rp_rmconfig = process.env.NODE_ENV == NODE_ENV.PROD ? PROD_RP_ORMCONFIG : process.env.NODE_ENV == NODE_ENV.STAGE ? STAGE_RP_ORMCONFIG : DEV_RP_ORMCONFIG;
export const BUFLEXZ_RP_DATASOURCE = new DataSource(rp_rmconfig);

export function databaseInitialized() {
    BUFLEXZ_DATASOURCE.initialize()
    .then(()=> {
        console.log('data source has been initialized !')
    })
    .catch((err) => {
        console.log('data source error >', err);
    });

    BUFLEXZ_RP_DATASOURCE.initialize()
    .then(()=> {
        console.log('rp data source has been initialized !')
    })
    .catch((err) => {
        console.log('rp data source error >', err);
    });
}