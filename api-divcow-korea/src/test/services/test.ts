import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";



@Service()
export class TestService extends CoreService {


    constructor() {
        super();
    }

    public async test(req: Request, res: Response, params: any) {

        console.log(params);

        return true;
    }


}