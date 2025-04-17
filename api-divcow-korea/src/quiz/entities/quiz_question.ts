import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({
    name: 'quiz_question'
})
export class QuizQuestion extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'varchar',  name: 'type'})
    public type: string;

    @Column({type: 'varchar',  name: 'question'})
    public question: string;

    @Column({type: 'varchar',  name: 'hint'})
    public hint: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'varchar',  name: 'answer'})
    public answer: string;
    
    @Column({type: 'bigint',  name: 'answer_exmaple_seq_no'})
    public answerExmapleSeqNo: number;

    @Column({type: 'varchar',  name: 'reason'})
    public reason: string;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;

    @Column({type: 'varchar',  name: 'explain_text'})
    public explainText: string;

    @Column({type: 'varchar',  name: 'explain_image'})
    public explainImage: string;

}