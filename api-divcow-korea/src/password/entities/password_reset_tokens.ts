import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'password_reset_tokens'
})
export class PasswordResetTokens extends CoreEntity {

    @PrimaryColumn({type: 'varchar', name: 'email'})
    public email: string;

    @Column({type: 'varchar', name: 'token'})
    public token: string;

    @Column({type: 'timestamp', name: 'created_at'})
    public created_at: string;

}