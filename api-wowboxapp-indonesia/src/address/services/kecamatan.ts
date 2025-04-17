import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty, Transaction } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";

import { EntityManager } from "typeorm";
import axios from "axios";
import * as https from "https";
import { KabkotaModel } from "../models/kabkota";
import { KecamatanModel } from "../models/kecamatan";
import { Kecamatan } from "../entities/kecamatan";
import { ProvinsiModel } from "../models/provinsi";
import { Provinsi } from "../entities/provinsi";
import { Kabkota } from "../entities/kabkota";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";

export interface KecamatanFilter extends ListFilter {
    id?: number;
    parentId?: number;
}

@Service()
export class KecamatanService extends CoreService {

     @Inject(()=> ProvinsiModel)
     private provinsiModel: ProvinsiModel;

     @Inject(()=> KabkotaModel)
     private kabkotaModel: KabkotaModel;

     @Inject(()=> KecamatanModel)
     private kecamatanModel: KecamatanModel;

     constructor() {
          super();
     }

     public async list(parentId:number){
          let filter: KecamatanFilter = {};
          filter.parentId = parentId;
          return await this.kecamatanModel.all(filter);
     }

     //생성
     @Transaction() //트렌잭션 default REPEATABLE READ
     public async insert(req: Request, res: Response, manager?: EntityManager) {

          manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

          let provinsiList = (await this.provinsiModel.all(undefined, undefined, Provinsi, manager)).list;

          var i = 0;
          for(let provinsi of provinsiList) {
               let cityList = await manager.query(`SELECT distinct city FROM kodepos where province = '${provinsi.provinsi}';`);
               for(let data of cityList) {
                    i++;
                    let kabkota = new Kabkota();
                    kabkota.id = i;
                    kabkota.parentId = provinsi.id;
                    kabkota.kabkota = data.city;
                    await this.kabkotaModel.create(kabkota, Kabkota, manager);
               }
          }

          let kabkotaList = (await this.kabkotaModel.all(undefined, undefined, Kabkota, manager)).list;

          var i = 0;
          for(let kabkota of kabkotaList) {
               let districtList = await manager.query(`SELECT distinct district FROM kodepos where city = '${kabkota.kabkota}';`);
               for(let data of districtList) {
                    i++;
                    let kecamatan = new Kecamatan();
                    kecamatan.id = i;
                    kecamatan.parentId = kabkota.id;
                    kecamatan.kecamatan = data.district;
                    await this.kecamatanModel.create(kecamatan, Kecamatan, manager);
               }
          }
          
          return true;
     }

     @Transaction() //트렌잭션 default REPEATABLE READ
     public async update(req: Request, res: Response, manager?: EntityManager) {

          manager = manager ? manager : BUFLEXZ_DATASOURCE.createEntityManager();

          let kabkotaList = (await this.kabkotaModel.all(undefined, undefined, Kabkota, manager)).list;
          for(let kabkota of kabkotaList) {
               let kecamatanList = (await this.kecamatanModel.all({parentId : kabkota.id}, undefined, Kecamatan, manager)).list;
               for(let kecamatan of kecamatanList) {
                    await manager.query(`update kodepos set parent_id = ${kecamatan.id} where city = "${kabkota.kabkota}" and district = "${kecamatan.kecamatan}" ;`);
               }
          }
          

          return true;
     }

}