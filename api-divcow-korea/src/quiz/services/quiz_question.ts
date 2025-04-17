import { Inject, Service } from "typedi";
import { CoreService } from "../../common/core/CoreService";
import { Request, Response } from 'express';
import * as ErrorType from "../../common/services/errorType";
import { CoreError } from '../../common/core/CoreError';
import { IOrder, IPaging, IJoin, ListFilter } from "../../common/core/CoreModel";
import { QuizQuestionModel } from "../models/quiz_question";
import { QuizQuestion } from "../entities/quiz_question";

export interface QuizQuestionListFilter extends ListFilter {
    seqNo?: number;
    status?: string;
    type?: string;
    question?: string;
    hint?: string;
    array?: number;
    answer?: number;
    reason?: string;
}
@Service()
export class QuizQuestionService extends CoreService {

     @Inject(()=> QuizQuestionModel)
     private quizQuestionModel: QuizQuestionModel;

     constructor() {
          super();
     }

     public async create(req: Request, res: Response, params: QuizQuestion) {

          params = await this.quizQuestionModel.create(params);
          return params;
     }

     public async get(req: Request, res: Response, seqNo: number) {
          let quizQuestion = await this.quizQuestionModel.get(seqNo);
          if(!quizQuestion) {
               throw new CoreError(ErrorType.E_NOTFOUND)
          }
          return quizQuestion;
     }

     public async list(req: Request, res: Response, filter: QuizQuestionListFilter, order: IOrder[], paging: IPaging) {
          return await this.quizQuestionModel.list(filter, order, paging);
     }

}