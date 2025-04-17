import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import { IsNotEmpty } from "../../common/services/decorators";
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { QuizExampleModel } from "../models/quiz_example";
import { QuizExample } from "../entities/quiz_example";

export interface QuizExampleListFilter extends ListFilter {
    seqNo?: number;
    quizQuestionSeqNo?: number;
    example?: string;
    array?: number;
    joinCount?: number;
}
@Service()
export class TodayPickExampleService extends CoreService {

     @Inject(()=> QuizExampleModel)
     private quizExampleModel: QuizExampleModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: QuizExample) {
          

          params = await this.quizExampleModel.create(params);
          return params;
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let quizExample = await this.quizExampleModel.get(seqNo);
          if(!quizExample) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return quizExample;
     }

     public async list(req: Request, res: Response, filter: QuizExampleListFilter, order: IOrder[], paging: IPaging) {
          return await this.quizExampleModel.list(filter, order, paging);
     }

}