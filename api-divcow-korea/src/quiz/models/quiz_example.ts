import { EntityManager, getManager, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";
import { CoreModel } from "../../common/core/CoreModel";
import { Service } from "typedi";
import { QuizExample } from "../entities/quiz_example";
import { DUCKCOIN_DATASOURCE } from "../../DataSourceManager";
import { QuizExampleListFilter } from "../services/quiz_example";

@Service()
export class QuizExampleModel extends CoreModel<QuizExample> {
     constructor() {
        super(DUCKCOIN_DATASOURCE, QuizExample);
    }

    public async setFilter(builder: SelectQueryBuilder<QuizExample> | UpdateQueryBuilder<QuizExample> | DeleteQueryBuilder<QuizExample>, filter: QuizExampleListFilter, entity?: any): Promise<void> {
        if(filter) {
            if(filter.seqNo) {
                builder.andWhere('seq_no = :seqNo', filter);
            }
            if(filter.quizQuestionSeqNo) {
                builder.andWhere('quiz_question_seq_no = :quizQuestionSeqNo', filter);
            }
            if(filter.example) {
                builder.andWhere('example = :example', filter);
            }
            if(filter.array) {
                builder.andWhere('array = :array', filter);
            }
            if(filter.joinCount) {
                builder.andWhere('join_count = :joinCount', filter);
            }
        }
    }

    public async setJoin(builder: SelectQueryBuilder<QuizExample>, filter: QuizExampleListFilter, entity?: any): Promise<void> {
        if(filter) {
			if(filter.joinColumn) {
				this.joinColumn(builder, filter.joinColumn);
			}
		}
    }
}