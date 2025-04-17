
import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { translationDatetime } from "../../common/services/util";
import { ProductCategoryJoin } from "./product_category";
import { ProductImage, ProductImageJoin } from "./product_image";

@Entity({
    name: 'product'
})
export class Product extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int',  name: 'category_seq_no'})
    public categorySeqNo: number;

    @Column({type: 'varchar',  name: 'title'})
    public title: string;

    @Column({type: 'varchar',  name: 'status'})
    public status: string;

    @Column({type: 'decimal',  name: 'price'})
    public price: number;

    @Column({type: 'datetime', name: 'reg_datetime', transformer: {
        to: d => d,
        from: d => translationDatetime(d)
    }})
    public regDatetime: string;

}

@Entity({
    name: 'product'
})
export class ProductJoin extends Product {
    @ManyToOne(() => ProductCategoryJoin, productCategory => productCategory.product)
    @JoinColumn({name: 'category_seq_no', referencedColumnName: 'seqNo'})
    public productCategory: ProductCategoryJoin;

    @OneToMany(() => ProductImageJoin, imageList => imageList.product)
    @JoinColumn({name: 'seq_no', referencedColumnName: 'productSeqNo'})
    public imageList: ProductImageJoin[];
}