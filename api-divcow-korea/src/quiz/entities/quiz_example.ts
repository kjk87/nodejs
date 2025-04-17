import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";

@Entity({
    name: 'quiz_example'
})
export class QuizExample extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'bigint',  name: 'quiz_question_seq_no'})
    public quizQuestionSeqNo: number;

    @Column({type: 'varchar',  name: 'example'})
    public example: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'int',  name: 'join_count'})
    public joinCount: number;

}