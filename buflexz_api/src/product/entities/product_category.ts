import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { ProductJoin } from "./product";

@Entity({
    name: 'product_category'
})
export class ProductCategory extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}

@Entity({
    name: 'product_category'
})
export class ProductCategoryJoin extends ProductCategory {
    @OneToMany(() => ProductJoin, product => product.productCategory)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'categorySeqNo'})
    public product: ProductJoin[];
}