import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { QuizQuestion } from "../entities/quiz_question";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { QuizQuestionListFilter } from "../services/quiz_question";

@Service()
export class QuizQuestionModel extends CoreModel<QuizQuestion> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, QuizQuestion);
    }

    public async setFilter(builder: SelectQueryBuilder<QuizQuestion> | UpdateQueryBuilder<QuizQuestion> | DeleteQueryBuilder<QuizQuestion>, filter: QuizQuestionListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.status) {
                builder.andWhere('status = :status', filter);
            }
            if(filter.type) {
                builder.andWhere('type = :type', filter);
            }
            if(filter.question) {
                builder.andWhere('question = :question', filter);
            }
            if(filter.hint) {
                builder.andWhere('hint = :hint', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
            if(filter.answer) {
                builder.andWhere('answer = :answer', filter);
            }
            
            if(filter.reason) {
                builder.andWhere('reason = :reason', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<QuizQuestion>, filter: QuizQuestionListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}