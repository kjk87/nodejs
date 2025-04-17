import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "../../common/core/CoreEntity";
import { translationDatetime } from "../../common/services/util";

@Entity({
    name: 'community_apply'
})
export class CommunityApply extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'seq_no'})
    public seqNo: number;
    
    @Column({type: 'char', name: 'user_key'})
    public userKey: string;

    @Column({type: 'varchar', name: 'image'})
    public image: string;
    
    @Column({type: 'varchar', name: 'status'})
    public status: string;//pending(신청),return(반려),normal(승인),redemand(재신청)

    @Column({type: 'varchar', name: 'nation'})
    public reason: string;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public regDatetime: string;
    
    @Column({type: 'datetime', name: 'status_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)

    }})
    public statusDatetime: string;
}